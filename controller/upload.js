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
				code : 1,
				message : "附件超出限定大小"
			});
		} 
		let s = files.upload.name.split(/\./),
			type = s[s.length - 1],
			types = ["jpg", "jpeg", "gif", "bmp", "png", "pdf"];
		if(types.indexOf(s[s.length - 1].toLowerCase()) < 0){
			_end = 1;
			return res.json({
				code : 1,
				message : `上传资料格式不正确,支持的文件格式为:${types.join()}`
			});
		}
		req.body.authFile = files.upload.path;
	});
	form.on("error", e => {
		return res.json({
			code : 1,
			message : "文件上传过程出错,请尝试重新上传"
		});
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