import React, {Component, createFactory} from "react";
import {findDOMNode} from "react-dom";
import {createStore} from "redux";
import {parse} from "querystring";
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
				url : "/api/upload/bill",
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
							e.target.value = "";
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
			orderCode = parse(location.search.substr(1)).orderCode;
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
			orderCode = parse(location.search.slice(1)).orderCode;
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
			maxlength : 15,
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
			state,
			status;
		this.getProject = () => {
			return this.state.arrProject || [];
		};
		this.getManufacturer = () => {
			return this.state.arrManufacturer || [];
		};
		this.getStatus = subscriber => {
			status = [];
			(this.state.arrStatus || []).map(list => {
				status[list.value] = list.label;
			});
			if(subscriber){
				let arrSubscriber = this.subscriber || [];
				arrSubscriber.push(subscriber);//cannot derepeat, memory leak!!!
				this.subscriber = arrSubscriber;
			}
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
		let projectName;
		this.handleSearch = () => {
			state = this.state;
			projectName = this.getIptVal("projectName");
			this.state.userClass.getData({
				projectName : projectName ? encodeURI(projectName) : undefined,
				supplierId : state.manufacturer,
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
			url : "/api/manage/bill/condition",
			timeout : 2000
		}).done(data => {
			afterSign(data, data => {
				this.setState({
					arrStatus : data.data.statusItem
				}, () => {
					let subscriber = this.subscriber;
					subscriber && subscriber.map(list => {
						list.forceUpdate();
					});
				});
			}, dialog);
		}).fail(xhr => {
			xhrTimeout("订单查询条件", dialog);
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
		$.ajax({
			url : "/api/manage/project/manufacturer",
			timeout : 2000
		}).done(data => {
			afterSign(data, data => {
				let manufacturer = [];
				data.data.map(list => {
					manufacturer[list.supplierId] = list.supplierName;
				});
				this.setState({
					arrManufacturer : manufacturer
				});
			}, dialog);
		}).fail(xhr => {
			xhrTimeout("项目列表", dialog);
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
				<label htmlFor="manufacturer">合作厂家:</label>
				<SelectGroup id="manufacturer" option={
					[this.getManufacturer()]
				} checkType="single" callback={
					(completeStatus, selectIndex) => {
						completeStatus && this.setState({
							manufacturer : selectIndex[0]
						});
					}
				} />
				<InputRow option={
					{
						label : "项目名称",
						className : "ipt-txt"
					}
				} ref="projectName" />
				<label htmlFor="state">订单状态:</label>
				<SelectGroup id="state" option={
					[this.getStatus()]
				} checkType="single" callback={
					(completeStatus, selectIndex) => {
						completeStatus && this.setState({
							state : selectIndex[0]
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
		this.getStatusName = status => {
			return store.getState().filter.component.getStatus(this)[status];
		};
		this.handleStatus = () => {
			// store.getState().content.component.setState({
			// 	progress : 1
			// }, () => {
			// 	store.getState().progress.component.setState({
			// 		code : this.state.option.orderCode
			// 	});
			// });
		};
		this.dateFormat = object => {
			for(let i in object){
				if(~i.search(/(date)|(time)|(gmt)/ig)){
					object[i] = object[i].split(/\s/)[0];
				}
			}
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
		this.dateFormat(option);
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
								i === "orderCode" || i === "projectName" ? (
									<div>{option[i]}</div>
								) :
									`${option[i]}${i === "purchaseAmount" || i === "doneAmount" ? "元" : ""}` : (
										<a className="btnFile" onClick={this.handleFile}>文件</a>
									)
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
		supplierName : "合作厂家",
		purchaseAmount : "订单金额",
		doneAmount : "已放款金额",
		gmtCreated : "申请时间",
		status : "订单状态"
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
			console.log(this.state.code)
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
			orderCode = parse(location.search.slice(1)).orderCode;
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
			progress = state.progress;
		return status ? (
				<Form bill={state.bill} />
			) : (
				<div className="content normal">
					<h1>我的订单</h1>
					{
						[]/*<a className="singleBtn" onClick={this.handleClick}>我要申请</a>*/
					}
					{
						progress ? <Progress /> : <Filter userClass={this} />
					}
					{
						progress ? [] : <Table option={option} />
					}
				</div>
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
}