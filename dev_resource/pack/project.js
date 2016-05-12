import React, {Component} from "react";
import {findDOMNode} from "react-dom";
import {createStore} from "redux";
import {parse} from "querystring";
import {afterSign, xhrTimeout} from "./util";
import Header from "../component/header";
import Footer from "../component/footer";
import Dialog from "../component/dialog";
import Menu from "../component/menu";
import InputRow from "../component/input";
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
//上传
class Upload extends Component{
	constructor(props){
		super(props);
		this.state = props;
		let userClass;
		this.handleChange = e => {
			let arrPath = e.target.value.split(/\\|\//),
				fileName = arrPath[arrPath.length - 1];
			userClass = this.state.userClass;
			$(findDOMNode(userClass)).ajaxSubmit({
				type : "post",
				url : "/api/upload/project",
				processData : 1,
				success : data => {
					afterSign(data, data => {
						this.setState({
							fileName,
							realPath : data.data.authFile
						}, () => {
							e.value = "";
						});
					}, store.getState().dialog.component);
				}
			});
		};
		this.delete = () => {
			this.setState({
				fileName : ""
			});
		}
	}
	render(){
		let fileName = this.state.fileName;
		return (
			<div className="row">
				<label htmlFor="upload">项目合同</label>
				<input type="file" name="upload" onChange={this.handleChange} />
				<a className="btnUpload">上传</a>
				<p>
					<span>
						{fileName ? fileName : "未选择文件"}
					</span>
					<i onClick={this.delete}></i>
				</p>
			</div>
		);
	}
}
//表单
class Form extends Component{
	constructor(props){
		super(props);
		this.state = props;
		let dialog = store.getState().dialog.component,
			code,
			id,
			name,
			supplierId,
			productCode,
			categoryCode,
			provinceCode,
			cityCode,
			areaCode,
			address,
			projectParty,
			contractAmount,
			loanAmount,
			loanPeriod,
			projectContractPath;
		//获取组装适配后的合作厂家
		this.getManufacturer = data => {
			let arrManufacturer = [],
				project = this.state.project;
			if(this.state.project){
				arrManufacturer[`${project.categoryCode}C${project.supplierId}`] = project.supplierName;
			}else{
				if(data.length){
					data.map((list, index) => {
						arrManufacturer[`${list.categoryCode}C${list.supplierId}`] = list.supplierName;
					});
				}else{
					arrManufacturer = data;
				};
			}
			return arrManufacturer;
		};
		//获取项目列表
		this.getList = () => {
			store.getState().content.component.getData();
		};
		//获取产品列表
		this.getProductData = () => {
			$.ajax({
				url : "/api/manage/product/list",
				timeout : 2000,
				data : {
					supplierId : this.state.manufacturer
				}
			}).done(data => {
				afterSign(data, data => {
					this.setState({
						arrProduct : this.getProduct(data.data)
					});
				}, dialog);
			}).fail(xhr => {
				xhrTimeout("产品列表", dialog);
			});
		};
		let arrProduct = [];
		this.getProduct = object => {
			arrProduct = [];
			object.map(list => {
				arrProduct[list.code] = list.name;
			});
			return arrProduct;
		};
		//获取用户填写数据,用户相关操作
		//input的value
		this.getIptVal = (iptName) => {
			return this.refs[iptName].refs.ipt.value;
		};
		//获取地址
		this.getAddress = (arrAddress, type) => {
			return arrAddress[type];
		};
		//所在地
		this.getArea = (provinceCode, cityCode, areaCode) => {
			let areaConfig = this.state.areaConfig,
				province = areaConfig[0],
				city = areaConfig[1],
				region = areaConfig[2],
				arrProvince = [],
				arrCity = [],
				arrArea = [];
			arrProvince[provinceCode] = province[provinceCode];
			arrCity[cityCode] = city[provinceCode][cityCode];
			arrArea[areaCode] = (region[cityCode] || city[provinceCode])[areaCode];
			return arrCity[cityCode] ? [arrProvince, arrCity, arrArea] : [arrProvince, arrArea];
		};
		//详细地址
		this.handleStreet = e => {
			return 0;
		};
		//提交申请
		this.handleSubmit = () => {
			let state = this.state,
				arrAddress = state.arrAddress;
			code = state.project ? state.project.code : "";
			id = state.project ? state.project.id : "";
			name = this.getIptVal("name");
			provinceCode = this.getAddress(arrAddress, 0);
			cityCode = this.getAddress(arrAddress, 1);
			areaCode = this.getAddress(arrAddress, 2);
			supplierId = state.manufacturer;
			productCode = state.product;
			categoryCode = state.category;
			address = this.refs.street.value;
			projectParty = this.getIptVal("projectParty");
			contractAmount = this.getIptVal("contractAmount");
			loanAmount = this.getIptVal("loanAmount");
			loanPeriod = state.term;
			projectContractPath = this.refs.upload.state.realPath;
			$.ajax({
				type : "post",
				url : "/api/manage/project/apply",
				timeout : 2000,
				data : {
					code,
					id,
					name,
					supplierId,
					productCode,
					categoryCode,
					provinceCode,
					cityCode,
					areaCode,
					address,
					projectParty,
					contractAmount,
					loanAmount,
					loanPeriod,
					projectContractPath,
				}
			}).done(data => {
				afterSign(data, data => {
					this.setState({
						status : 1
					});
				}, dialog);
			}).fail(xhr => {
				xhrTimeout("申请项目", dialog);
			});
		};
	}
	componentDidMount(){
		let dialog = store.getState().dialog.component,
			project = this.state.project,
			sup = [],
			sub = [];
		require.ensure([], require => {
			const Area_Config = require("../lib/area_config");
			let areaConfig = [];
			for(let i in Area_Config){
				areaConfig.push(Area_Config[i]);
			}
			this.setState({
				areaConfig
			});
		}, "area_config");
		//获取合作厂家列表
		if(project){
			this.setState({
				arrManufacturer : this.getManufacturer()
			}, () => {
				this.getProductData();
			});
		}else{
			$.ajax({
				url : "/api/manage/project/manufacturer",
				timeout : 2000
			}).done(data => {
				afterSign(data, data => {
					this.setState({
						arrManufacturer : this.getManufacturer(data.data)
					});
				});
			}).fail(xhr => {
				xhrTimeout("合作厂家列表", dialog);
			});
		}
	}
	render(){
		let lists = [],
			state = this.state,
			option = state.option,
			areaConfig = state.areaConfig || [],
			arrManufacturer = state.arrManufacturer,
			arrProduct = state.arrProduct,
			isSubmit,
			project = state.project;
		option.map((list, index) => {
			if(list.iptType){
				lists.push(
					<InputRow option={list} key={index} ref={list.id} value={project ? project[list.id] : undefined} />
				);
			}else{
				list.id === "address" && lists.push(
					<div className="row" key={index}>
						<label htmlFor={list.id}>
							{list.label}
						</label>
						<SelectGroup id={list.id} default={project} option={
							project && areaConfig.length ? this.getArea(project.provinceCode, project.cityCode, project.areaCode) : areaConfig
						} checkType="region" ref={list.id} callback={
							(completeStatus, selectIndex) => {
								this.setState({
									showAddress : completeStatus,
									arrAddress : selectIndex
								});
							}
						} />
						{
							state.showAddress ? <input className={`ipt-txt single${project && project.address ? " disabled" : ""}`} placeholder={`请输入${list.label}`} ref="street" value={project ? project.address : undefined} onChange={this.handleStreet} /> : []
						}
					</div>
				);
				list.id === "loanPeriod" && lists.push(
					<div className="row" key={index}>
						<label htmlFor={list.id}>
							{list.label}
						</label>
						<SelectGroup id={list.id} option={
							[
								[,,"2个月", "3个月", "4个月", "5个月", "6个月"]
							]
						} checkType="single" ref={list.id} callback={
							(completeStatus, selectIndex) => {
								completeStatus && this.setState({
									term : selectIndex[0]
								});
							}
						} />
					</div>
				);
				list.id === "manufacturer" && arrManufacturer && lists.push(
					<div className="row" key={index}>
						<label htmlFor={list.id}>
							{list.label}
						</label>
						<SelectGroup default={project} id={list.id} option={
							[
								this.getManufacturer(arrManufacturer)
							]
						} checkType="single" ref={list.id} callback={
							(completeStatus, selectIndex) => {
								if(completeStatus){
									let arrCode = selectIndex[0].split(/C/);
									this.setState({
										category : arrCode[0],
										manufacturer : arrCode[1],
										showProduct : 1
									}, () => {
										this.getProductData();
									});
								}
							}
						} />
						<a className="add" href="/manage/manufacturer">＋新增</a>
					</div>
				);
				list.id === "product" && state.showProduct && arrProduct && lists.push(
					<div className="row" key={index}>
						<label htmlFor={list.id}>
							{list.label}
						</label>
						<SelectGroup id={list.id} option={
							[arrProduct]
						} checkType="single" ref={list.id} callback={
							(completeStatus, selectIndex) => {
								completeStatus && this.setState({
									product : selectIndex[0]
								});
							}
						}/>
					</div>
				);
			}
		});
		return state.status ? 
		(
			<div className="content success">
				<div className="note">
					<h2>您的申请已经提交</h2>
					<p>我们的专属服务人员将于两个工作日内与您联系</p>
					<a onClick={this.getList}>查看我的项目</a>
				</div>
			</div>
		) :
		(
			<form>
				{lists}
				<Upload ref="upload" userClass={this} />
				<input className="singleBtn" type="button" value="提交申请" onClick={this.handleSubmit} />
			</form>
		);
	}
}
Form.defaultProps = {
	option : [
		{
			iptType : 1,
			id : "name",
			className : "ipt-txt",
			label : "项目名称"
		},
		{
			iptType : 0,
			id : "address",
			label : "所在地"
		},
		{
			iptType : 1,
			id : "projectParty",
			className : "ipt-txt",
			label : "项目方",
			maxlength : 15
		},
		{
			iptType : 1,
			id : "contractAmount",
			className : "ipt-txt",
			label : "合同金额",
			maxlength : 15,
			unit : "元"
		},
		{
			iptType : 1,
			id : "loanAmount",
			className : "ipt-txt",
			label : "申请金额",
			maxlength : 15,
			unit : "元"
		},
		{
			iptType : 0,
			id : "loanPeriod",
			label : "申请期限"
		},
		{
			iptType : 0,
			id : "manufacturer",
			label : "合作厂家"
		},
		{
			iptType : 0,
			id : "product",
			label : "产品"
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
				name : projectName ? encodeURI(projectName) : undefined,
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
			url : "/api/manage/project/condition",
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
				<label htmlFor="state">项目状态:</label>
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
class Table extends Component{
	constructor(props){
		super(props);
		this.state = props;
		this.getStatusName = status => {
			return store.getState().filter.component.getStatus(this)[status];
		};
	}
	componentDidMount(){
		let dialog = store.getState().dialog.component;
		$.ajax({
			url : "/api/user/supplier/category",
			timeout : 2000
		}).done(data => {
			afterSign(data, data => {
				let arrCategory = [];
				data.data.map((list) => {
					arrCategory[list.value] = list.label;
				});
				this.setState({
					arrCategory
				});
			}, dialog);
		}).fail(xhr => {
			xhrTimeout("合作厂家所属品类", dialog);
		});
	}
	componentWillReceiveProps(nextProps){
		this.setState(nextProps);
	}
	render(){
		let titles = [],
			lists = [],
			state = this.state,
			thead = state.title,
			arrCategory = state.arrCategory || [],
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
				<tr key={index}>
					<td title={list.code}>
						<div>
							{list.code}
						</div>
					</td>
					<td title={list.name}>
						<div>
							{list.name}
						</div>
					</td>
					<td title={list.supplierName}>
						{list.supplierName}
					</td>
					<td>
						{arrCategory[list.categoryCode]}
					</td>
					<td title={`${list.loanAmount}元`}>
						{`${list.loanAmount}元`}
					</td>
					<td>
						{
							this.getStatusName(list.status)
						}
					</td>
				</tr>
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
		id : "项目编号",
		name : "项目名称",
		manufacturer : "合作厂家",
		category : "品类",
		sum : "申请金额",
		progress : "申请进度"
	}
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
			this.setState({
				status : 1
			});
		};
		let projectCode;
		this.getData = option => {
			if(option){
				for(let i in option){
					if(option[i] === "0"){
						delete option[i];
					}
				}
			}
			projectCode = parse(location.search.slice(1)).code;
			$.ajax({
				url : `/api/manage/project/${projectCode ? "detail" : "list"}`,
				timeout : 2000,
				data : option || {
					projectCode
				}
			}).done(data => {
				afterSign(data, data => {
					let project = data.data;
					if(projectCode){
						this.setState({
							status : 1,
							project
						});
					}else{
						this.setState({
							option : project
						});
					}
				}, dialog);
			}).fail(xhr => {
				xhrTimeout(`项目${projectCode ? "详情" : "列表"}`, dialog);
			});
		};
	}
	componentDidMount(){
		this.getData();
	}
	render(){
		let option = this.state.option,
			status = this.state.status;
		return status ?
			<Form project={this.state.project} /> : 
			option ? (
				<div className="content normal">
					<h1>我的项目</h1>
					{
						[]/*<a className="singleBtn" onClick={this.handleClick}>我要申请</a>*/
					}
					<Filter userClass={this} />
					<Table option={this.state.option} />
				</div>
			) : (
				<div className="content blank">
					<a className="singleBtn" onClick={this.handleClick}>我要申请</a>
				</div>
			);
	}
}
class Main extends Component{
	render(){
		return (
			<div className="mainArea">
				<div className="w1000">
					<Menu index={1} />
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
};