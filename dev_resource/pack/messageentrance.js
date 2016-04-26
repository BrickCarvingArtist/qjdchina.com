import React, {Component} from "react";
import {createStore} from "redux";
import {parse} from "cookie";
import {afterSign, xhrTimeout} from "./util";
import Header from "../component/header";
import Footer from "../component/footer";
import Dialog from "../component/dialog";
import InputRow from "../component/input";
import {parse as _parse} from "querystring";
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
		this.setDefaultMobile = () => {
			this.setState({
				mobile : _parse(location.search.substr(1)).mobile
			});
		};
		this.handleMessageCaptcha = () => {
			this.state.enableMessage && $.ajax({
				url : "/api/message/captcha",
				data : {
					source : "register",
					imgCode : this.getStrangeIptVal("imageCaptcha"),
					phone : this.getIptVal("phone")
				}
			}).done(data => {
				if(!(data.code - 0)){
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
				}else{
					dialog.setState({
						option : {
							title : {
								iconClassName : "info",
								name : "提示",
								btnClose : 1
							},
							content : 0,
							message : data.message
						},
						isShow : 1
					});
				}
			});
		};
		this.handleSign = () => {
			$.ajax({
				url : "/api/message/contract/validate",
				timeout : 2000,
				data : _parse(location.search.substr(1))
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
		this.setDefaultMobile();
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
		store.dispatch({
			type : "page",
			component : this
		});
		this.getAuth = () => {
			$.ajax({
				url : "/api/manage/corporation/info",
				timeout : 2000
			}).done(data => {
				let signType = data.code === "101001002" ? 1 : !(data.code - 0) ? 2 : 0;
				if(signType){
					this.setState({
						signType,
						mobile : parse(document.cookie).username
					});
				}
			}).fail(xhr => {
				xhrTimeout("个人信息", store.getState().dialog.component);
			});
		};
	}
	componentDidMount(){
		this.getAuth();
	}
	render(){
		let state = this.state;
		return (
			<div className="page">
				<Dialog store={store} />
				<Header store={store} signType={state.signType} mobile={state.mobile} />
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