import {BaseUrl, pureTransmit} from "./util";
export default [
	{
		from : "captcha",
		to : `${BaseUrl}cif/front/user/fetchSmsCode`,
		method : "get",
		signType : [0, 1, 2],
		callback : pureTransmit
	},
	{
		from : "contractcaptcha",
		to : `${BaseUrl}clms/front/contract/sendSMSCode`,
		method : "get",
		signType : [2],
		callback : pureTransmit
	}
];