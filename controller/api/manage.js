import {BaseUrl, pureTransmit} from "./util";
export default [
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
		from : "project/condition",
		to : `${BaseUrl}/clms/front/project/projectStatus`,
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
		from : "bill/condition",
		to : `${BaseUrl}clms/front/order/orderStatus`,
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
		from : "loan/list",
		to : `${BaseUrl}clms/front/loansBill/list`,
		method : "get",
		signType : [2],
		callback : pureTransmit
	},
	{
		from : "loan/condition",
		to : `${BaseUrl}clms/front/loansBill/loansBillStatus`,
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
		to : `${BaseUrl}clms/front/contract/sign`,
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
		from : "manufacturerfile/reassure",
		to : `${BaseUrl}cif/front/partner/updAuthFile`,
		method : "post",
		signType : [2],
		callback : pureTransmit
	}
];