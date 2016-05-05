import {requestJavaServer} from "./util";
import user from "./user";
import manage from "./manage";
import stream from "./stream";
import upload from "./upload";
import message from "./message";
const 
	Enum = {
		user,
		manage,
		stream,
		upload,
		message
	},
	Route = user.concat(manage).concat(stream).concat(message),
	Router = (router, request) => {
		let reqType;
		for(let i in Enum){
			reqType = `/api/${i.toLowerCase()}/`;
			Enum[i].map(list => {
				router.route(`${reqType}${list.from}`)[list.method]((req, res) => {
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