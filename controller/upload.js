import formidable from "formidable";
import {UploadConfig} from "../config/config";
const upload = (req, res, callback) => {
	let form = new formidable.IncomingForm(),
		_end = 0;
	form.parse(req, (err, fields, files) => {
		req.body.id = fields.id;
		if(files.upload.size >= 10 * 1024 * 1024){
			_end = 1;
			return res.json({
				code : 100006016,
				message : "附件超出限定大小",
				data : null
			});
		} 
		let s = files.upload.name.split(/\./),
			type = s[s.length - 1],
			types = ["jpg", "jpeg", "gif", "bmp", "png", "pdf"];
		if(types.indexOf(s[s.length - 1].toLowerCase()) < 0){
			_end = 1;
			return res.json({
				code : 100006015,
				message : `上传资料格式不正确,支持的文件格式为:${types.join()}`,
				data : null
			});
		}
		req.body.authFile = files.upload.path;
	});
	form.on("error", e => {
		console.log(e);
	});
	form.encoding = "utf-8";
	form.maxFieldsSize = 5 * 1024 * 1024;
	form.uploadDir = UploadConfig.path;
	form.keepExtensions = 1;
	form.on("progress", (bytesReceived, bytesExpected) => {});
	form.on("end", (a, b, c) => {
		if(_end){
			return;
		}
		callback(req, res);
	});
    return;
}; 
export default (req, res) => {
	upload(req, res, (req, res) => {
		res.json({
			code : 0,
			message : "上传成功",
			data : {
				authFile : req.body.authFile
			}
		});
	});
};