import React, {Component} from "react";
class Select extends Component{
	constructor(props){
		super(props);
		this.state = props;
		this.handleChange = e => {
			let state = this.state,
				index = state.index,
				userClass = state.userClass,
				selectIndex = (userClass.state.selectIndex || []).filter((list, _index) => {
					return index > _index;
				});
			selectIndex[index] = e.target.value;
			userClass.setState({
				selectIndex
			}, () => {
				let status = userClass.getCompleteStatus();
				if(status){
					userClass.state.callback(status, userClass.getSelectIndex());
				}else{
					userClass.state.callback(status);
				}
			});
		};
	}
	componentDidMount(){
		let state = this.state;
		state.userClass.state.default && this.handleChange({
			target : {
				value : Object.keys(state.option)[0]
			}
		});
	}
	componentWillReceiveProps(nextProps){
		this.setState(nextProps);
	}
	render(){
		let lists = [],
			state = this.state,
			arrOption = state.option,
			userClass = state.userClass;
		for(let i in arrOption){
			lists.push(
				<option value={i} key={i}>
					{arrOption[i]}
				</option>
			);
		}
		userClass.state.default || lists.splice(0, 0, <option value={0} key={0}>请选择</option>);
		return (
			<select onChange={this.handleChange}>
				{lists}
			</select>
		);
	}
}
export default class SelectGroup extends Component{
	constructor(props){
		super(props);
		this.state = props;
		this.getPureSelect = (arr, index) => {
			return arr[index];
		};
		this.getCompleteStatus = () => {
			let selectIndex = this.state.selectIndex;
			switch(this.state.checkType){
				case "single":
					return selectIndex.length && selectIndex[0];
				case "region":
					return (selectIndex[1] && selectIndex[1].length === 6) || (selectIndex[2] && selectIndex[2].length === 6);
				case "manufacturer":
					return selectIndex.length === 2 && selectIndex[1];
			}
		};
		this.getSelectIndex = () => {
			let selectIndex = this.state.selectIndex;
			if(this.state.checkType === "region"){
				selectIndex[2] = selectIndex[2] || selectIndex[1];
				selectIndex[1] = (selectIndex[2] || selectIndex[1]).slice(0, 4);
				selectIndex[0] = selectIndex[1].slice(0, 2);
			}
			return selectIndex;
		};
	}
	componentWillReceiveProps(nextProps){
		this.setState(nextProps);
	}
	render(){
		let lists = [],
			state = this.state,
			arrSelect = state.option,
			selectIndex = state.selectIndex;
		arrSelect.map((list, index) => {
			if(list.filter((list, index) => {
				return list instanceof Object;
			}).length){
				selectIndex && selectIndex.map((_list, _index) => {
					let option = this.getPureSelect(list, _list);
					if(option){
						lists.splice(index, 1, (
							<Select option={option} key={index} userClass={this} index={index} />
						));
					}
				});
			}else{
				lists.push(
					<Select option={list} key={index} userClass={this} index={index} />
				);
			}
		});
		return (
			<div className={`selectGroup${state.default ? " disabled" : ""}`}>
				{lists}
			</div>
		);
	}
}