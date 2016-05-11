import React, {Component} from "react";
import {createStore} from "redux";
import {parse} from "cookie";
import {afterSign, xhrTimeout} from "./util";
import Header from "../component/header";
import Footer from "../component/footer";
import SignIn from "../component/signin";
import InputRow from "../component/input";
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
class Item extends Component{
	constructor(props){
		super(props);
		this.state = props;
	}
	componentWillReceiveProps(nextProps){
		this.setState(nextProps);
	}
	render(){
		let state = this.state,
			option = state.option,
			index = state.index;
		return (
			<a className={`item ${state.status}`} href={option.href} title={option.name} style={
				{
					backgroundImage : `url(${option.imgUrl})`
				}
			}></a>
		);
	}
}
class Form extends Component{
	constructor(props){
		super(props);
		this.state = props;
		let dialog = store.getState().dialog.component,
			header = store.getState().header.component;
		this.getIptVal = name => {
			return this.refs[name].refs.ipt.value;
		};
		this.handleSubmit = () => {
			$.ajax({
				type : "post",
				url : "/api/user/signin",
				timeout : 2000,
				data : {
					phone : this.getIptVal("phone"),
					password : this.getIptVal("password")
				},
			}).done(data => {
				afterSign(data, data => {
					header.setState({
						signType : data.data.isMember ? 2 : 1
					}, () => {
						if(data.data.isMember){
							location.href = parse(location.search.substr(1)).referer || "/manage/corporation";
						}else{
							location.href = "/user/join";
						}
					});
				}, dialog);
			}).fail(xhr => {
				xhrTimeout("登录结果", dialog);
			});
		};
	}
	render(){
		let lists = [],
			option = this.state.option,
			topNav = store.getState().topNav.component;
		option.map((list, index) => {
			lists.push(
				<InputRow option={list} ref={list.id} key={index} form={this} />
			);
		});
		return (
			<from className="signIn">
				{lists}
				<a className="singleBtn" onClick={this.handleSubmit}>登录</a>
				{/*<a className="anchorSignUp" onClick={topNav.signUp}>免费注册</a>
				<a className="anchorReset" href="/user/findPwd">忘记密码</a>*/}
			</from>
		);
	}
}
Form.defaultProps = {
	option : [
		{
			id : "phone",
			className : "ipt-txt",
			label : "手机号",
			maxlength : 11
		},
		{
			type : "password",
			id : "password",
			className : "ipt-txt",
			label : "密码"
		}
	]
};
class Banner extends Component{
	constructor(props){
		super(props);
		this.state = props;
		let header = store.getState().header.component,
			currentIndex,
			sum;
		this.slide = () => {
			currentIndex = this.state.currentIndex;
			sum = this.state.option.length;
			this.setState({
				currentIndex : currentIndex + 1 >= sum ? 0 : currentIndex + 1
			});
		};
		this.autoSlide = () => {
			setInterval(() => {
				this.slide();
			}, 4000);
		};
		this.subscribeHeader = () => {
			let subscriber = header.state.subscriber || [];
			subscriber.push(this);
			header.setState({
				subscriber
			});
		};
		this.getAuth = () => {
			return header.state.signType;
		};
	}
	componentDidMount(){
		this.autoSlide();
		this.subscribeHeader();
	}
	render(){
		let lists = [],
			state = this.state,
			option = state.option,
			currentIndex = state.currentIndex;
		option.map((list, index) => {
			lists.push(
				<Item option={list} status={index === currentIndex ? "current" : "normal"} key={index} />	
			);
		});
		return (
			<div className="banner">
				{lists}
				<div className="w1000">
					{
						this.getAuth() ? [] : <Form />
					}
				</div>
			</div>
		);
	}
}
Banner.defaultProps = {
	currentIndex : 0,
	option : [
		{
			name : "2015.2.6 网筑集团成立 红杉易居投资",
			imgUrl : "/image/banner/1.png"
		},
		{
			name : "仟金宝来啦",
			imgUrl : "/image/banner/2.png"
		},
		{
			name : "仟金顶携手东芝空调",
			imgUrl : "/image/banner/3.png"
		}
	]
};
class Static extends Component{
	render(){
		return (
			<div className="static">
				<div className="bg"></div>
				<div className="w1000"></div>
			</div>
		);
	}
}
class Media extends Component{
	render(){
		return (
			<div className="media">
				<div className="w1000">
					<h1>媒体报道</h1>
				</div>
			</div>
		);
	}
}
class Partner extends Component{
	constructor(props){
		super(props);
		this.state = props;
	}
	render(){
		let lists = [],
			option = this.props.option;
		option.map((list, index) => {
			lists.push(
				<a title={list.name} href={list.href} key={index}></a>
			);
		});
		return (
			<div className="partner">
				<div className="w1000">
					<h1>
						{this.state.title}
					</h1>
					<div className="container">
						{lists}
					</div>
				</div>
			</div>
		);
	}
}
Partner.defaultProps = {
	title : "合作伙伴",
	option : [
		{
			name : "红杉资本"
		},
		{
			name : "华夏银行"
		},
		{
			name : "中国工商银行"
		},
		{
			name : "兴业银行"
		},
		{
			name : "中信银行"
		},
		{
			name : "易居"
		},
		{
			name : "海尔金融"
		},
		{
			name : "e签宝"
		}
	]
};
class Manufacturer extends Component{
	constructor(props){
		super(props);
		this.state = props;
	}
	render(){
		let lists = [],
			option = this.props.option;
		option.map((list, index) => {
			lists.push(
				<a title={list.name} href={list.href} key={index}></a>
			);
		});
		return (
			<div className="manufacturer">
				<div className="w1000">
					<h1>
						{this.state.title}
					</h1>
					<div className="container">
						{lists}
					</div>
				</div>
			</div>
		);
	}
}
Manufacturer.defaultProps = {
	title : "合作厂家",
	option : [
		{
			name : "汉普森电梯"
		},
		{
			name : "杭州西奥电梯有限公司"
		},
		{
			name : "华德涂料"
		},
		{
			name : "宇画石"
		},
		{
			name : "美的中央空调"
		},
		{
			name : "亚士漆"
		},
		{
			name : "TOSHIBA Carrier"
		},
		{
			name : "富奥电梯"
		},
		{
			name : "盾安中央空调"
		},
		{
			name : "盼盼防盗窗"
		},
		{
			name : "上海龙珀新型建材有限公司"
		},
		{
			name : "速捷"
		}
	]
};
class Page extends Component{
	render(){
		return (
			<div className="page">
				<Dialog store={store} />
				<Header store={store} />
				<Banner />
				<Static />
				<Media />
				<Partner />
				<Manufacturer />
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