import {parse} from "cookie";
import {BaseUrl, pureTransmit} from "./util";
export default [
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
						responseCookie.map(list => {
							let oCookie = parse(list),
								cookieName = Object.keys(oCookie)[0];
							res.cookie(cookieName, oCookie[cookieName], {
								path : "/"
							});
						});
						res.cookie("username", phone, {
							path : "/"
						}).cookie("corpname", phone, {
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
			res.clearCookie("sso_cookie").clearCookie("JSESSIONID").clearCookie("username").clearCookie("corpname").clearCookie("signtype").json({
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
];