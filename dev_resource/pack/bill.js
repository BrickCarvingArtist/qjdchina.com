import React, {Component, createFactory} from "react";
import {findDOMNode} from "react-dom";
import {createStore} from "redux";
import {parse} from "cookie";
import DatePicker from "react-date-picker";
import {afterSign, xhrTimeout} from "./util";
import Header from "../component/header";
import Footer from "../component/footer";
import Dialog from "../component/dialog";
import InputRow from "../component/input";
import Menu from "../component/menu";
import SelectGroup from "../component/select_group";
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
class File extends Component{
	constructor(props){
		super(props);
		this.state = props;
		let dialogContent,
			option;
		this.handleDelete = () => {
			dialogContent = store.getState().dialogContent.component;
			option = dialogContent.state.option;
			option.splice(this.state.index, 1);
			dialogContent.setState({
				option
			});
		};
	}
	componentWillReceiveProps(nextProps){
		this.setState(nextProps);
	}
	render(){
		let state = this.state,
			index = state.index,
			option = state.option,
			dialogContent = store.getState().dialogContent.component,
			isUpload = dialogContent.state.upload;
		return (
			<li>
				{
					isUpload ? 
					(
						<a>{`文件${index + 1}`}</a>
					) : (
						<a href={`/${option.fileUploadPath.substr(1)}`} target="_blank">
							{`文件${index + 1}:${option.name}`}
						</a>
					)
				}
				{
					isUpload ?
					(
						<i className="del" onClick={this.handleDelete}></i>
					) : []
				}
			</li>
		);
	}
}
class Files extends Component{
	constructor(props){
		super(props);
		this.state = props;
	}
	componentWillReceiveProps(nextProps){
		this.setState(nextProps);
	}
	render(){
		let lists = [],
			option = this.state.option;
		option && option.map((list, index) => {
			lists.push(
				<File index={index} key={index} id={list.id} option={list} />
			);
		});
		return (
			<ul>
				{lists}
			</ul>
		);
	}
}
class DialogContent extends Component{
	constructor(){
		super();
		this.state = {};
		store.dispatch({
			type : "dialogContent",
			component : this
		});
		let arrFilePath,
			option;
		this.handleUpload = e => {
			arrFilePath = e.target.value.split(/\\/);
			$(findDOMNode(this)).ajaxSubmit({
				type : "post",
				url : "/api/manage/billfile/upload",
				processData : 1,
				success : data => {
					afterSign(data, data => {
						option = this.state.option || [];
						option.push({
							filePath : data.data.authFile,
							id : option.length,
							name : arrFilePath[arrFilePath.length - 1]
						});
						this.setState({
							option
						}, () => {
							e.value = "";
						});
					}, store.getState().dialog.component);
				}
			});
		};
	}
	render(){
		let state = this.state;
		return (
			<form className="content">
				<Files option={state.option} code={state.code} />
				{
					state.upload ? (
						<div className="singleBtn">
							<input type="file" multiple="multiple" name="upload" onChange={this.handleUpload} />
						</div>
					) : []
				}
			</form>
		);
	}
}
class Form extends Component{
	constructor(props){
		super(props);
		this.state = props;
		let dialog = store.getState().dialog.component;
		store.dispatch({
			type : "form",
			component : this
		});
		this.handleUpload = () => {
			dialog.setState({
				option : {
					title : {
						iconClassName : "upload",
						name : "文件上传",
						btnClose : 1
					},
					content : createFactory(DialogContent)({}),
					message : 0
				},
				isShow : 1
			}, () => {
				store.getState().dialogContent.component.setState({
					upload : 1
				});
			});
		};
		let arrProduct,
			orderCode,
			project,
			bill;
		this.getProduct = () => {
			arrProduct = [];
			orderCode = parse(location.search.substr(1)).code;
			if(orderCode){
				bill = this.state.bill;
				arrProduct[bill.productCode] = bill.productName;
				arrProduct.length = 1;
				return arrProduct;
			}else{
				$.ajax({
					url : "/api/manage/product/list",
					timeout : 2000,
					data : {
						projectCode : this.state.project
					}
				}).done(data => {
					let product;
					afterSign(data, data => {
						product = data.data;
						product.map((list, index) => {
							arrProduct[list.code] = list.name;
						});
						arrProduct.length = product.length;
						this.setState({
							arrProduct
						});
					}, dialog);
				}).fail(xhr => {
					xhrTimeout("产品列表", dialog);
				});
			}
		};
		this.getProject = () => {
			bill = this.state.bill;
			project = [];
			orderCode = parse(location.search.slice(1)).code;
			if(orderCode){
				project[bill.project.code] = bill.project.name;
				this.setState({
					arrProject : project,
					arrProduct : this.state.bill ? this.getProduct() : []
				});
			}else{
				this.setState({
					arrProject : store.getState().filter.component.state.arrProject,
					arrProduct : this.state.bill ? this.getProduct() : []
				});
			}
		};
		this.getIptValue = (iptName) => {
			return this.refs[iptName].refs.ipt.value;
		};
		this.getSelectValue = (selectName) => {
			return this.refs[selectName].state.selectIndex[0];
		};
		let projectCode,
			productCode,
			purchaseAmount,
			arrUpload,
			orderUploads;
		this.handleSubmit = () => {
			projectCode = this.getSelectValue("projectCode");
			productCode = this.getSelectValue("productCode");
			purchaseAmount = this.getIptValue("purchaseAmount");
			arrUpload = store.getState().dialogContent.component.state.option;
			orderUploads = [];
			arrUpload.map(list => {
				orderUploads.push({
					name : list.name,
					fileUploadPath : list.filePath
				});
			});
			$.ajax({
				url : "/api/manage/bill/apply",
				type : "post",
				timeout : 2000,
				data : {
					projectCode,
					productCode,
					purchaseAmount,
					orderAttachmentVOList : JSON.stringify(orderUploads)
				}
			}).done(data => {
				afterSign(data, data => {
					dialog.setState({
						option : {
							title : {
								iconClassName : "info",
								name : "提示",
								btnClose : () => {
									location.href = "/manage/bill";
								}
							},
							content : 0,
							message : "申请成功"
						},
						isShow : 1
					});
				}, dialog);
			}).fail(xhr => {
				xhrTimeout("订单申请", dialog);
			});
		};
	}
	componentDidMount(){
		this.getProject();
	}
	render(){
		let lists = [],
			state = this.state,
			option = state.option,
			arrProject = state.arrProject,
			arrProduct = state.arrProduct,
			bill = state.bill;
		option.map((list, index) => {
			if(list.type){
				lists.push(
					<InputRow option={list} key={index} value={bill ? bill[list.id] : null} ref={list.id} />
				);
			}else{
				list.id === "projectCode" && arrProject && lists.push(
					<div className="row" key={index}>
						<label htmlFor={list.id}>
							{list.label}
						</label>
						<SelectGroup id={list.id} default={bill} option={
							[arrProject]
						} checkType="single" ref={list.id} value={bill ? bill.projectCode : null} callback={
							(completeStatus, selectIndex) => {
								this.setState({
									project : selectIndex[0]
								}, () => {
									this.getProduct();
								});
							}
						}/>
					</div>
				);
				list.id === "productCode" && arrProduct && arrProduct.length && lists.push(
					<div className="row" key={index}>
						<label htmlFor={list.id}>
							{list.label}
						</label>
						<SelectGroup id={list.id} default={bill} option={
							[arrProduct]
						} checkType="single" ref={list.id} value={bill ? bill.productCode : null} callback={
							(completeStatus, selectIndex) => {
								this.setState({
									product : selectIndex[0]
								});
							}
						}/>
					</div>
				);
				list.id === "orderUploads" && lists.push(
					<div className="row" key={index}>
						<label htmlFor={list.id}>
							{list.label}
						</label>
						<a className="btnUpload" title="采购合同、订货单等其它附件" onClick={this.handleUpload}>上传</a>
					</div>
				);
			}
		});
		return (
			<form>
				{lists}
				<input type="button" className="singleBtn" value="提交申请" onClick={this.handleSubmit} />
			</form>
		);
	}
}
Form.defaultProps = {
	option : [
		{
			type : 0,
			id : "projectCode",
			className : "ipt-txt",
			label : "选择项目"
		},
		{
			type : 0,
			id : "productCode",
			label : "选择产品"
		},
		{
			type : 1,
			id : "purchaseAmount",
			className : "ipt-txt",
			label : "订单总金额",
			unit : "元"
		},
		{
			type : 0,
			id : "orderUploads",
			label : "相关附件"
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
		let project,
			state;
		this.getProject = () => {
			return this.state.arrProject || [];
		};
		this.getState = () => {
			state = [];
			state["accepting"] = "受理中";
			state["signing"] = "签约中";
			state["paid"] = "预付款已付";
			state["refunding"] = "还款中";
			state["settled"] = "已结清";
			return state;
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
			state = this.state;
			this.state.userClass.getData({
				projectCode : state.project,
				status : state.state,
				startDate : state.startDate,
				endDate : state.endDate
			});
		};
	}
	componentDidMount(){
		let dialog = store.getState().dialog.component;
		$.ajax({
			url : "/api/manage/project/list"
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
			xhrTimeout("项目列表", dialog);
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
				<label htmlFor="state">状态:</label>
				<SelectGroup id="state" option={
					[this.getState()]
				} checkType="single" callback={
					(completeStatus, selectIndex) => {
						completeStatus && this.setState({
							state : selectIndex[0]
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
				<a className="singleBtn" onClick={this.handleSearch}>查询</a>
			</div>
		);
	}
}
class Tr extends Component{
	constructor(props){
		super(props);
		this.state = props;
		let type;
		this.getType = () => {
			let arrStatus = Object.keys(store.getState().filter.component.getState()),
				status = this.state.option.status.toLowerCase();
			arrStatus.map((list, index) => {
				if(list === status){
					type = index;
				}
			});
			return type >> 1;
		};
		this.handleStatus = () => {
			store.getState().content.component.setState(this.getType() ? {
				loan : 1
			} : {
				progress : 1
			}, () => {
				if(this.getType()){
					let option = this.state.option;
					type = this.getType() ? "loan" : "progress";
					store.getState()[type].component.setState({
						code : option.orderCode,
						projectName : option.projectName
					});
				}
			});
		};
		this.handleFile = () => {
			store.getState().dialog.component.setState({
				option : {
					title : {
						iconClassName : "info",
						name : "查看文件",
						btnClose : 1
					},
					content : createFactory(DialogContent)({}),
					message : 0
				},
				isShow : 1
			}, () => {
				store.getState().dialogContent.component.setState({
					option : this.state.option.orderAttachmentVOList
				});
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
						option[i] ? i === "statusName" ? <span className="btnProgress" onClick={this.handleStatus}>{option[i]}</span> : `${option[i]}${i === "purchaseAmount" ? "元" : ""}` : <a className="btnFile" onClick={this.handleFile}>文件</a>
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
		orderCode : "订单号",
		projectName : "项目名称",
		purchaseAmount : "订单总金额",
		file : "相关附件",
		gmtCreated : "下单时间",
		statusName : "状态"
	}
};
class Progress extends Component{
	constructor(props){
		super(props);
		this.state = props;
		store.dispatch({
			type : "progress",
			component : this
		});
	}
	componentDidUpdate(){
		let dialog = store.getState().dialog.component;
		$.ajax({
			url : "/api/manage/bill/status",
			timeout : 2000,
			data : {
				orderCode : this.state.code
			}
		}).done(data => {
			afterSign(data, data => {
				let _option = data.data,
					option = this.state.option;
				_option.map((list, index) => {
					option[index * 2].date = list.time.split(/\s/)[0];
				});
				this.setState({
					index : _option.length,
					option
				});
			}, dialog);
		}).fail(xhr => {
			xhrTimeout("订单状态", dialog)
		});
	}
	render(){
		let lists = [],
			index = this.state.index || 0,
			option = this.state.option;
		option && option.map((list, index) => {
			lists.push(
				<li key={index}>
					<span>
						{list.name}
					</span>
					{
						list.date ? <span>{list.date}</span> : []
					}
				</li>
			);
		});
		return (
			<div className="progress">
				<div className={`bar ${option[index].className} success`}>
					<p></p>
					<i></i>
					<i></i>
					<i></i>
					<ul>
						{lists}
					</ul>
				</div>
				<p>
					{option[index].message}
				</p>
				<p>如有疑问，您可以通过以下方式联系我们</p>
				<p>TEL:400-826-582</p>
				<p>MAIL:service@qjdchina.com</p>
			</div>
		);
	}
}
Progress.defaultProps = {
	option : [
		{
			className : "step1",
			name : "订单申请",
			message : "您的审批已开始，我们将尽快安排专属服务人员与您联系"
		},
		{
			className : "step1",
			name : "受理中",
			message : "您的审批已开始，我们将尽快安排专属服务人员与您联系"
		},
		{
			className : "step2",
			name : "审批通过",
			message : "您的审批已成功通过，请等待签约结果"
		},
		{
			className : "step2",
			name : "签约中",
			message : "您的审批已成功通过，请等待签约结果"
		},
		{
			className : "step3",
			name : "签约成功",
			message : "您的签约已成功"
		}
	]
};
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
				if(~i.search(/date/ig)){
					object[i] = object[i].split(/\s/)[0];
				}else{
					object[i] = object[i] || "0";
				}
			}
		};
	}
	componentDidUpdate(){
		this.state.detail || $.ajax({
			url : "/api/manage/bill/plan",
			data : {
				orderId : this.state.code
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
						this.dateFormat(_data);
					}
				}
				this.setState({
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
						{`订单号:${state.code}`}
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
class Content extends Component{
	constructor(){
		super();
		this.state = {};
		let dialog = store.getState().dialog.component;
		store.dispatch({
			type : "content",
			component : this
		});
		this.handleClick = () => {
			//status 0 订单列表
			//status 1 申请订单
			this.setState({
				status : 1
			});
		};
		let orderCode;
		this.getData = option => {
			//来自卓筑 自携带在url中的订单号查询订单详情，补全表单信息
			orderCode = parse(location.search.slice(1)).code;
			if(option){
				for(let i in option){
					if(option[i] === "0"){
						delete option[i];
					}
				}
			}
			$.ajax({
				url : `/api/manage/bill/${orderCode ? "detail" : "list"}`,
				timeout : 2000,
				data : option || {
					orderCode
				}
			}).done(data => {
				afterSign(data, data => {
					let bill = data.data;
					if(orderCode){
						this.setState({
							status : 1,
							bill
						});
					}else{
						this.setState({
							option : bill
						});
					}
				}, dialog);
			}).fail(xhr => {
				xhrTimeout(`订单${orderCode ? "详情" : "列表"}`, dialog);
			});
		};
	}
	componentDidMount(){
		this.getData();
	}
	render(){
		let state = this.state,
			status = state.status,
			option = state.option,
			progress = state.progress,
			loan = state.loan;
		return status ? (
				<Form bill={state.bill} />
			) :
			option ? (
				<div className="content normal">
					{
						loan ? [] :<h1>我的订单</h1>
					}
					{
						loan ? [] : <a className="singleBtn" onClick={this.handleClick}>我要申请</a>
					}
					{
						progress ? <Progress /> : loan ? <Loan /> : <Filter userClass={this} />
					}
					{
						progress || loan ? [] : <Table option={option} />
					}
				</div>
			) : (
				<div className="content blank"></div>
			);
	}
}
class Main extends Component{
	render(){
		return (
			<div className="mainArea">
				<div className="w1000">
					<Menu index={2} />
					<Content />
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
				url : "/api/manage/corporation/info",
				timeout : 2000
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
}