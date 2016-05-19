import React, {Component, createFactory} from "react";
import {createStore} from "redux";
import {stringify} from "qs";
import {afterSign, xhrTimeout} from "./util";
import Header from "../component/header";
import Footer from "../component/footer";
import Dialog from "../component/dialog";
import Menu from "../component/menu";
import SelectGroup from "../component/select_group";
import InputRow from "../component/input";
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
class Reason extends Component{
	constructor(props){
		super(props);
		this.state = props;
		this.handleCount = e => {
			let reason = e.target.value,
				length = reason.length,
				state = this.state,
				isUnderLimit = state.maxLength - length;
			return this.setState({
				length,
				isUnderLimit,
				reason
			}) || isUnderLimit;
		}
	}
	render(){
		let state = this.state;
		return (
			<div className={`reason ${state.isUnderLimit ? "normal" : "limit"}`}>
				<textarea placeholder={"请输入原因(必填)"} maxLength={state.maxLength} onChange={this.handleCount}></textarea>
				<em>
					{state.maxLength - state.length}
				</em>
			</div>
		);
	}
}
Reason.defaultProps = {
	isUnderLimit : 1,
	length : 0,
	maxLength : 500
};
class DialogContent extends Component{
	constructor(props){
		super(props);
		let dialog = store.getState().dialog.component;
		this.giveUp = () => {
			$.ajax({
				url : "/api/manage/contract/giveup",
				type : "post",
				timeout : 2000,
				data : {
					id : store.getState().contract.component.state.id,
					signFailedReason : this.refs.reason.state.reason
				}
			}).done(data => {
				afterSign(data, data => {
					dialog.setState({
						option : {
							title : {
								iconClassName : "info",
								name : "温馨提示",
								btnClose : 1
							},
							message : data.message
						},
						isShow : 1,
						autoClose : 1
					}, () => {
						let t = setTimeout(() => {
							clearTimeout(t);
							location.href = "/manage/contract";
						}, 1000);
					});
				}, dialog);
			}).fail(xhr => {
				xhrTimeout("放弃签约结果", dialog);
			});
		};
	}
	render(){
		return (
			<div className="content">
				<p>拒绝合同签约将影响您使用仟金顶的服务，是否确定要拒绝合同签约？</p>
				<Reason userClass={this} ref="reason" />
				<a className="singleBtn" onClick={this.giveUp}>提交</a>
			</div>
		);
	}
}
class Contract extends Component{
	constructor(props){
		super(props);
		this.state = props;
		store.dispatch({
			type : "contract",
			component : this
		});
		let dialog = store.getState().dialog.component,
			filterState = store.getState().filter.component.state,
			statuses = filterState.statuses,
			status;
		this.getStatus = () => {
			status = this.state.status;
			return status && this.state.option[Object.keys(statuses).indexOf(status)] || {};
		};
		this.getFromType = () => {
			return this.state.fromType;
		};
		this.accept = () => {
			let state = this.state;
			$.ajax({
				url : "/api/manage/contract/accept",
				timeout : 2000,
				data : {
					referer : location.href,
					mobile : state.mobile,
					code : state.code
				}
			}).done(data => {
				afterSign(data, data => {
					console.log(data);
				}, dialog);
			}).fail(xhr => {
				xhrTimeout("签约结果", dialog);
			});
		};
		this.giveUp = () => {
			dialog.setState({
				option : {
					title : {
						iconClassName : "info",
						name : "温馨提示",
						btnClose : 1
					},
					content : createFactory(DialogContent)({}),
				},
				isShow : 1
			});
		};
	}
	componentDidUpdate(){
		let dialog = store.getState().dialog.component,
			state = this.state;
		this.state.detail || $.ajax({
			url : "/api/manage/contract/detail",
			timeout : 2000,
			data : {
				code : state.code
			}
		}).done(data => {
			afterSign(data, data => {
				let _data = data.data;
				this.setState({
					detail : 1,
					mobile : _data.mobile,
					status : _data.status,
					fromType : _data.signFailedFrom,
					from : _data.signFailedFromName,
					reason : _data.signFailedReason
				});
			}, dialog);
		}).fail(xhr => {
			xhrTimeout("合同详情", dialog);
		});
	}
	render(){
		let state = this.state,
			status = this.getStatus(),
			filePath = state.code ? `${state.filePath}?${stringify({
				code : state.code
			})}` : "";
		return (
			<div className="content contract">
				<div className={`status ${status.className}`}>
					<p className="title">
						<i></i>
						<strong>
							{status.title}
						</strong>
					</p>
					<p className="note">
						{status.note}
					</p>
				</div>
				{
					filePath ? <embed name="plugin" src={filePath}></embed> : []
				}
				{
					status.enable ? [] : (
						<div className="option">
							<a className="singleBtn accept" onClick={this.accept}>签约</a>
							<a className="singleBtn giveUp" onClick={this.giveUp}>放弃</a>
						</div>
					)
				}
				{
					state.isFailed ? [] : (
						<div className="reason">
							<p>
								<span>失败来源:</span>
								<strong>
									{state.from}
								</strong>
							</p>
							<p>
								<span>失败原因:</span>
								<strong>
									{`客户${this.getFromType() >> 1 ? state.mobile : ""}${state.reason || ""}`}
								</strong>
							</p>
						</div>
					)
				}
			</div>
		);
	}
}
Contract.defaultProps = {
	filePath : "/api/stream/contract",
	option : [
		{
			enable : 0,
			title : "您的签约未完成",
			note : "如您仍未签约，请您完成合同的签约或放弃签约；如您已经签约，本次签约正在处理中，请静候他方的签约结果。",
			className : "processing"
		},
		{
			enable : 1,
			title : "此份合同签约失败",
			note : "",
			className : "failure"
		},
		{
			enable : 1,
			title : "此份合同已成功签约",
			note : "",
			className : "done"
		}
	]
};
class Filter extends Component{
	constructor(props){
		super(props);
		this.state = props;
		store.dispatch({
			type : "filter",
			component : this
		});
		this.getProject = () => {
			return this.state.arrProject || [];
		};
		this.getType = () => {
			return this.state.types || [];
		};
		this.getStatus = () => {
			return this.state.statuses || [];
		};
		this.getFrom = () => {
			return this.state.failTypes || [];
		};
		this.getSign = () => {
			return [, "我方未签", "我方已签"];
		};
		this.getIptVal = name => {
			return this.refs[name].refs.ipt.value;
		};
		let dateStart,
			dateEnd;
		this.toggleStart = () => {
			dateStart = !this.state.dateStart;
			dateEnd = 0;
			this.setState({
				dateStart,
				dateEnd
			});
		};
		this.toggleEnd = () => {
			dateStart = 0;
			dateEnd = !this.state.dateEnd;
			this.setState({
				dateStart,
				dateEnd
			});
		};
		this.getDateStart = (dateText, moment, view) => {
			this.setState({
				startDate : dateText,
				dateStart : 0,
			});
		};
		this.getDateEnd = (dateText, moment, view) => {
			this.setState({
				endDate : dateText,
				dateEnd : 0
			});
		};
		this.handleSearch = () => {
			let state = this.state,
				projectName = this.getIptVal("projectName");
			store.getState().table.component.getData({
				projectName : projectName ? encodeURI(projectName) : undefined,
				type : state.type,
				status : state.status,
				isSign : state.isSign,
				signTimeStart : state.startDate,
				signTimeEnd : state.endDate
			});
		};
	}
	componentDidMount(){
		let dialog = store.getState().dialog.component;
		require.ensure([], require => {
			let datePicker = require("react-date-picker");
			this.setState({
				datePicker
			});
		}, "datepicker");
		// $.ajax({
		// 	url : "/api/manage/project/list",
		// 	timeout : 2000
		// }).done(data => {
		// 	afterSign(data, data => {
		// 		let project = [];
		// 		data.data.map(list => {
		// 			project[list.code] = list.name;
		// 		});
		// 		this.setState({
		// 			arrProject : project
		// 		});
		// 	}, dialog);
		// }).fail(xhr => {
		// 	xhrTimeout("项目列表", dialog);
		// });
		$.ajax({
			url : "/api/manage/contract/condition",
			timeout : 2000
		}).done(data => {
			let dialog = store.getState().dialog.component;
			afterSign(data, data => {
				let _data = data.data,
					option = {};
				for(let i in _data){
					option[i] = [];
					_data[i].map(list => {
						option[i][list.value] = list.label;
					});
				}
				this.setState(option);
			}, dialog);
		}).fail(xhr => {
			xhrTimeout("合同类别及合同状态", dialog);
		});
	}
	render(){
		let state = this.state,
			DatePicker = state.datePicker,
			isStart = state.dateStart,
			isEnd = state.dateEnd,
			startDate = state.startDate,
			endDate = state.endDate;
		return (
			<div className="filter">
				<label>开始日期:</label>
				<input className="ipt-txt" placeholder="请选择开始日期" readOnly="readOnly" onClick={this.toggleStart} value={this.state.startDate} />
				<label>截止日期:</label>
				<input className="ipt-txt" placeholder="请选择截止日期" readOnly="readOnly" onClick={this.toggleEnd} value={this.state.endDate} />
				{
					DatePicker ?
						<DatePicker
							className={`${isStart || isEnd ? "on" : "off"}${isStart ? " start" : ""}${isEnd ? " end" : ""}`}
							minDate={isStart ? "2010-01-01" : startDate || "2010-01-01"}
							maxDate={isEnd ? Date.now() : endDate || Date.now()}
							defaultDate={Date.now()}
							highlightWeekends={true}
							locale="zh-cn"
							todayText="当前月"
							gotoSelectedText="选中日"
							onChange={this[`getDate${isStart ? "Start" : "End"}`]} /> : []
				}
				<label htmlFor="isSign">我方签约:</label>
				<SelectGroup id="isSign" option={
					[this.getSign()]
				} checkType="single" callback={
					(completeStatus, selectIndex) => {
						completeStatus && this.setState({
							isSign : selectIndex[0] >> 1
						});
					}
				} />
				<InputRow option={
					{
						label : "项目名称",
						className : "ipt-txt"
					}
				} ref="projectName" />
				<label htmlFor="type">合同类型:</label>
				<SelectGroup id="type" option={
					[this.getType()]
				} checkType="single" callback={
					(completeStatus, selectIndex) => {
						completeStatus && this.setState({
							type : selectIndex[0]
						});
					}
				} />
				<label htmlFor="status">合同状态:</label>
				<SelectGroup id="status" option={
					[this.getStatus()]
				} checkType="single" callback={
					(completeStatus, selectIndex) => {
						completeStatus && this.setState({
							status : selectIndex[0]
						});
					}
				} />
				<div className="option">
					<a className="singleBtn" onClick={this.handleSearch}>查询</a>
				</div>
			</div>
		);
	}
}
class Tr extends Component{
	constructor(props){
		super(props);
		this.state = props;
		let content = store.getState().content.component,
			state;
		this.getSignStatus = status => {
			return status === "SIGN";
		};
		this.dateFormat = object => {
			for(let i in object){
				if(~i.search(/(date)|(time)|(gmt)/ig)){
					object[i] = object[i].split(/\s/)[0];
				}
			}
		};
		this.handleSign = () => {
			state = this.state,
			state.isSign || content.handleSign(() => {
				let option = state.option;
				store.getState().contract.component.setState({
					code : state.option.code,
					isFailed : this.getIsFailed(option) ? 0 : 1
				});
			});
		};
		let setting = store.getState().filter.component.state,
			option;
		this.getStatus = () => {
			option = this.state.option;
			return setting.statuses[option.status];
		};
		this.getType = () => {
			option = this.state.option;
			return setting.types[option.type];
		};
		this.getIsFailed = option => {
			return option.status === "SIGN_FAILURE"
		};
	}
	componentWillReceiveProps(nextProps){
		this.setState(nextProps);
	}
	render(){
		let lists = [],
			option = this.state.option;
		this.dateFormat(option);
		for(let i in option){
			lists.push(
				<td key={i}>
					{
						i === "isSign" ? (
							<a onClick={this.handleSign}>
								{
									this.getSignStatus(option.status) ? "签约" : "查看"
								}
							</a>
						) : 
							i === "status" ? (
								this.getStatus()
							) : 
								i === "type" ? (
									this.getType()
								) : 
									i === "projectName" ? (
											<div>
												{option[i]}
											</div>
										) : option[i]
					}
				</td>
			);
		}
		return (
			<tr>
				{lists}
			</tr>
		);
	}
}
class Table extends Component{
	constructor(props){
		super(props);
		this.state = props;
		store.dispatch({
			type : "table",
			component : this
		});
		this.getData = option => {
			if(option){
				for(let i in option){
					if(option[i] === "0"){
						delete option[i];
					}
				}
			}
			let dialog = store.getState().dialog.component;
			$.ajax({
				url : "/api/manage/contract/list",
				timeout : 2000,
				data : option
			}).done(data => {
				afterSign(data, data => {
					this.setState({
						option : data.data
					});
				}, dialog);
			}).fail(xhr => {
				xhrTimeout("合同列表", dialog);
			});
		};
		this.getOption = object => {
			let option = [];
			for(let i in this.state.title){
				option[i] = object[i];
			}
			return option;
		};
	}
	componentDidMount(){
		this.getData();
	}
	render(){
		let thead = [],
			lists = [],
			state = this.state,
			title = state.title,
			option = state.option;
		for(let i in title){
			thead.push(
				<th key={i}>
					{title[i]}
				</th>
			);
		}
		option && option.map((list, index) => {
			lists.push(
				<Tr option={this.getOption(list)} key={index} userClass={this} />
			);
		});
		return (
			<table className={lists.length ? "" : "blank"}>
				<thead>
					<tr>
						{thead}
					</tr>
				</thead>
				<tbody>
					{
						lists.length ?
						lists :
						<tr>
							<td colSpan={Object.keys(thead).length}>
								<div className="noData"></div>
							</td>
						</tr>
					}
				</tbody>
			</table>
		);
	}
}
Table.defaultProps = {
	title : {
		code : "合同号",
		type : "合同类型",
		projectName : "项目名称",
		signTime : "时间",
		status : "状态",
		isSign : "操作"
	},
	option : []
};
class Content extends Component{
	constructor(props){
		super(props);
		store.dispatch({
			type : "content",
			component : this
		});
		this.handleSign = callback => {
			props.userClass.setState({
				status : 1
			}, () => {
				callback();
			});
		};
	}
	render(){
		return (
			<div className="content">
				<h1>我的合同</h1>
				<Filter />
				<Table />
			</div>
		);
	}
}
class Main extends Component{
	constructor(){
		super();
		this.state = {};
	}
	render(){
		let state = this.state;
		return (
			<div className="mainArea">
				<div className="w1000">
					<Menu index={4} />
					{
						state.status ? <Contract /> : <Content userClass={this} />
					}
				</div>
			</div>
		);
	}
}
class Page extends Component{
	render(){
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
};