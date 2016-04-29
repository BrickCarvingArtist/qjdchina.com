import React, {Component} from "react";
import {createStore} from "redux";
import {afterSign, xhrTimeout} from "./util";
import Header from "../component/header";
import Footer from "../component/footer";
import Dialog from "../component/dialog";
import InputRow from "../component/input";
import {parse} from "querystring";
let store = createStore((state = [], action) => {
	if(state[action.type]){
		for(let i in action){
			state[action.type][i] = action[i];
		}
	}else{
		state[action.type] = action;
	}
	return state;
});
class Form extends Component{
	constructor(props){
		super(props);
		this.state = {
			imageCaptchaUrl : "",
			message : "获取验证码",
			enableMessage : 1
		};
		let dialog = store.getState().dialog.component;
		this.handleImageCaptcha = () => {
			this.setState({
				imageCaptchaUrl : `/api/stream/captcha?t=${Date.now()}`
			});
		};
		this.setDefaultInfo = () => {
			let search = parse(location.search.substr(1));
			this.setState({
				mobile : search.mobile,
				code : search.code
			});
		};
		this.getStrangeIptVal = name => {
			return this.refs[name].value;
		};
		this.handleMessageCaptcha = () => {
			let state = this.state;
			this.state.enableMessage && $.ajax({
				url : "/api/message/contractcaptcha",
				timeout : 2000,
				data : {
					code : state.code,
					phone : state.mobile
				}
			}).done(data => {
				afterSign(data, data => {
					let seconds = 60,
						t = setInterval(() => {
							if(--seconds){
								this.setState({
									message : `${seconds}秒后重试`,
									enableMessage : 0,
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
				xhrTimeout("验证码", dialog)
			});
		};
		this.handleSign = () => {
			let state = this.state;
			$.ajax({
				url : "/api/message/contract/validate",
				timeout : 2000,
				type : "post",
				data : {
					code : state.code,
					mobile : state.mobile,
					imgCode : this.getStrangeIptVal("imageCaptcha"),
					smsCode : this.getStrangeIptVal("messageCaptcha")
				}
			}).done(data => {
				afterSign(data, data => {
					console.log(data);
				}, dialog);
			}).fail(xhr => {
				xhrTimeout("用户合同匹配验证", dialog);
			});
		};
	}
	componentDidMount(){
		this.handleImageCaptcha();
		this.setDefaultInfo();
	}
	render(){
		let lists = [],
			option = this.props.option;
		option.map((list, index) => {
			list.id === "mobile" && lists.push(
				<InputRow option={list} key={index} ref={list.id} form={this} value={this.state.mobile} />
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
			<form>
				<h1>
					<i></i>
					<span>身份验证</span>
				</h1>
				{lists}
				<input className="singleBtn" type="button" value="好的，去签约" onClick={this.handleSign} />
			</form>
		);
	}
}
Form.defaultProps = {
	option : [
		{
			iptType : 1,
			label : "手机号",
			id : "mobile",
			className : "ipt-txt",
			maxlength : 11
		},
		{
			iptType : 0,
			label : "图片验证码",
			id : "imageCaptcha",
			className : "ipt-txt withButton",
			maxlength : 4
		},
		{
			iptType : 0,
			label : "短信验证码",
			id : "messageCaptcha",
			className : "ipt-txt withButton",
			maxlength : 6
		}
	]
};
class Content extends Component{
	render(){
		return (
			<div className="content">
				<div className="w1000">
					<Form />
				</div>
			</div>
		);
	}
}
class Main extends Component{
	render(){
		return (
			<div className="mainArea">
				<Content />
			</div>
		);
	}
}
class Page extends Component{
	constructor(){
		super();
		this.state = {};
	}
	render(){
		let state = this.state;
		return (
			<div className="page">
				<Dialog store={store} />
				<Header store={store} />
				<Main />
				<Footer />
			</div>
		);
	}
}
const init = (render) => {
	render(
		<Page />,
		document.querySelector(".main")
	);	
};
export {
	Page,
	init
}