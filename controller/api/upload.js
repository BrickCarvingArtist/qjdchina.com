import uploadFile from "../upload";
export default [
	{
		from : "auth",
		method : "post",
		signType : [2],
		callback : uploadFile
	},
	{
		from : "project",
		method : "post",
		signType : [2],
		callback : uploadFile
	},
	{
		from : "post",
		method : "post",
		signType : [2],
		callback : uploadFile
	},
	{
		from : "manufacturer",
		method : "post",
		signType : [2],
		callback : uploadFile
	}
];