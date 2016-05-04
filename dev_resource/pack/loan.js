import React, {Component} from "react";
import {createStore} from "redux";
import {parse} from "querystring";
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
class Loan extends Component{
	constructor(props){
		super(props);
		this.state = props;
		store.dispatch({
			type : "loan",
			component : this
		});
		this.dateFormat = object => {
			for(let i in object){
				if(~i.search(/(date)|(time)|(gmt)/ig)){
					object[i] = object[i].split(/\s/)[0];
				}else{
					object[i] = object[i] || "0";
				}
			}
		};
	}
	componentDidMount(){
		$.ajax({
			url : "/api/manage/bill/plan",
			data : {
				loanCode : parse(location.search.slice(1)).code
			}
		}).done(data => {
			afterSign(data, data => {
				let dataCollection = data.data,
					_data;
				for(let i in dataCollection){
					_data = dataCollection[i];
					if(_data instanceof Array){
						_data.map((list, index) => {
							if(i === "refundDetailVOList"){
								list.index = index + 1;
							}
							this.dateFormat(list);
						});
					}else{
						_data instanceof Object && this.dateFormat(_data);
					}
				}
				this.setState({
					projectName : dataCollection.projectName,
					orderCode : dataCollection.orderCode,
					detail : dataCollection.refundSummaryVO,
					planList : dataCollection.refundPlanVOList,
					refundList : dataCollection.refundDetailVOList
				});
			});
		});
	}
	render(){
		let state = this.state;
		return (
			<div className="loan">
				<div className="title">
					<h2>
						{`项目名称:${state.projectName}`}
					</h2>
					<p>
						{`订单号:${state.orderCode}`}
					</p>
					<i className="tel"></i>
				</div>
				<ul className="iconInfo">
					<li>
						<i className="lock"></i>
						<span>待付贷款</span>
						<span>
							{state.detail ? `${state.detail.principalRemain}元` : ""}
						</span>
					</li>
					<li>
						<i className="card"></i>
						<span>计费方式</span>
						<span>按月付费，到期付款</span>
					</li>
					<li>
						<i className="calendar"></i>
						<span>起止时间</span>
						<span>
							{
								state.detail ? `${state.detail.loanInfoStartDate}至${state.detail.loanInfoEndDate}` : ""
							}
						</span>
					</li>
				</ul>
				<ul className="bigFontInfo">
					{
						state.detail && state.detail.minRepayAmount - 0 ?
						(
							<li className="overdue">
								<p>
									<span>逾期应付总额</span>
									<strong>
										{state.detail ? state.detail.minRepayAmount : ""}
									</strong>
									<span>元</span>
								</p>
								<p>您已逾期，请于今日付款至仟金顶账户，并致电结算中心。</p>
							</li>
						) : []
					}
					<li>
						<p>
							<span>本期应付总额</span>
							<strong>
								{state.detail ? state.detail.currentTotalRepay : ""}
							</strong>
							<span>元</span>
						</p>
						<p>
							{
								`本期应付总额不包括逾期应付总额。请于${state.detail ? state.detail.currentRepayDate : ""}之前付款到仟金顶账户。`
							}
						</p>
					</li>
					<li>
						<p>
							<span>全部应付总额</span>
							<strong>
								{state.detail ? state.detail.maxRepayAmount : ""}
							</strong>
							<span>元</span>
						</p>
						<p>如需全额还款，请于今日付款至仟金顶账户，并致电结算中心。</p>
					</li>
				</ul>
				<h3>付款计划表</h3>
				<Table title={
					{
						agingNo : "期数",
						repaymentDate : "还款日",
						interestExprected : "预期服务费",//wrong spelling!!!
						overdueFineReceivable : "应付罚款",
						principalReceivable : "应付货款",
						interestReceivable : "应付服务费",
						totalReceivable : "应付总额"
					}
				} option={state.planList} color={1} />
				<p className="note">置灰:未到期,置红:到期未还,置黑:到期已还。</p>
				<h3>付款明细</h3>
				<Table title={
					{
						index : "编号",
						repayDate : "付款日",
						penalty : "已付违约金",
						overdueFine : "已付罚款",
						interest : "已付服务费",
						loanInfoId : "已付货款",
						otherExpenses : "已付其他费用",
						totalRepay : "付款总额"
					}
				} option={state.refundList} />
			</div>
		);
	}
}
class Filter extends Component{
	constructor(props){
		super(props);
		this.state = props;
		store.dispatch({
			type : "filter",
			component : this
		});
		let project,
			state,
			status;
		this.getProject = () => {
			return this.state.arrProject || [];
		};
		this.getStatus = subscriber => {
			status = [];
			(this.state.arrStatus || []).map(list => {
				status[list.value] = list.label;
			});
			subscriber && this.setState({
				subscriber
			});
			return status;
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
		let projectName,
			orderCode;
		this.handleSearch = () => {
			state = this.state;
			projectName = this.getIptVal("projectName");
			orderCode = this.getIptVal("orderCode");
			this.state.userClass.getData({
				projectName : projectName ? encodeURI(projectName) : undefined,
				orderCode : orderCode ? encodeURI(orderCode) : undefined,
				status : state.state,
				startDate : state.startDate,
				endDate : state.endDate
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
		$.ajax({
			url : "/api/manage/loan/condition",
			timeout : 2000
		}).done(data => {
			afterSign(data, data => {
				this.setState({
					arrStatus : data.data.statusItem
				}, () => {
					let subscriber = this.state.subscriber;
					subscriber && subscriber.forceUpdate();
				});
			}, dialog);
		}).fail(xhr => {
			xhrTimeout("放款查询条件", dialog);
		});
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
				<label htmlFor="state">放款状态:</label>
				<SelectGroup id="state" option={
					[this.getStatus()]
				} checkType="single" callback={
					(completeStatus, selectIndex) => {
						completeStatus && this.setState({
							state : selectIndex[0]
						});
					}
				} />
				<InputRow option={
					{
						label : "项目名称",
						className : "ipt-txt"
					}
				} ref="projectName" />
				<InputRow option={
					{
						label : "订单编号",
						className : "ipt-txt"
					}
				} ref="orderCode" />
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
		this.getStatusName = status => {
			return store.getState().filter.component.getStatus(this)[status];
		};
		this.handleStatus = () => {
			store.getState().content.component.setState(this.getType() ? {
				loan : 1
			} : {
				progress : 1
			});
		};
		this.getClassName = status => {
			return status === "DONE" ? "off" : status === "UNINTEREST" || status === "INTERESTING" ? "normal" : "dalay";
		};
	}
	componentWillReceiveProps(nextProps){
		this.setState(nextProps);
	}
	render(){
		let lists = [],
			state = this.state,
			title = state.title,
			option = state.option,
			status = option.status,
			color = state.color;
		for(let i in title){
			lists.push(
				<td key={i}>
					{
						option[i] !== undefined ?
							i === "status" ? (
								<span className="btnProgress" onClick={this.handleStatus}>
									{this.getStatusName(option[i])}
								</span>
							) :  
								i === "id" || i === "orderCode" || i === "projectName" ? (
									<div>{option[i]}</div>
								) : 
									`${option[i]}${i === "amount" ? "元" : ""}` : "未放款"
					}
				</td>
			);
		}
		return (
			<tr className={color ? this.getClassName(status) : ""}>
				{lists}
			</tr>
		);
	}
}
class Table extends Component{
	constructor(props){
		super(props);
		this.state = props;
	}
	componentWillReceiveProps(nextProps){
		this.setState(nextProps);
	}
	render(){
		let titles = [],
			lists = [],
			state = this.state,
			thead = state.title,
			option = state.option;
		for(let i in thead){
			titles.push(
				<th key={i}>
					{thead[i]}
				</th>
			);
		}
		option && option.map((list, index) => {
			lists.push(
				<Tr key={index} title={this.state.title} option={list} color={state.color} />
			);
		});
		return (
			<table className={lists.length ? "" : "blank"}>
				<thead>
					<tr>
						{titles}
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
		id : "放款编号",
		orderCode : "订单编号",
		projectName : "项目名称",
		amount : "放款金额",
		gmtCreated : "申请时间",
		gmtPaid : "放款时间",
		status : "状态"
	}
};
class Content extends Component{
	constructor(props){
		super(props);
		this.state = props;
		let dialog = store.getState().dialog.component;
		this.getData = option => {
			$.ajax({
				url : "/api/manage/loan/list",
				data : option
			}).done(data => {
				afterSign(data, data => {
					this.setState({
						option : data.data
					});
				}, dialog);
			}).fail(xhr => {
				xhrTimeout("放款列表", dialog);
			})
		};
	}
	componentDidMount(){
		let code = parse(location.search.slice(1)).code;
		if(code){
			this.setState({
				status : 1
			});
		}else{
			this.getData();
		}
	}
	render(){
		let state = this.state,
			status = state.status,
			option = state.option,
			progress = state.progress,
			loan = state.loan;
		return status ? (
				<div className="content">
					<Loan />
				</div>
			) : (
				<div className="content normal">
					<h1>我的放款</h1>
					<Filter userClass={this} />
					<Table option={option} />
				</div>
			);
	}
}
class Main extends Component{
	render(){
		return (
			<div className="mainArea">
				<div className="w1000">
					<Menu index={3} />
					<Content />
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
	init,
	Page
};