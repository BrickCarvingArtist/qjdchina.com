import React, {Component} from "react";
import {afterSign, xhrTimeout} from "../pack/util";
import Dialog from "./dialog";
import InputRow from "./input";
class SignUp extends Component{
	constructor(props){
		super(props);
		this.state = {
			enableImageCaptchaUrl : 1,
			imageCaptchaUrl : "",
			message : "获取验证码",
			enableMessage : 1
		};
		let dialog = props.dialog,
			refs,
			option;
		this.getIptVal = name => {
			refs = this.refs;
			return refs[name].refs.ipt.value;
		}
		this.getStrangeIptVal = name => {
			refs = this.refs;
			return refs[name].value;
		};
		this.handleImageCaptcha = () => {
			this.state.enableImageCaptchaUrl && this.setState({
				imageCaptchaUrl : `/api/stream/captcha?t=${Date.now()}`
			});
		};
		this.handleMessageCaptcha = () => {
			this.state.enableMessage && $.ajax({
				url : "/api/message/captcha",
				timeout : 2000,
				data : {
					source : "register",
					imgCode : this.getStrangeIptVal("imageCaptcha"),
					phone : this.getIptVal("phone")
				}
			}).done(data => {
				afterSign(data, data => {
					let seconds = 60,
						t = setInterval(() => {
							if(--seconds){
								this.setState({
									message : `${seconds}秒后重试`,
									enableImageCaptchaUrl : 0,
									enableImageUrl : 0,
								});
							}else{
								clearInterval(t);
								this.setState({
									message : "获取验证码",
									enableMessage : 1
								});
							}
						}, 1000);
				}, dialog);
			}).fail(xhr => {
				xhrTimeout("验证码数据", dialog);
			});
		};
		this.signIn = data => {
			$.ajax({
				type : "post",
				url : "/api/user/signin",
				data
			}).done(data => {
				afterSign(data, data => {
					if(data.data.isMember){
						location.href = parse(location.search.substr(1)).referer || this.props.referer || "/manage/corporation";
					}else{
						location.href = "/user/join";
					}
				}, dialog);
			}).fail(xhr => {
				xhrTimeout("登录结果", dialog);
			});
		};
		this.handleSubmit = () => {
			option = {
				phone : this.getIptVal("phone"),
				smsCode : this.getStrangeIptVal("messageCaptcha"),
				password : escape(this.getIptVal("password"))
			};
			if(this.state.agreement){
				$.ajax({
					type : "post",
					url : "/api/user/signup",
					timeout : 2000,
					data : option
				}).done(data => {
					delete option.smsCode;
					afterSign(data, data => {
						this.signIn(option);
					}, dialog);
				}).fail(xhr => {
					xhrTimeout("注册结果", dialog);
				});
			}else{
				dialog.setState({
					option : {
						title : {
							iconClassName : "info",
							name : "温馨提示",
							btnClose : 1
						},
						message : "请务必阅读并同意法律声明和隐私条款再提交注册"
					},
					isShow : 1,
					autoClose : 2
				});
			}
		};
		this.handleAgreement = e => {
			this.setState({
				agreement : e.target.checked
			});
		};
	}
	componentDidMount(){
		this.handleImageCaptcha();
	}
	render(){
		let lists = [],
			option = this.props.option;
		option.map((list, index) => {
			list.iptType && lists.push(
				<InputRow option={list} key={index} ref={list.id} form={this} />
			);
			list.iptType || lists.push(
				<div className="row" key={index}>
					<label htmlFor={list.id}>
						{list.label}
					</label>
					<input className={list.className} placeholder={`请输入${list.label}`} ref={list.id} maxLength={list.maxlength} />
					{
						list.id === "imageCaptcha" ? (
							<img src={this.state.imageCaptchaUrl} onClick={this.handleImageCaptcha} />
						) : (
							<a type="button" className="singleBtn" onClick={this.handleMessageCaptcha}>
								{this.state.message}
							</a>
						)
					}
				</div>
			);
		});
		return (
			<div className="signUp">
				{lists}
				<input className="singleBtn" onClick={this.handleSubmit} value="注册" />
				<div className="row">
					<input className="agreement" type="checkbox" onChange={this.handleAgreement} />
					<p className="note">
						<span>我已阅读并同意</span>
						<a href="/legal" target="_blank">法律声明</a>
						<span>和</span>
						<a href="/protocol" target="_blank">隐私条款</a>
					</p>
				</div>
			</div>
		);
	}
}
SignUp.defaultProps = {
	option : [
		{
			iptType : 1,
			id : "phone",
			className : "ipt-txt",
			label : "手机号码",
			maxlength : 11
		},
		{
			iptType : 0,
			id : "imageCaptcha",
			className : "ipt-txt withButton",
			label : "图形验证码",
			maxlength : 4
		},
		{
			iptType : 0,
			id : "messageCaptcha",
			className : "ipt-txt withButton",
			label : "短信验证码",
			maxlength : 6
		},
		{
			iptType : 1,
			type : "password",
			id : "password",
			className : "ipt-txt",
			label : "密码",
		},
		{
			iptType : 1,
			type : "password",
			id : "reassurePassword",
			className : "ipt-txt",
			label : "确认密码",
		}
	]
};
export default SignUp;