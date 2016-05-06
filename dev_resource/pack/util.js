import React, {createFactory} from "react";
import {parse} from "querystring";
import SignIn from "../component/signin";
const afterSign = (data, callback, dialog, path) => {
	if(!(data.code - 0)){
		callback(data);
	}else{
		path = path || parse(location.search.substr(1)).referer;
		if(dialog){
			if(data.code - 0 === 100000004){
				dialog.setState({
					option : {
						title : {
							iconClassName : "info",
							name : "用户登录",
							btnClose : path ? () => {
								window.location.href = "/";
							} : 1
						},
						content : createFactory(SignIn)({
							dialog : dialog,
							referer : path
						}),
						message : 0
					},
					isShow : 1
				});
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
		}
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