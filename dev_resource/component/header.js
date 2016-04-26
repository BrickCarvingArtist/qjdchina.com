import React, {Component, createFactory} from "react";
import {parse} from "cookie";
import SignIn from "./signin";
import SignUp from "./signup";
import {afterSign} from "../pack/util";
class TopNav extends Component{
	constructor(props){
		super(props);
		this.state = props;
		this.state.store.dispatch({
			type : "topNav",
			component : this
		});
		let dialog,
			path,
			t;
		this.signIn = () => {
			dialog = this.state.store.getState().dialog.component;
			dialog.setState({
				option : {
					title : {
						iconClassName : "info",
						name : "用户登录",
						btnClose : this.state.auth ? () => {
							location.href = "/";
						} : 1
					},
					content : createFactory(SignIn)({
						dialog : dialog,
						referer : path
					}),
					message : 0
				},
				isShow : 1
			});
		};
		this.signOut = () => {
			$.ajax({
				url : "/api/user/signout"
			}).done(data => {
				afterSign(data, data=>{}, this.state.store.getState().dialog.component);
				t = setTimeout(() => {
					clearTimeout(t);
					if(location.pathname === "/"){
						this.setState({
							option : 0
						});
					}else{
						location.href = "/";
					}
				}, 1000);
			});
		};
		this.signUp = () => {
			dialog = this.state.store.getState().dialog.component;
			dialog.setState({
				option : {
					title : {
						iconClassName : "info",
						name : "注册帐号",
						btnClose : 1
					},
					content : createFactory(SignUp)({
						dialog : dialog
					}),
					message : 0
				},
				isShow : 1
			});
		};
	}
	componentWillReceiveProps(nextProps){
		this.setState(nextProps);
	}
	render(){
		let state = this.state,
			mobile = state.option.mobile,
			signType = state.option.signType >> 1;
		return (
			<div className="topNav">
				<div className="w1000">
					<a href="/aboutus">联系我们</a>
					{
						mobile ? (
							<div className="anchor" onClick={this.signOut}>退出</div>
						) : (
							<div className="anchor" onClick={this.signUp}>注册</div>
						)
					}
					{
						mobile ? (
							<div className="info">
								<a href={signType ? "/manage/corporation" : "/user/join"}>{mobile}</a>
								<a href={signType ? "/manage/corporation" : "/user/join"}>个人中心</a>
								<a href="/user/findPwd">修改密码</a>
							</div>
						) : (
							<div className="anchor" onClick={this.signIn}>登录</div>
						)
					}
				</div>
			</div>
		);
	}
}
TopNav.defaultProps = {
	option : {
		mobile : "",
		authorized : 0
	}
};
class MenuBar extends Component{
	constructor(props){
		super(props);
		this.state = props;
	}
	componentWillReceiveProps(nextProps){
		this.setState(nextProps);
	}
	render(){
		let lists = [],
			state = this.state,
			option = state.option;
		option.map((list, index) => {
			if(index === option.length - 1){
				lists.push(
					<a key={index} href={state.signType >> 1 ? "/manage/project" : "/user/join"}>
						{list.name}
					</a>
				);
			}else{
				lists.push(
					<a key={index} href={list.href}>
						{list.name}
					</a>
				);
			}
		});
		return (
			<div className="menuBar">
				<div className="w1000">
					<a className="logo" href="/"></a>
					<p className="headMenu">
						{lists}
					</p>
				</div>
			</div>
		);
	}
}
MenuBar.defaultProps = {
	option : [
		{
			name : "首页",
			href : "/"
		},
		{
			name : "产品介绍",
			href : "/product"
		},
		{
			name : "帮助中心",
			href : "/wiki"
		},
		{
			name : "关于我们",
			href : "/introduction"
		},
		{
			name : "我的项目",
			href : "/manage/project"
		}
	]
};
class Header extends Component{
	constructor(props){
		super(props);
		this.state = props;
	}
	componentWillReceiveProps(nextProps){
		this.setState(nextProps);
	}
	render(){
		let state = this.state;
		return (
			<div className="header">
				<TopNav store={state.store} option={state} />
				<MenuBar signType={state.signType} />
			</div>
		);
	}
}
Header.defaultProps = {
	signType : 0
};
export default Header;