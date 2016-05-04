import React, {Component} from "react";
class Case extends Component{
	constructor(props){
		super(props);
	}
	render(){
		let props = this.props;
		return (
			<a className={`case ${props.className}${this.props.userClass.props.index === this.props.index ? " current" : " normal"}`} href={props.href}>
				<i></i>
				<span>{props.name}</span>
			</a>
		);
	}
}
export default class Menu extends Component{
	constructor(props){
		super(props);
	}
	render(){
		let lists = [],
			option = this.props.option;
		option.map((list, index) => {
			lists.push(
				<Case name={list.name} className={list.className} href={list.href} index={index} key={index} userClass={this} />
			);
		});
		return (
			<div className="menu">
				{lists}
			</div>
		);
	}
};
Menu.defaultProps = {
	option : [
		{
			name : "企业信息",
			className : "corporation",
			href : "/manage/corporation"
		},
		{
			name : "我的项目",
			className : "project",
			href : "/manage/project"
		},
		{
			name : "我的订单",
			className : "bill",
			href : "/manage/bill"
		},
		{
			name : "我的放款",
			className : "loan",
			href : "/manage/loan"
		},
		{
			name : "我的合同",
			className : "contract",
			href : "/manage/contract"
		},
		{
			name : "合作厂家",
			className : "manufacturer",
			href : "/manage/manufacturer"
		}
	]
};