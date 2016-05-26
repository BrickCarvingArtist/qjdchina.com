import React, {Component, createFactory} from "react";
import {findDOMNode} from "react-dom";
import {createStore} from "redux";
import {afterSign, xhrTimeout} from "./util";
import Header from "../component/header";
import Footer from "../component/footer";
import Menu from "../component/menu";
import Dialog from "../component/dialog";
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
				<a target="_blank" href={`/api/stream/manufacturer?partnerId=${store.getState().dialogContent.component.state.manufacturerId}`}>
					{`文件${index + 1}`}
				</a>
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
		let dialog = store.getState().dialog.component,
			arrFilePath,
			option;
		store.dispatch({
			type : "dialogContent",
			component : this
		});
		this.handleUpload = e => {
			arrFilePath = e.target.value.split(/\\/);
			$(findDOMNode(this)).ajaxSubmit({
				type : "post",
				url : "/api/upload/manufacturer",
				processData : 1,
				success : data => {
					afterSign(data, data => {
						$.ajax({
							url : "/api/manage/manufacturerfile/reassure",
							type : "post",
							timeout : 2000,
							data : {
								id : this.state.manufacturerId,
								authFile : data.data.authFile
							}
						}).done(_data => {
							afterSign(data, _data => {
								this.setState({
									option : [
										{
											name : arrFilePath[arrFilePath.length - 1],
											fileUploadPath : data.data.authFile
										}
									]
								}, () => {
									dialog.setState({
										option : {
											title : {
												iconClassName : "info",
												name : "温馨提示",
												btnClose : 1
											},
											message : "上传成功"
										}
									}, () => {
										store.getState().table.component.getData();
									});
								});
							}, dialog);
						}).fail(xhr => {
							xhrTimeout("资料上传结果", dialog);
						});
					}, dialog);
				}
			});
		};
	}
	render(){
		return (
			<form className="content">
				<Files option={this.state.option} code={this.state.code} />
				{
					this.state.upload ? (
						<div className="singleBtn">
							<input type="file" multiple="multiple" name="upload" onChange={this.handleUpload} />
						</div>
					) : []
				}
			</form>
		);
	}
}
class Add extends Component{
	constructor(props){
		super(props);
		this.state = props;
		let dialog = store.getState().dialog.component;
		this.handleAdd = () => {
			this.getOption();
		};
		this.getOption = () => {
			let option = this.state.option;
			if(option){
				this.setState({
					option,
					status : 1
				});
			}else{
				let sup = this.state.category,
					sub = [];
				for(let i in sup){
					sub[i] = [];
				}
				$.ajax({
					url : "/api/user/supplier/list",
					timeout : 2000
				}).done(data => {
					afterSign(data, data => {
						let arrManufacturer = data.data;
						arrManufacturer.map(list => {
							sub[list.categoryCode][list.id] = list.name;
						});
						this.setState({
							option : [sup, sub],
							status : 1
						});
					}, dialog);
				}).fail(xhr => {
					xhrTimeout("合作厂家列表", dialog);
				});
			}
		};
		this.handleSubmit = () => {
			let state = this.state,
				categoryCode = state.arrManufacturer[0],
				supplierId = state.arrManufacturer[1];
			$.ajax({
				url : "/api/manage/manufacturer/add",
				type : "post",
				timeout : 2000,
				data : {
					categoryCode,
					supplierId
				}
			}).done(data => {
				afterSign(data, data => {
					store.getState().table.component.getData();
				}, dialog);
			}).fail(xhr => {
				xhrTimeout("新增合作厂家操作结果", dialog);
			});
		};
		this.handleCancel = () => {
			this.setState({
				status : 0
			});
		};
	}
	componentWillReceiveProps(nextProps){
		this.setState(nextProps);
	}
	render(){
		let status = this.state.status;
		return status ? (
			<div className="option">
				<SelectGroup id="manufacturer" option={this.state.option} callback={
					(completeStatus, selectIndex) => {
						this.setState({
							arrManufacturer : selectIndex
						});
					}
				} checkType="manufacturer" />
				<a className="singleBtn submit" onClick={this.handleSubmit}>提交</a>
				<a className="singleBtn cancel" onClick={this.handleCancel}>取消</a>
			</div>
		) : (
			<a className="add" onClick={this.handleAdd}></a>
		);
	}
}
class Tr extends Component{
	constructor(props){
		super(props);
		this.state = props;
		this.getCategoryName = code => {
			return this.state.userClass.getCategoryName(code);
		};
		this.getStatusName = value => {
			return {
				TODO : "申请中",
				DONE : "申请成功",
				FAILURE : "申请失败"
			}[value];
		};
		this.handleFile = () => {
			store.getState().dialog.component.setState({
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
				let fileUploadPath = this.state.option.uploadPath.value;
				store.getState().dialogContent.component.setState({
					upload : 1,
					manufacturerId : this.state.id,
					option : fileUploadPath ? [
						{
							fileUploadPath : fileUploadPath
						}
					] : []
				});
			});
		}
	}
	componentWillReceiveProps(nextProps){
		this.setState(nextProps);
	}
	render(){
		let lists = [],
			option = this.state.option,
			value;
		for(let i in option){
			value = option[i].value;
			lists[option[i].index] = (
				<td key={i}>
					{
						i === "categoryCode" ?
							this.getCategoryName(value) :
							i === "status" ?
								`${option["uploadPath"].value ? "已" : "未"}上传证书` :
								i === "uploadPath" ?
									(
										<a className="btnFile" onClick={this.handleFile}>
											{option[i].value ? "重新上传" : "上传证书"}
										</a>
									) : value
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
		let dialog = store.getState().dialog.component;
		store.dispatch({
			type : "table",
			component : this
		});
		this.getCategoryName = code => {
			return this.state.category[code];
		};
		this.getTrOption = data => {
			let trOption = {},
				option = this.state.title;
			trOption.uploadPath = {
				index : 3,
				value : ""
			};
			for(let i in data){
				if(option[i]){
					trOption[i] = {
						index : Object.keys(option).indexOf(i),
						value : data[i]
					};
				}
			}
			return trOption;
		};
		this.getData = () => {
			$.ajax({
				url : "/api/manage/project/manufacturer",
				timeout : 2000
			}).done(data => {
				afterSign(data, data => {
					let myManufacturer = data.data;
					this.setState({
						option : myManufacturer
					});
				}, dialog);
			}).fail(xhr => {
				xhrTimeout("我的合作厂家列表", dialog);
			});
		};
	}
	componentDidMount(){
		this.getData();
	}
	componentWillReceiveProps(nextProps){
		this.setState(nextProps);
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
		option.map((list, index) => {
			lists.push(
				<Tr id={list.id} option={this.getTrOption(list)} key={index} userClass={this} />
			);
		});
		return (
			<table>
				<thead>
					<tr>
						{thead}
					</tr>
				</thead>
				<tbody>
					{lists}
				</tbody>
			</table>
		);
	}
}
Table.defaultProps = {
	title : {
		categoryCode : "品类",
		supplierName : "合作厂家",
		status : "状态",
		uploadPath : "合作证明"
	},
	option : []
};
class Content extends Component{
	constructor(){
		super();
		this.state = {};
	}
	componentDidMount(){
		let dialog = store.getState().dialog.component;
		$.ajax({
			url : "/api/user/supplier/category",
			timeout : 2000
		}).done(data => {
			let category = [];
			afterSign(data, data => {
				data.data.map(list => {
					category[list.value] = list.label;
				});
				this.setState({
					category
				});
			}, dialog);
		}).fail(xhr => {
			xhrTimeout("合作厂家所属品类", dialog);
		});
	}
	render(){
		let category = this.state.category;
		return (
			<div className="content">
				<h1>我的合作厂家</h1>
				<Table category={category} />
				<Add category={category} />
			</div>
		);
	}
}
class Main extends Component{
	render(){
		return (
			<div className="mainArea">
				<div className="w1000">
					<Menu index={5} />
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