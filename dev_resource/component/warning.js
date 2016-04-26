import React, {Component} from "react";
export default class Waring extends Component{
	constructor(props){
		super(props);
		this.state = props;
		this.handleClose = () => {
			this.setState({
				isShow : 0
			});
		};
	}
	componentDidUpdate(){
		let second = this.state.autoClose,
			t = setTimeout(() => {
			clearTimeout(t);
			second && this.handleClose();
		}, second * 1000);
	}
	render(){
		let state = this.state;
		return (
			<div className={`warning ${state.isShow ? "block" : "hidden"}`}>
				<p>
					{state.message}
				</p>
				<i className="btnClose" onClick={this.handleClose}></i>
			</div>
		);
	}
}