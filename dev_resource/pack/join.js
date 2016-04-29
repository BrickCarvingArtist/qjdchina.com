import React, {Component} from "react";
import {createStore} from "redux";
import {parse} from "querystring";
import {afterSign, xhrTimeout} from "./util";
import InputRow from "../component/input";
import SelectGroup from "../component/select_group";
import Header from "../component/header";
import Footer from "../component/footer";
import Dialog from "../component/dialog";
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
//表单
class Form extends Component{
	constructor(props){
		super(props);
		this.state = {};
		let dialog = store.getState().dialog.component;
		//获取用户输入的值
		//输入框
		const getIptVal = (iptName) => {
				return this.refs[iptName].refs.ipt.value;
			},
			//地址下拉框
			getAddress = (arrAddress, type) => {
				return arrAddress[type];
			},
			//合作厂家下拉框
			getManufacturer = ([...arrManufacturer]) => {
				let manufacturer = {
					categoryCode : arrManufacturer[0],
					supplierId : arrManufacturer[1]
				};
				return manufacturer;
			};
		this.handleStreet = () => {
			return 0;
		};
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
		let mobile,
			contactName,
			cats = [],
			regCode,
			address,
			areaCode,
			cityCode,
			provinceCode,
			corpName,
			manufacturer;
		//提交表单
		this.handleSubmit = () => {
			let arrAddress = this.state.arrAddress,
				arrManufacturer = this.refs.manufacturer.state.selectIndex;
			corpName = getIptVal("corp");
			regCode = getIptVal("ic");
			contactName = getIptVal("contact");
			mobile = getIptVal("mobile");
			provinceCode = getAddress(arrAddress, 0);
			cityCode = getAddress(arrAddress, 1);
			areaCode = getAddress(arrAddress, 2);
			address = this.refs.street.value;
			manufacturer = getManufacturer(arrManufacturer);
			$.ajax({
				type : "post",
				url : "/api/user/join",
				data : {
					mobile,
					contactName,
					cats : JSON.stringify([manufacturer]),
					regCode,
					address,
					areaCode,
					cityCode,
					provinceCode,
					corpName
				}
			}).done(data => {
				afterSign(data, data => {
					location.href = "/manage/corporation";
				}, dialog);
			}).fail(xhr => {
				xhrTimeout("申请会员", dialog);
			});
		};
	}
	componentDidMount(){
		let dialog = store.getState().dialog.component,
			sup = [],
			sub = [],
			query = parse(location.search.substr(1)),
			option = {};
		Object.keys(query).length === 5 && this.setState({
			info : query,
			corp : query.companyName,
			street : query.address
		});
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
		//查询品类
		$.ajax({
			url : "/api/user/supplier/category",
			timeout : 10000
		}).done(data => {
			afterSign(data, data => {
				data.data.map((list, index) => {
					sup[list.value] = list.label;
					sub[list.value] = [];
				});
				//后才能查询合作厂家列表
				$.ajax({
					url : "/api/user/supplier/list"
				}).done(data => {
					afterSign(data, data => {
						//拼装合作厂家
						data.data.map((list, index) => {
							sub[list.categoryCode][list.id] = list.name;
						});
						this.setState({
							manufacturers : [sup, sub]
						});
					}, dialog);
				}).fail(xhr => {
					xhrTimeout("合作厂家列表", dialog);
				});
			}, dialog);
		}).fail(xhr => {
			xhrTimeout("合作厂家所属品类", dialog);
		});
	}
	render(){
		let lists = [],
			state = this.state,
			option = this.props.option,
			areaConfig = state.areaConfig || [],
			manufacturers = state.manufacturers,
			info = state.info;
		option.map((list, index) => {
			if(list.type){
				lists.push(
					<InputRow option={list} key={index} ref={list.id} value={state[list.id]} />
				);
			}else{
				list.id === "address" && lists.push(
					<div className="row" key={index}>
						<label htmlFor={list.id}>
							{list.label}
						</label>
						<SelectGroup id={list.id} default={info} option={
							info && areaConfig.length ? this.getArea(info.provinceCode, info.cityCode, info.areaCode) : areaConfig
						} checkType="region" ref={list.id} callback={
							(completeStatus, selectIndex) => {
								this.setState({
									showAddress : completeStatus,
									arrAddress : selectIndex
								});
							}
						} />
						{
							state.showAddress ? <input className={`ipt-txt single${state.street ? " disabled" : ""}`} placeholder={`请输入${list.label}`} ref="street" value={state.street} onChange={this.handleStreet} /> : []
						}
					</div>
				);
				list.id === "manufacturer" && manufacturers && lists.push(
					<div className="row" key={index}>
						<label htmlFor={list.id}>
							{list.label}
						</label>
						<SelectGroup id={list.id} option={manufacturers} ref={list.id} checkType="manufacturer" callback={
							(completeStatus, selectIndex) => {
								this.setState({
									completeStatus,
									selectIndex
								});
							}
						} />
					</div>
				);
			}
		});
		return (
			<form>
				<div className="w1000">
					<h1>立刻申请仟金顶会员，尊享仟金顶优质服务</h1>
					{lists}
					<input className="singleBtn" type="button" value="提交申请" onClick={this.handleSubmit} />
				</div>
			</form>
		);
	}
}
//表单项目配置
Form.defaultProps = {
	option : [
		{
			type : 1,
			id : "corp",
			className : "ipt-txt",
			label : "公司名称"
		},
		{
			type : 0,
			id : "address",
			label : "联系地址"
		},
		{
			type : 1,
			id : "ic",
			className : "ipt-txt",
			label : "工商注册号",
			maxlength : 15
		},
		{
			type : 0,
			id : "manufacturer",
			label : "合作厂家"
		},
		{
			type : 1,
			id : "contact",
			className : "ipt-txt",
			label : "联系人"
		},
		{
			type : 1,
			id : "mobile",
			className : "ipt-txt",
			label : "手机号",
			maxlength : 11
		}
	]
};
class Page extends Component{
	constructor(){
		super();
		this.state = {};
	}
	render(){
		let state = this.state;
		return (
			<div className="page">
				<Dialog store={store} />
				<Header store={store} />
				<Form />
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