import {stringify} from "querystring";
import {HostConfig} from "../../config/config";
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
	};
export {
	BaseUrl,
	requestJavaServer,
	pureTransmit
};