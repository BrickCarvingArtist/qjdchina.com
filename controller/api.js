import {parse} from "cookie";
import {stringify} from "querystring";
import {HostConfig} from "../config/config";
import uploadFile from "./upload";
const BaseUrl = `http://${HostConfig.host}:${HostConfig.port}/`,
	getRequestOption = (specificOption, req) => {
		let query = req.query,
			option = {
				url : `${specificOption.to}?${Object.keys(query).length ? stringify(query) : ""}`,
				headers : req.headers,
				form : req.body
			};
		return option;
	},
	requestJavaServer = (specificOption, request, req, res, reqType) => {
		req.headers.host = HostConfig.hostName;
		let option = getRequestOption(specificOption, req);
		if(reqType === "stream"){
			request[specificOption.method](option).pipe(res);
		}else{
			request[specificOption.method](option, (err, response, body) => {
				specificOption.callback(err, response, body, req, res);
			});
		}
	},
	pureTransmit = (err, response, body, req, res) => {
		if(err){
			console.log(err);
		}else{
			response.statusCode === 200 && res.send(JSON.parse(body));
		}
	},
	Enum = {
		User : [
			{
				from : "signup",
				to : `${BaseUrl}cif/front/user/register`,
				method : "post",
				signType : [0],
				callback : pureTransmit
			},
			{
				from : "signin",
				to : `${BaseUrl}cif/front/user/login`,
				method : "post",
				signType : [0],
				callback(err, response, body, req, res){
					if(err){
						console.log(err);
					}else{
						if(response.statusCode === 200){
							let phone = req.body.phone,
								responseCookie = response.headers["set-cookie"];
							if(responseCookie){
								responseCookie.map((list, index) => {
									let oCookie = parse(list),
										cookieName = Object.keys(oCookie)[0];
									res.cookie(cookieName, oCookie[cookieName], {
										path : "/"
									});
								});
								res.cookie("username", phone, {
									path : "/"
								});
								res.cookie("corpname", phone, {
									path : "/"
								});
							}
							res.json(JSON.parse(body));
						}
					}
				}
			},
			{
				from : "signout",
				to : "",
				method : "get",
				signType : [1, 2],
				callback(req, res){
					res.clearCookie("sso_cookie").clearCookie("JSESSIONID").json({
						code : 403,
						message : "期待下次您的下次登录"
					});
				}
			},
			{
				from : "reset",
				to : "",
				method : "get",
				signType : [1, 2],
				callback(err, response, body, req, res){

				}
			},
			{
				from : "supplier/category",
				to : `${BaseUrl}cif/front/member/category`,
				method : "get",
				signType : [1, 2],
				callback : pureTransmit
			},
			{
				from : "supplier/list",
				to : `${BaseUrl}cif/front/supplier/list`,
				method : "get",
				signType : [1, 2],
				callback : pureTransmit
			},
			{
				from : "join",
				to : `${BaseUrl}cif/front/member/apply`,
				method : "post",
				signType : [1],
				callback : pureTransmit
			},
		],
		Manage : [
			{
				from : "corporation/info",
				to : `${BaseUrl}cif/front/member/info`,
				method : "get",
				signType : [1, 2],
				callback : pureTransmit
			},
			{
				from : "getcredit",
				to : `${BaseUrl}cif/front/member/credit`,
				method : "get",
				signType : [2],
				callback : pureTransmit
			},
			{
				from : "auth/status",
				to : `${BaseUrl}cif/front/member/status`,
				method : "get",
				signType : [2],
				callback : pureTransmit
			},
			{
				from : "authfile/list",
				to : `${BaseUrl}cif/front/authfile/authfileList`,
				method : "get",
				signType : [2],
				callback : pureTransmit
			},
			{
				from : "authfile/upload",
				to : "",
				method : "post",
				signType : [2],
				callback : pureTransmit
			},
			{
				from : "authfile/reassure",
				to : `${BaseUrl}cif/front/authfile/saveUpload`,
				method : "post",
				signType : [2],
				callback : pureTransmit
			},
			{
				from : "authfile/delete",
				to : `${BaseUrl}cif/front/authfile/delete`,
				method : "get",
				signType : [2],
				callback : pureTransmit
			},
			{
				from : "authfile/submit",
				to : `${BaseUrl}cif/front/authfile/commit`,
				method : "get",
				signType : [2],
				callback : pureTransmit
			},
			{
				from : "project/list",
				to : `${BaseUrl}clms/front/project/list`,
				method : "get",
				signType : [2],
				callback : pureTransmit
			},
			{
				from : "project/detail",
				to : `${BaseUrl}clms/front/project/detail`,
				method : "get",
				signType : [2],
				callback : pureTransmit
			},
			{
				from : "project/manufacturer",
				to : `${BaseUrl}cif/front/partner/list`,
				method : "get",
				signType : [2],
				callback : pureTransmit
			},
			{
				from : "projectfile/upload",
				to : "",
				method : "post",
				signType : [2],
				callback : pureTransmit
			},
			{
				from : "project/apply",
				to : `${BaseUrl}clms/front/project/apply`,
				method : "post",
				signType : [2],
				callback : pureTransmit
			},
			{
				from : "bill/list",
				to : `${BaseUrl}clms/front/order/list`,
				method : "get",
				signType : [2],
				callback : pureTransmit
			},
			{
				from : "bill/detail",
				to : `${BaseUrl}clms/front/order/detail`,
				method : "get",
				signType : [2],
				callback : pureTransmit
			},
			{
				from : "bill/status",
				to : `${BaseUrl}clms/front/order/status`,
				method : "get",
				signType : [2],
				callback : pureTransmit
			},
			{
				from : "billfile/upload",
				to : `${BaseUrl}clms/front/orderfile/updOrderFile`,
				method : "post",
				signType : [2],
				callback : pureTransmit
			},
			{
				from : "billfile/reassure",
				to : `${BaseUrl}clms/front/orderfile/saveUpload`,
				method : "post",
				signType : [2],
				callback : pureTransmit
			},
			{
				from : "bill/apply",
				to : `${BaseUrl}clms/front/order/apply`,
				method : "post",
				signType : [2],
				callback : pureTransmit
			},
			{
				from : "bill/plan",
				to : `${BaseUrl}clms/front/repaymentplan/info`,
				method : "get",
				signType : [2],
				callback : pureTransmit
			},
			{
				from : "product/list",
				to : `${BaseUrl}clms/front/product/listBySupplier`,
				method : "get",
				signType : [2],
				callback : pureTransmit
			},
			{
				from : "contract/list",
				to : `${BaseUrl}clms/front/contract/list`,
				method : "get",
				signType : [2],
				callback : pureTransmit
			},
			{
				from : "contract/condition",
				to : `${BaseUrl}clms/front/contract/initList`,
				method : "get",
				signType : [2],
				callback : pureTransmit
			},
			{
				from : "contract/detail",
				to : `${BaseUrl}clms/front/contract/detail`,
				method : "get",
				signType : [2],
				callback : pureTransmit
			},
			{
				from : "contract/accept",
				to : `${BaseUrl}clms/front/contract/accept`,
				method : "get",
				signType : [2],
				callback : pureTransmit
			},
			{
				from : "contract/giveup",
				to : `${BaseUrl}clms/front/contract/refuse`,
				method : "post",
				signType : [2],
				callback : pureTransmit
			},
			{
				from : "manufacturer/add",
				to : `${BaseUrl}cif/front/partner/add`,
				method : "post",
				signType : [2],
				callback : pureTransmit
			},
			{
				from : "manufacturerfile/upload",
				to : `${BaseUrl}clms/front/supplier/updSupplierFile`,
				method : "post",
				signType : [2],
				callback : pureTransmit
			},
			{
				from : "manufacturerfile/reassure",
				to : `${BaseUrl}cif/front/partner/updAuthFile`,
				method : "post",
				signType : [2],
				callback : pureTransmit
			}
		],
		Stream : [
			{
				from : "captcha",
				to : `${BaseUrl}cif/front/verify/getImgCode`,
				method : "get",
				signType : [0, 2]
			},
			{
				from : "authfile",
				to : `${BaseUrl}cif/front/authfile/browse`,
				method : "get",
				signType : [2]
			},
			{
				from : "contract",
				to : `${BaseUrl}clms/front/contract/loadFile`,
				method : "get",
				signType : [2]
			}
		],
		Message : [
			{
				from : "captcha",
				to : `${BaseUrl}cif/front/user/fetchSmsCode`,
				method : "get",
				signType : [0, 1, 2],
				callback : pureTransmit
			}
		]
	},
	Router = (router, request) => {
		let reqType;
		for(let i in Enum){
			reqType = `/api/${i.toLowerCase()}/`;
			Enum[i].map(list => {
				router.route(`${reqType}${list.from}`).all((req, res) => {
					~[`${reqType}authfile/upload`, `${reqType}projectfile/upload`, `${reqType}billfile/upload`, `${reqType}manufacturerfile/upload`].indexOf(req.path) && uploadFile(req, res);
					if(list.to){
						requestJavaServer(list, request, req, res, i.toLowerCase());
					}else{
						list.callback(req, res);
					}
				});
			});
		}
		return router;
	};
let Route = [];
for(let i in Enum){
	Enum[i].map(list => {
		Route.push({
			route : `/api/${i.toLowerCase()}/${list.from}`,
			method : list.method,
			signType : list.signType
		});
	});
}
export {
	Route,
	Router
};