import {parse} from "cookie";
import React, {Component} from "react";
import InputRow from "./input";
class SignIn extends Component{
	constructor(props){
		super(props);
		this.getIptVal = name => {
			return this.refs[name].refs.ipt.value;
		};
		this.handleSubmit = () => {
			let refs = this.refs;
			$.ajax({
				type : "post",
				url : "/api/user/signin",
				data : {
					phone : this.getIptVal("phone"),
					password : this.getIptVal("password")
				},
				success : data => {
					if(!(data.code - 0)){
						if(data.data.isMember){
							location.href = parse(location.search.substr(1)).referer || this.props.referer || "/manage/corporation";
						}else{
							location.href = "/user/join";
						}
					}else{
						this.props.dialog.setState({
							option : {
								title : {
									iconClassName : "info",
									name : "登录",
									btnClose : () => {
										location.href = "/";
									}
								},
								message : "手机号码或密码错误"
							},
							isShow : 1,
							autoClose : 0
						});
					}
				}
			});
		};
	}
	render(){
		let lists = [],
			option = this.props.option;
		option.map((list, index) => {
			lists.push(
				<InputRow option={list} key={index} ref={list.id} form={this} />
			);
		});
		return (
			<div className="signIn">
				{lists}
				<a className="singleBtn" onClick={this.handleSubmit}>登录</a>
			</div>
		);
	}
};
SignIn.defaultProps = {
	option : [
		{
			id : "phone",
			className : "ipt-txt",
			label : "手机号码",
			maxlength : 11
		},
		{
			id : "password",
			type : "password",
			className : "ipt-txt",
			label : "密码",
			maxlength : 16
		}
	]
};
export default SignIn;