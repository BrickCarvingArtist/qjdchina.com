export default (label, value, option) => {
	const Validate = {
		noEmpties : {
			code : value.length ? 1 : 0,
			message : `您的${label}不能为空`
		},
		noBlank : {
			code : ~value.search(/\s/g) ? 0 : 1,
			message : `您的${label}不能包含空格`
		},
		noScript : {
			code : ~value.search(/<script.*>|%3Csciprt.*%3E|&lt;script.*&gt;/ig) ? 0 : 1,
			message : `请勿输入可疑代码`
		},
		validate(){
			for(let i of option){
				if(!Validate[i].code){
					return this.fail(Validate[i].message);
				}
			}
		},
		fail(message){
			return message;
		}
	};
	return Validate.validate();
}