import uploadFile from "../upload";
import {requestJavaServer} from "./util";
import user from "./user";
import manage from "./manage";
import stream from "./stream";
import message from "./message";
const 
	Enum = {
		user,
		manage,
		stream,
		message
	},
	Route = user.concat(manage).concat(stream).concat(message),
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