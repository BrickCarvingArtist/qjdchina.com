webpackJsonp([11],{0:function(e,t,n){"use strict";var a=n(306),r=n(154);(0,a.init)(r.render)},177:function(e,t,n){"use strict";function a(e){return e&&e.__esModule?e:{"default":e}}function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function o(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function l(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var u=function(){function e(e,t){for(var n=0;n<t.length;n++){var a=t[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}return function(t,n,a){return n&&e(t.prototype,n),a&&e(t,a),t}}(),i=n(2),c=a(i),s=function(e){function t(e){return r(this,t),o(this,Object.getPrototypeOf(t).call(this,e))}return l(t,e),u(t,[{key:"render",value:function(){var e=this.props;return c["default"].createElement("a",{className:"case "+e.className+(this.props.userClass.props.index===this.props.index?" current":" normal"),href:e.href},c["default"].createElement("i",null),c["default"].createElement("span",null,e.name))}}]),t}(i.Component),f=function(e){function t(e){return r(this,t),o(this,Object.getPrototypeOf(t).call(this,e))}return l(t,e),u(t,[{key:"render",value:function(){var e=this,t=[],n=this.props.option;return n.map(function(n,a){t.push(c["default"].createElement(s,{name:n.name,className:n.className,href:n.href,index:a,key:a,userClass:e}))}),c["default"].createElement("div",{className:"menu"},t)}}]),t}(i.Component);t["default"]=f,f.defaultProps={option:[{name:"企业信息",className:"corporation",href:"/manage/corporation"},{name:"我的项目",className:"project",href:"/manage/project"},{name:"我的订单",className:"bill",href:"/manage/bill"},{name:"我的放款",className:"loan",href:"/manage/loan"},{name:"我的合同",className:"contract",href:"/manage/contract"},{name:"合作厂家",className:"manufacturer",href:"/manage/manufacturer"}]}},178:function(e,t,n){"use strict";function a(e){return e&&e.__esModule?e:{"default":e}}function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function o(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function l(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var u=function(){function e(e,t){for(var n=0;n<t.length;n++){var a=t[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}return function(t,n,a){return n&&e(t.prototype,n),a&&e(t,a),t}}(),i=n(2),c=a(i),s=function(e){function t(e){r(this,t);var n=o(this,Object.getPrototypeOf(t).call(this,e));return n.state=e,n.handleChange=function(e){var t=n.state,a=t.index,r=t.userClass,o=(r.state.selectIndex||[]).filter(function(e,t){return a>t});o[a]=e.target.value,r.setState({selectIndex:o},function(){var e=r.getCompleteStatus();e?r.state.callback(e,r.getSelectIndex()):r.state.callback(e)})},n}return l(t,e),u(t,[{key:"componentDidMount",value:function(){var e=this.state;e.userClass.state["default"]&&this.handleChange({target:{value:Object.keys(e.option)[0]}})}},{key:"componentWillReceiveProps",value:function(e){this.setState(e)}},{key:"render",value:function(){var e=[],t=this.state,n=t.option,a=t.userClass;for(var r in n)e.push(c["default"].createElement("option",{value:r,key:r},n[r]));return a.state["default"]||e.splice(0,0,c["default"].createElement("option",{value:0,key:0},"请选择")),c["default"].createElement("select",{onChange:this.handleChange},e)}}]),t}(i.Component),f=function(e){function t(e){r(this,t);var n=o(this,Object.getPrototypeOf(t).call(this,e));return n.state=e,n.getPureSelect=function(e,t){return e[t]},n.getCompleteStatus=function(){var e=n.state.selectIndex;switch(n.state.checkType){case"single":return e.length&&e[0];case"region":return e[1]&&6===e[1].length||e[2]&&6===e[2].length;case"manufacturer":return 2===e.length&&e[1]}},n.getSelectIndex=function(){var e=n.state.selectIndex;return"region"===n.state.checkType&&(e[2]=e[2]||e[1],e[1]=(e[2]||e[1]).slice(0,4),e[0]=e[1].slice(0,2)),e},n}return l(t,e),u(t,[{key:"componentWillReceiveProps",value:function(e){this.setState(e)}},{key:"render",value:function(){var e=this,t=[],n=this.state,a=n.option,r=n.selectIndex;return a.map(function(n,a){n.filter(function(e,t){return e instanceof Object}).length?r&&r.map(function(r,o){var l=e.getPureSelect(n,r);l&&t.splice(a,1,c["default"].createElement(s,{option:l,key:a,userClass:e,index:a}))}):t.push(c["default"].createElement(s,{option:n,key:a,userClass:e,index:a}))}),c["default"].createElement("div",{className:"selectGroup"+(n["default"]?" disabled":"")},t)}}]),t}(i.Component);t["default"]=f},306:function(e,t,n){"use strict";function a(e){return e&&e.__esModule?e:{"default":e}}function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function o(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function l(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0}),t.init=t.Page=void 0;var u=function(){function e(e,t){for(var n=0;n<t.length;n++){var a=t[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}return function(t,n,a){return n&&e(t.prototype,n),a&&e(t,a),t}}(),i=n(2),c=a(i),s=n(154),f=n(155),d=n(165),p=n(168),m=n(173),h=a(m),y=n(176),v=a(y),g=n(175),b=a(g),E=n(307),C=a(E),j=n(177),k=a(j),O=n(171),P=a(O),S=n(178),w=a(S),N=(0,f.createStore)(function(){var e=arguments.length<=0||void 0===arguments[0]?[]:arguments[0],t=arguments[1];if(e[t.type])for(var n in t)e[t.type][n]=t[n];else e[t.type]=t;return e}),x=function(e){function t(e){r(this,t);var n=o(this,Object.getPrototypeOf(t).call(this,e));n.state=e;var a=void 0;return n.handleChange=function(e){var t=e.target.value.split(/\\|\//),r=t[t.length-1];a=n.state.userClass,$((0,s.findDOMNode)(a)).ajaxSubmit({type:"post",url:"/api/manage/projectfile/upload",processData:1,success:function(t){(0,p.afterSign)(t,function(t){n.setState({fileName:r,realPath:t.data.authFile},function(){e.value=""})},N.getState().dialog.component)}})},n["delete"]=function(){n.setState({fileName:""})},n}return l(t,e),u(t,[{key:"render",value:function(){var e=this.state.fileName;return c["default"].createElement("div",{className:"row"},c["default"].createElement("label",{htmlFor:"upload"},"项目合同"),c["default"].createElement("input",{type:"file",name:"upload",onChange:this.handleChange}),c["default"].createElement("a",{className:"btnUpload"},"上传"),c["default"].createElement("p",null,c["default"].createElement("span",null,e?e:"未选择文件"),c["default"].createElement("i",{onClick:this["delete"]})))}}]),t}(i.Component),T=function(e){function t(e){r(this,t);var n=o(this,Object.getPrototypeOf(t).call(this,e));n.state=e;var a=N.getState().dialog.component,l=void 0,u=void 0,i=void 0,c=void 0,s=void 0,f=void 0,d=void 0,m=void 0,h=void 0,y=void 0,v=void 0,g=void 0,b=void 0,E=void 0,C=void 0;n.getManufacturer=function(e){var t=[],a=n.state.project;return n.state.project?t[a.categoryCode+"C"+a.supplierId]=a.supplierName:e.length?e.map(function(e,n){t[e.categoryCode+"C"+e.supplierId]=e.supplierName}):t=e,t},n.getList=function(){N.getState().content.component.getData()},n.getProductData=function(){$.ajax({url:"/api/manage/product/list",timeout:2e3,data:{supplierId:n.state.manufacturer}}).done(function(e){(0,p.afterSign)(e,function(e){n.setState({arrProduct:n.getProduct(e.data)})},a)}).fail(function(e){(0,p.xhrTimeout)("产品列表",a)})};var j=[];return n.getProduct=function(e){return j=[],e.map(function(e){j[e.code]=e.name}),j},n.getIptVal=function(e){return n.refs[e].refs.ipt.value},n.getAddress=function(e,t){return e[t]},n.getArea=function(e,t,a){var r=n.state.areaConfig,o=r[0],l=r[1],u=r[2],i=[],c=[],s=[];return i[e]=o[e],c[t]=l[e][t],s[a]=(u[t]||l[e])[a],c[t]?[i,c,s]:[i,s]},n.handleStreet=function(e){return 0},n.handleSubmit=function(){var e=n.state,t=e.arrAddress;l=e.project?e.project.code:"",u=e.project?e.project.id:"",i=n.getIptVal("name"),d=n.getAddress(t,0),m=n.getAddress(t,1),h=n.getAddress(t,2),c=e.manufacturer,s=e.product,f=e.category,y=n.refs.street.value,v=n.getIptVal("projectParty"),g=n.getIptVal("contractAmount"),b=n.getIptVal("loanAmount"),E=e.term,C=n.refs.upload.state.realPath,$.ajax({type:"post",url:"/api/manage/project/apply",timeout:2e3,data:{code:l,id:u,name:i,supplierId:c,productCode:s,categoryCode:f,provinceCode:d,cityCode:m,areaCode:h,address:y,projectParty:v,contractAmount:g,loanAmount:b,loanPeriod:E,projectContractPath:C}}).done(function(e){(0,p.afterSign)(e,function(e){n.setState({status:1})},a)}).fail(function(e){(0,p.xhrTimeout)("申请项目",a)})},n}return l(t,e),u(t,[{key:"componentDidMount",value:function(){var e=this,t=N.getState().dialog.component,a=this.state.project;n.e(4,function(t){var a=n(299),r=[];for(var o in a)r.push(a[o]);e.setState({areaConfig:r})}),a?this.setState({arrManufacturer:this.getManufacturer()},function(){e.getProductData()}):$.ajax({url:"/api/manage/project/manufacturer",timeout:2e3}).done(function(t){(0,p.afterSign)(t,function(t){e.setState({arrManufacturer:e.getManufacturer(t.data)})})}).fail(function(e){(0,p.xhrTimeout)("合作厂家列表",t)})}},{key:"componentDidUpdate",value:function(){this.state.status||N.dispatch({type:"warning",component:this.refs.warning})}},{key:"render",value:function(){var e=this,t=[],n=this.state,a=n.option,r=n.areaConfig||[],o=n.arrManufacturer,l=n.arrProduct,u=n.project;return a.map(function(a,i){a.iptType?t.push(c["default"].createElement(P["default"],{option:a,key:i,ref:a.id,value:u?u[a.id]:void 0,validate:{type:["noEmpties","noBlank","noScript"],callback:function(e){N.getState().warning.component.setState({isShow:e,message:e})}}})):("address"===a.id&&t.push(c["default"].createElement("div",{className:"row",key:i},c["default"].createElement("label",{htmlFor:a.id},a.label),c["default"].createElement(w["default"],{id:a.id,"default":u,option:u&&r.length?e.getArea(u.provinceCode,u.cityCode,u.areaCode):r,checkType:"region",ref:a.id,callback:function(t,n){e.setState({showAddress:t,arrAddress:n})}}),n.showAddress?c["default"].createElement("input",{className:"ipt-txt single"+(u&&u.address?" disabled":""),placeholder:"请输入"+a.label,ref:"street",value:u?u.address:void 0,onChange:e.handleStreet}):[])),"loanPeriod"===a.id&&t.push(c["default"].createElement("div",{className:"row",key:i},c["default"].createElement("label",{htmlFor:a.id},a.label),c["default"].createElement(w["default"],{id:a.id,option:[[,,"2个月","3个月","4个月","5个月","6个月"]],checkType:"single",ref:a.id,callback:function(t,n){t&&e.setState({term:n[0]})}}))),"manufacturer"===a.id&&o&&t.push(c["default"].createElement("div",{className:"row",key:i},c["default"].createElement("label",{htmlFor:a.id},a.label),c["default"].createElement(w["default"],{"default":u,id:a.id,option:[e.getManufacturer(o)],checkType:"single",ref:a.id,callback:function(t,n){if(t){var a=n[0].split(/C/);e.setState({category:a[0],manufacturer:a[1],showProduct:1},function(){e.getProductData()})}}}),c["default"].createElement("a",{className:"add",href:"/manage/manufacturer"},"＋新增"))),"product"===a.id&&n.showProduct&&l&&t.push(c["default"].createElement("div",{className:"row",key:i},c["default"].createElement("label",{htmlFor:a.id},a.label),c["default"].createElement(w["default"],{id:a.id,option:[l],checkType:"single",ref:a.id,callback:function(t,n){t&&e.setState({product:n[0]})}}))))}),n.status?c["default"].createElement("div",{className:"content success"},c["default"].createElement("div",{className:"note"},c["default"].createElement("h2",null,"您的申请已经提交"),c["default"].createElement("p",null,"我们的专属服务人员将于两个工作日内与您联系"),c["default"].createElement("a",{onClick:this.getList},"查看我的项目"))):c["default"].createElement("form",null,c["default"].createElement(C["default"],{ref:"warning"}),t,c["default"].createElement(x,{ref:"upload",userClass:this}),c["default"].createElement("input",{className:"singleBtn",type:"button",value:"提交申请",onClick:this.handleSubmit}))}}]),t}(i.Component);T.defaultProps={option:[{iptType:1,id:"name",className:"ipt-txt",label:"项目名称"},{iptType:0,id:"address",label:"所在地"},{iptType:1,id:"projectParty",className:"ipt-txt",label:"项目方",maxlength:15},{iptType:1,id:"contractAmount",className:"ipt-txt",label:"合同金额",unit:"元"},{iptType:1,id:"loanAmount",className:"ipt-txt",label:"申请金额",unit:"元"},{iptType:0,id:"loanPeriod",label:"申请期限"},{iptType:0,id:"manufacturer",label:"合作厂家"},{iptType:0,id:"product",label:"产品"}]};var _=function(e){function t(e){r(this,t);var n=o(this,Object.getPrototypeOf(t).call(this,e));return n.state=e,n}return l(t,e),u(t,[{key:"componentDidMount",value:function(){var e=this,t=N.getState().dialog.component;$.ajax({url:"/api/user/supplier/category",timeout:2e3}).done(function(n){(0,p.afterSign)(n,function(t){var n=[];t.data.map(function(e){n[e.value]=e.label}),e.setState({arrCategory:n})},t)}).fail(function(e){(0,p.xhrTimeout)("合作厂家所属品类",t)})}},{key:"componentWillReceiveProps",value:function(e){this.setState(e)}},{key:"render",value:function(){var e=[],t=[],n=this.state,a=n.title,r=n.arrCategory||[],o=n.option;for(var l in a)e.push(c["default"].createElement("th",{key:l},a[l]));return o&&o.map(function(e,n){t.push(c["default"].createElement("tr",{key:n},c["default"].createElement("td",{title:e.code},e.code),c["default"].createElement("td",{title:e.name},e.name),c["default"].createElement("td",{title:e.supplierName},e.supplierName),c["default"].createElement("td",null,r[e.categoryCode]),c["default"].createElement("td",{title:e.loanAmount+"元"},e.loanAmount+"元"),c["default"].createElement("td",null,{TODO:"申请中",DONE:"申请成功",REJECT:"申请失败"}[e.status])))}),c["default"].createElement("table",null,c["default"].createElement("thead",null,c["default"].createElement("tr",null,e)),c["default"].createElement("tbody",null,t))}}]),t}(i.Component);_.defaultProps={title:{id:"项目编号",name:"项目名称",manufacturer:"合作厂家",category:"品类",sum:"申请金额",progress:"申请进度"}};var M=function(e){function t(){r(this,t);var e=o(this,Object.getPrototypeOf(t).call(this));e.state={};var n=N.getState().dialog.component;N.dispatch({type:"content",component:e}),e.handleClick=function(){e.setState({status:1})};var a=void 0;return e.getData=function(){a=(0,d.parse)(location.search.slice(1)).code,$.ajax({url:"/api/manage/project/"+(a?"detail":"list"),timeout:2e3,data:{projectCode:a}}).done(function(t){(0,p.afterSign)(t,function(t){var n=t.data;a?e.setState({status:1,project:n}):e.setState({option:n,status:!n.length})},n)}).fail(function(e){(0,p.xhrTimeout)("项目"+(a?"详情":"列表"),n)})},e}return l(t,e),u(t,[{key:"componentDidMount",value:function(){this.getData()}},{key:"render",value:function(){var e=this.state.option,t=this.state.status;return t?c["default"].createElement(T,{project:this.state.project}):e&&e.length?c["default"].createElement("div",{className:"content normal"},c["default"].createElement("h1",null,"我的项目"),[],c["default"].createElement(_,{option:this.state.option})):c["default"].createElement("div",{className:"content blank"},c["default"].createElement("a",{className:"singleBtn",onClick:this.handleClick},"我要申请"))}}]),t}(i.Component),A=function(e){function t(){return r(this,t),o(this,Object.getPrototypeOf(t).apply(this,arguments))}return l(t,e),u(t,[{key:"render",value:function(){return c["default"].createElement("div",{className:"mainArea"},c["default"].createElement("div",{className:"w1000"},c["default"].createElement(k["default"],{index:1}),c["default"].createElement(M,null)))}}]),t}(i.Component),D=function(e){function t(){return r(this,t),o(this,Object.getPrototypeOf(t).apply(this,arguments))}return l(t,e),u(t,[{key:"render",value:function(){return c["default"].createElement("div",{className:"page"},c["default"].createElement(b["default"],{store:N}),c["default"].createElement(h["default"],{store:N}),c["default"].createElement(A,null),c["default"].createElement(v["default"],null))}}]),t}(i.Component),I=function(e){e(c["default"].createElement(D,null),document.querySelector(".main"))};t.Page=D,t.init=I},307:function(e,t,n){"use strict";function a(e){return e&&e.__esModule?e:{"default":e}}function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function o(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function l(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var u=function(){function e(e,t){for(var n=0;n<t.length;n++){var a=t[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}return function(t,n,a){return n&&e(t.prototype,n),a&&e(t,a),t}}(),i=n(2),c=a(i),s=function(e){function t(e){r(this,t);var n=o(this,Object.getPrototypeOf(t).call(this,e));return n.state=e,n.handleClose=function(){n.setState({isShow:0})},n}return l(t,e),u(t,[{key:"componentDidUpdate",value:function(){var e=this,t=this.state.autoClose,n=setTimeout(function(){clearTimeout(n),t&&e.handleClose()},1e3*t)}},{key:"render",value:function(){var e=this.state;return c["default"].createElement("div",{className:"warning "+(e.isShow?"block":"hidden")},c["default"].createElement("p",null,e.message),c["default"].createElement("i",{className:"btnClose",onClick:this.handleClose}))}}]),t}(i.Component);t["default"]=s}});