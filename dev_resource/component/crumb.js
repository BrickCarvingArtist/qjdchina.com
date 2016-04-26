import React, {Component} from "react";
export default class Crumb extends Component{
	constructor(props){
		super(props);
		this.state = {
			option : props.option
		};
	}
	componentWillReceiveProps(nextProps){
		this.setState(nextProps);
	}
	render(){
		let lists = [],
			option = this.state.option;
		option.map((list, index) => {
			lists.push(
				<a href={list.href} key={index}>
					{list.name}
				</a>
			);
		});
		return (
			<div className="crumb">
				{lists}
			</div>
		);
	}
};