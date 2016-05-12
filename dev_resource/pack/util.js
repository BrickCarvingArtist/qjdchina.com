import React, {createFactory} from "react";
const afterSign = (data, callback, dialog, code) => {
	if(!(data.code - 0) || code && data.code !== code){
		callback(data);
	}else{
		dialog.setState({
			option : {
				title : {
					iconClassName : "info",
					name : "温馨提示",
					btnClose : 1
				},
				message : data.message
			},
			isShow : 1,
			autoClose : 2
		});
	}
};
const xhrTimeout = (type, dialog) => {
	dialog.setState({
		option : {
			title : {
				iconClassName : "warning",
				name : "响应超时",
				btnClose : 1
			},
			content : 0,
			message : `获取${type}响应超时，请尝试刷新页面或者重新点击获取数据`
		},
		isShow : 1
	});
};
export {
	afterSign,
	xhrTimeout
};