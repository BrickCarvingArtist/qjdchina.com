import React, {Component} from "react";
class Title extends Component{
	constructor(props){
		super(props);
		this.state = props;
		this.handleClose = () => {
			props.userClass.handleClose(this.state.btnClose);
		}
	}
	componentWillReceiveProps(nextProps){
		this.setState(nextProps);
	}
	render(){
		let state = this.state;
		return (
			<h1 className={state.className}>
				<span>
					{state.name}
				</span>
				{
					state.btnClose ? <i onClick={this.handleClose}></i> : []
				}
			</h1>
		);
	}
}
export default class Dialog extends Component{
	constructor(props){
		super(props);
		this.state = {
			option : {
				title : 0
			}
		};
		this.handleClose = callback => {
			this.setState({
				isShow : 0,
				autoClose : 0
			}, () => {
				callback instanceof Function && callback();
			});
		};
		props.store.dispatch({
			type : "dialog",
			component : this
		});
	}
	componentDidUpdate(){
		let second = this.state.autoClose;
		if(second){
			let t = setTimeout(() => {
				clearTimeout(t);
				this.handleClose();
			}, second * 1000);
		}
	}
	render(){
		let type = this.state.type,
			option = this.state.option,
			title = option.title,
			Content = option.content,
			message = option.message;
		return (
			<div className={`shadow${this.state.isShow ? " block" : " hidden"}`}>
				<div className="dialog">
					{
						title ? <Title name={title.name} className={title.iconClassName} btnClose={title.btnClose} userClass={this} /> : []
					}
					{
						Content ? Content : []
					}
					{
						message ? <p className="message">{message}</p> : []
					}
					{
						type ? {
							alert : <a className="singleBtn" onClick={this.handleClose}>确定</a>,
							confirm : 1,
							prompt : 1
						}[type] : []
					}
				</div>
			</div>
		);
	}
};