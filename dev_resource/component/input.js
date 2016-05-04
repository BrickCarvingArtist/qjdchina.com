import React, {Component} from "react";
import Validate from "./validate";
export default class InputRow extends Component{
	constructor(props){
		super(props);
		this.state = props;
		this.validate = e => {
			let validate = this.state.validate;
			if(validate){
				let message = Validate(this.state.option.label, e.target.value, validate.type);
				validate.callback(message);
			}
		};
		this.handleSubmit = e => {
			e.keyCode === 13 && this.state.form && this.state.form.handleSubmit();
		};
	}
	componentWillReceiveProps(nextProps){
		this.setState(nextProps);
	}
	render(){
		let state = this.state,
			option = state.option;
		return (
			<div className="row">
				<label htmlFor={option.id}>
					{`${option.label}:`}
				</label>
				<input 
					id={option.id}
					className={`${option.className}${state.value || state.value === null ? " disabled" : ""}`}
					type={option.type}
					placeholder={`请输入${option.label}`}
					maxLength={option.maxlength}
					readOnly={option.readOnly}
					value={state.value}
					onChange={this.validate}
					onBlur={this.validate}
					onKeyDown={this.handleSubmit}
					ref="ipt" />
				{
					option.unit ? <em>{option.unit}</em> : []
				}
			</div>
		);
	}
};