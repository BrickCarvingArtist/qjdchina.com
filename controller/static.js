import {Page as home} from "../dev_resource/pack/home";
import {Page as join} from "../dev_resource/pack/join";
import {Page as corporation} from "../dev_resource/pack/corporation";
import {Page as project} from "../dev_resource/pack/project";
import {Page as bill} from "../dev_resource/pack/bill";
import {Page as contract} from "../dev_resource/pack/contract";
import {Page as messageEntrance} from "../dev_resource/pack/messageentrance";
import {Page as manufacturer} from "../dev_resource/pack/manufacturer";
const Corp = "-仟金顶网络科技有限公司",
	ViewModel = "./index",
	Enum = [
		{
			route : "/",
			signType : [0, 1, 2],
			callback(react, reactDOMServer, req, res){
				res.render(ViewModel , {
					style : [
						"/css/home.css"
					],
					script : [
						"/js/home.js"
					],
					title : `首页${Corp}`,
					page : reactDOMServer.renderToString(react.createFactory(home)({}))
				});
			}
		},
		{
			route : "/user/join",
			signType : [1],
			callback(react, reactDOMServer, req, res){
				res.render(ViewModel , {
					style : [
						"/css/join.css"
					],
					script : [
						"/js/join.js"
					],
					title : `申请会员${Corp}`,
					page : reactDOMServer.renderToString(react.createFactory(join)({}))
				});
			}
		},
		{
			route : "/manage/corporation",
			signType : [2],
			callback(react, reactDOMServer, req, res){
				res.render(ViewModel, {
					style : [
						"/css/corporation.css"
					],
					script : [
						"/lib/jquery.form@3.51.0.min.js",
						"/js/corporation.js"
					],
					title : `企业信息${Corp}`,
					page : reactDOMServer.renderToString(react.createFactory(corporation)({}))
				});
			}
		},
		{
			route : "/manage/project",
			signType : [2],
			callback(react, reactDOMServer, req, res){
				res.render(ViewModel, {
					style : [
						"/css/project.css"
					],
					script : [
						"/lib/jquery.form@3.51.0.min.js",
						"/js/project.js"
					],
					title : `我的项目${Corp}`,
					page : reactDOMServer.renderToString(react.createFactory(project)({}))
				});
			}
		},
		{
			route : "/manage/bill",
			signType : [2],
			callback(react, reactDOMServer, req, res){
				res.render(ViewModel, {
					style : [
						"/css/bill.css"
					],
					script : [
						"/lib/jquery.form@3.51.0.min.js",
						"/js/bill.js"
					],
					title : `我的订单${Corp}`,
					page : reactDOMServer.renderToString(react.createFactory(bill)({}))
				});
			}
		},
		{
			route : "/manage/contract",
			signType : [2],
			callback(react, reactDOMServer, req, res){
				res.render(ViewModel, {
					style : [
						"/css/contract.css"
					],
					script : [
						"/js/contract.js"
					],
					title : `我的合同${Corp}`,
					page : reactDOMServer.renderToString(react.createFactory(contract)({}))
				});
			}
		},
		{
			route : "/message/entrance",
			signType : [2],
			callback(react, reactDOMServer, req, res){
				res.render(ViewModel, {
					style : [
						"/css/messageentrance.css"
					],
					script : [
						"/js/messageentrance.js"
					],
					title : `合同签约-短信验证${Corp}`,
					page : reactDOMServer.renderToString(react.createFactory(messageEntrance)({}))
				});
			}
		},
		{
			route : "/manage/manufacturer",
			signType : [2],
			callback(react, reactDOMServer, req, res){
				res.render(ViewModel, {
					style : [
						"/css/manufacturer.css"
					],
					script : [
						"/lib/jquery.form@3.51.0.min.js",
						"/js/manufacturer.js"
					],
					title : `合作厂家${Corp}`,
					page : reactDOMServer.renderToString(react.createFactory(manufacturer)({}))
				});
			}
		}
	],
	Router = (router, react, reactDOMServer) => {
		Enum.map(list => {
			router.route(list.route).get((req, res) => {
				list.callback(react, reactDOMServer, req, res);
			});
		});
		return router;
	};
let Route = [];
Enum.map(list => {
	Route.push({
		route : list.route,
		signType : list.signType
	});
});
export {
	Route,
	Router 
};