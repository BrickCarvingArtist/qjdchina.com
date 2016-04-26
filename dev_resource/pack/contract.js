import React, {Component, createFactory} from "react";
import {createStore} from "redux";
import {parse} from "cookie";
import {afterSign, xhrTimeout} from "./util";
import Header from "../component/header";
import Footer from "../component/footer";
import Dialog from "../component/dialog";
import Menu from "../component/menu";
import SelectGroup from "../component/select_group";
import DatePicker from "react-date-picker";
import {stringify} from "qs";
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
			fromSetting = filterState.failTypes,
			status,
			from;
		this.getStatus = () => {
			status = this.state.status;
			return status && this.state.option[Object.keys(statuses).indexOf(status)] || {};
		};
		this.getFromType = () => {
			return this.state.from;
		}
		this.getFrom = () => {
			from = this.state.from;
			return from && fromSetting[from];
		};
		this.accept = () => {
			let state = this.state;
			$.ajax({
				url : "/api/manage/contract/accept",
				data : {
					mobile : state.mobile,
					id : state.id
				}
			}).done(data => {
				afterSign(data, data => {

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
		console.log(this.state)
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
					id : _data.id,
					mobile : _data.mobile,
					status : _data.status,
					from : _data.signFailedFrom,
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
			filePath = state.id && state.type ? `${state.filePath}?${stringify({
				id : state.id,
				type : state.type
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
					filePath ? <embed type="application/pdf" name="plugin" src={filePath}></embed> : []
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
									{this.getFrom()}
								</strong>
							</p>
							<p>
								<span>失败原因:</span>
								<strong>
									{`客户${this.getFromType() >> 1 ? state.mobile : ""}${state.reason}`}
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
			note : "卧槽",
			className : "failure"
		},
		{
			enable : 1,
			title : "此份合同已成功签约",
			note : "卧槽",
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
			let state = this.state;
			store.getState().table.component.getData({
				projectId : state.project,
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
		$.ajax({
			url : "/api/manage/project/list",
			timeout : 2000
		}).done(data => {
			afterSign(data, data => {
				let project = [];
				data.data.map(list => {
					project[list.code] = list.name;
				});
				this.setState({
					arrProject : project
				});
			}, dialog);
		}).fail(xhr => {
			xhrTimeout("项目类别", dialog);
		});
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
		}).fail(status => {
			xhrTimeout("合同类别及合同状态", dialog);
		});
	}
	render(){
		let state = this.state,
			isStart = state.dateStart,
			isEnd = state.dateEnd,
			startDate = state.startDate,
			endDate = state.endDate;
		return (
			<div className="filter">
				<label htmlFor="project">项目:</label>
				<SelectGroup id="project" option={
					[this.getProject()]
				} checkType="single" callback={
					(completeStatus, selectIndex) => {
						completeStatus && this.setState({
							project : selectIndex[0]
						});
					}
				} />
				<label htmlFor="type">类型:</label>
				<SelectGroup id="type" option={
					[this.getType()]
				} checkType="single" callback={
					(completeStatus, selectIndex) => {
						completeStatus && this.setState({
							type : selectIndex[0]
						});
					}
				} />
				<label>时间:</label>
				<input className="dateText" placeholder="请选择起始日" readOnly="readOnly" onClick={this.toggleStart} value={this.state.startDate} />
				<label>至:</label>
				<input className="dateText" placeholder="请选择终止日" readOnly="readOnly" onClick={this.toggleEnd} value={this.state.endDate} />
				<DatePicker
					className={`${isStart || isEnd ? "on" : "off"}${isStart ? " start" : ""}${isEnd ? " end" : ""}`}
					minDate={isStart ? "2010-01-01" : startDate || "2010-01-01"}
					maxDate={isEnd ? Date.now() : endDate || Date.now()}
					defaultDate={Date.now()}
					highlightWeekends={true}
					locale="zh-cn"
					todayText="当前月"
					gotoSelectedText="选中日"
					onChange={this[`getDate${isStart ? "Start" : "End"}`]} />
				<label htmlFor="status">状态:</label>
				<SelectGroup id="status" option={
					[this.getStatus()]
				} checkType="single" callback={
					(completeStatus, selectIndex) => {
						completeStatus && this.setState({
							status : selectIndex[0]
						});
					}
				} />
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
				<a className="singleBtn" onClick={this.handleSearch}>查询</a>
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
		this.getIsFailed = option => {
			return option.status === "SIGN_FAILURE";
		};
		this.handleSign = () => {
			state = this.state,
			state.isSign || content.handleSign(() => {
				let option = state.option;
				store.getState().contract.component.setState({
					id : state.id,
					code : state.option.code,
					type : option.type,
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
	}
	render(){
		let lists = [],
			option = this.state.option;
		for(let i in option){
			lists.push(
				<td key={i}>
					{
						i === "isSign" ? (
							<a onClick={this.handleSign}>
								{
									this.getIsFailed(option) ? "查看" : "签约"
								}
							</a>
						) : i === "status" ? (
							this.getStatus()
						) : i === "type" ? (
							this.getType()
						) :option[i]
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
			for(let i in option){
				option[i] = option[i] === "0" ? undefined : option[i];
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
				if(~i.search(/time/ig)){
					option[i] = object[i].split(/\s/)[0];
				}else{
					option[i] = object[i];
				}
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
				<Tr id={list.id} option={this.getOption(list)} key={index} userClass={this} />
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
			<div className="content list">
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
					<Menu index={3} />
					{
						state.status ? <Contract /> : <Content userClass={this} />
					}
				</div>
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
				url : "/api/manage/corporation/info"
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
};