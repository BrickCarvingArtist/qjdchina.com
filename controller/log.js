import {appendFile} from "fs";
import {LogConfig} from "../config/config";
export default router => {
	router.all("*", (req, res, next) => {
		const Log = new Promise((resolve, reject) => {
			let fileName = `${LogConfig.path}/${new Date().toLocaleDateString().replace(/\//g, "-")}.txt`,
				fileContent = `\t---------start---------\npath:${req.path}\nreferer:${req.referer || ""}\nuser-agent:${req.headers["user-agent"]}\n\t----------end----------\n`;
			appendFile(fileName, fileContent, "utf8", err => {
				if(err){
					reject(err);
				}else{
					resolve();
				}
			})
		});
		Log.then(() => {
			next();
		}, err => {
			console.log(err);
		});
	});
	return router;
};