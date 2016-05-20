import {BaseUrl, pureTransmit} from "./util";
export default [
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
	},
	{
		from : "manufacturer",
		to : `${BaseUrl}cif/front/partner/browse`,
		method : "get",
		signType : [2]
	}
];