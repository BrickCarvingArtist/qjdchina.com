webpackJsonp([11],{0:function(e,t,a){"use strict";var n=a(306),r=a(154);(0,n.init)(r.render)},177:function(e,t,a){"use strict";function n(e){return e&&e.__esModule?e:{"default":e}}function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function o(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function l(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var u=function(){function e(e,t){for(var a=0;a<t.length;a++){var n=t[a];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,a,n){return a&&e(t.prototype,a),n&&e(t,n),t}}(),i=a(2),c=n(i),s=function(e){function t(e){return r(this,t),o(this,Object.getPrototypeOf(t).call(this,e))}return l(t,e),u(t,[{key:"render",value:function(){var e=this.props;return c["default"].createElement("a",{className:"case "+e.className+(this.props.userClass.props.index===this.props.index?" current":" normal"),href:e.href},c["default"].createElement("i",null),c["default"].createElement("span",null,e.name))}}]),t}(i.Component),f=function(e){function t(e){return r(this,t),o(this,Object.getPrototypeOf(t).call(this,e))}return l(t,e),u(t,[{key:"render",value:function(){var e=this,t=[],a=this.props.option;return a.map(function(a,n){t.push(c["default"].createElement(s,{name:a.name,className:a.className,href:a.href,index:n,key:n,userClass:e}))}),c["default"].createElement("div",{className:"menu"},t)}}]),t}(i.Component);t["default"]=f,f.defaultProps={option:[{name:"企业信息",className:"corporation",href:"/manage/corporation"},{name:"我的项目",className:"project",href:"/manage/project"},{name:"我的订单",className:"bill",href:"/manage/bill"},{name:"我的放款",className:"loan",href:"/manage/loan"},{name:"我的合同",className:"contract",href:"/manage/contract"},{name:"合作厂家",className:"manufacturer",href:"/manage/manufacturer"}]}},178:function(e,t,a){"use strict";function n(e){return e&&e.__esModule?e:{"default":e}}function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function o(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function l(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var u=function(){function e(e,t){for(var a=0;a<t.length;a++){var n=t[a];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,a,n){return a&&e(t.prototype,a),n&&e(t,n),t}}(),i=a(2),c=n(i),s=function(e){function t(e){r(this,t);var a=o(this,Object.getPrototypeOf(t).call(this,e));return a.state=e,a.handleChange=function(e){var t=a.state,n=t.index,r=t.userClass,o=(r.state.selectIndex||[]).filter(function(e,t){return n>t});o[n]=e.target.value,r.setState({selectIndex:o},function(){var e=r.getCompleteStatus();e?r.state.callback(e,r.getSelectIndex()):r.state.callback(e)})},a}return l(t,e),u(t,[{key:"componentDidMount",value:function(){var e=this.state;e.userClass.state["default"]&&this.handleChange({target:{value:Object.keys(e.option)[0]}})}},{key:"componentWillReceiveProps",value:function(e){this.setState(e)}},{key:"render",value:function(){var e=[],t=this.state,a=t.option,n=t.userClass;for(var r in a)e.push(c["default"].createElement("option",{value:r,key:r},a[r]));return n.state["default"]||e.splice(0,0,c["default"].createElement("option",{value:0,key:0},"请选择")),c["default"].createElement("select",{onChange:this.handleChange},e)}}]),t}(i.Component),f=function(e){function t(e){r(this,t);var a=o(this,Object.getPrototypeOf(t).call(this,e));return a.state=e,a.getPureSelect=function(e,t){return e[t]},a.getCompleteStatus=function(){var e=a.state.selectIndex;switch(a.state.checkType){case"single":return e.length&&e[0];case"region":return e[1]&&6===e[1].length||e[2]&&6===e[2].length;case"manufacturer":return 2===e.length&&e[1]}},a.getSelectIndex=function(){var e=a.state.selectIndex;return"region"===a.state.checkType&&(e[2]=e[2]||e[1],e[1]=(e[2]||e[1]).slice(0,4),e[0]=e[1].slice(0,2)),e},a}return l(t,e),u(t,[{key:"componentWillReceiveProps",value:function(e){this.setState(e)}},{key:"render",value:function(){var e=this,t=[],a=this.state,n=a.option,r=a.selectIndex;return n.map(function(a,n){a.filter(function(e,t){return e instanceof Object}).length?r&&r.map(function(r,o){var l=e.getPureSelect(a,r);l&&t.splice(n,1,c["default"].createElement(s,{option:l,key:n,userClass:e,index:n}))}):t.push(c["default"].createElement(s,{option:a,key:n,userClass:e,index:n}))}),c["default"].createElement("div",{className:"selectGroup"+(a["default"]?" disabled":"")},t)}}]),t}(i.Component);t["default"]=f},306:function(e,t,a){"use strict";function n(e){return e&&e.__esModule?e:{"default":e}}function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function o(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function l(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0}),t.init=t.Page=void 0;var u=function(){function e(e,t){for(var a=0;a<t.length;a++){var n=t[a];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,a,n){return a&&e(t.prototype,a),n&&e(t,n),t}}(),i=a(2),c=n(i),s=a(154),f=a(155),d=a(165),p=a(168),m=a(173),h=n(m),g=a(176),v=n(g),y=a(175),b=n(y),E=a(307),S=n(E),j=a(177),C=n(j),k=a(171),P=n(k),O=a(178),w=n(O),N=(0,f.createStore)(function(){var e=arguments.length<=0||void 0===arguments[0]?[]:arguments[0],t=arguments[1];if(e[t.type])for(var a in t)e[t.type][a]=t[a];else e[t.type]=t;return e}),x=function(e){function t(e){r(this,t);var a=o(this,Object.getPrototypeOf(t).call(this,e));a.state=e;var n=void 0;return a.handleChange=function(e){var t=e.target.value.split(/\\|\//),r=t[t.length-1];n=a.state.userClass,$((0,s.findDOMNode)(n)).ajaxSubmit({type:"post",url:"/api/upload/project",processData:1,success:function(t){(0,p.afterSign)(t,function(t){a.setState({fileName:r,realPath:t.data.authFile},function(){e.value=""})},N.getState().dialog.component)}})},a["delete"]=function(){a.setState({fileName:""})},a}return l(t,e),u(t,[{key:"render",value:function(){var e=this.state.fileName;return c["default"].createElement("div",{className:"row"},c["default"].createElement("label",{htmlFor:"upload"},"项目合同"),c["default"].createElement("input",{type:"file",name:"upload",onChange:this.handleChange}),c["default"].createElement("a",{className:"btnUpload"},"上传"),c["default"].createElement("p",null,c["default"].createElement("span",null,e?e:"未选择文件"),c["default"].createElement("i",{onClick:this["delete"]})))}}]),t}(i.Component),T=function(e){function t(e){r(this,t);var a=o(this,Object.getPrototypeOf(t).call(this,e));a.state=e;var n=N.getState().dialog.component,l=void 0,u=void 0,i=void 0,c=void 0,s=void 0,f=void 0,d=void 0,m=void 0,h=void 0,g=void 0,v=void 0,y=void 0,b=void 0,E=void 0,S=void 0;a.getManufacturer=function(e){var t=[],n=a.state.project;return a.state.project?t[n.categoryCode+"C"+n.supplierId]=n.supplierName:e.length?e.map(function(e,a){t[e.categoryCode+"C"+e.supplierId]=e.supplierName}):t=e,t},a.getList=function(){N.getState().content.component.getData()},a.getProductData=function(){$.ajax({url:"/api/manage/product/list",timeout:2e3,data:{supplierId:a.state.manufacturer}}).done(function(e){(0,p.afterSign)(e,function(e){a.setState({arrProduct:a.getProduct(e.data)})},n)}).fail(function(e){(0,p.xhrTimeout)("产品列表",n)})};var j=[];return a.getProduct=function(e){return j=[],e.map(function(e){j[e.code]=e.name}),j},a.getIptVal=function(e){return a.refs[e].refs.ipt.value},a.getAddress=function(e,t){return e[t]},a.getArea=function(e,t,n){var r=a.state.areaConfig,o=r[0],l=r[1],u=r[2],i=[],c=[],s=[];return i[e]=o[e],c[t]=l[e][t],s[n]=(u[t]||l[e])[n],c[t]?[i,c,s]:[i,s]},a.handleStreet=function(e){return 0},a.handleSubmit=function(){var e=a.state,t=e.arrAddress;l=e.project?e.project.code:"",u=e.project?e.project.id:"",i=a.getIptVal("name"),d=a.getAddress(t,0),m=a.getAddress(t,1),h=a.getAddress(t,2),c=e.manufacturer,s=e.product,f=e.category,g=a.refs.street.value,v=a.getIptVal("projectParty"),y=a.getIptVal("contractAmount"),b=a.getIptVal("loanAmount"),E=e.term,S=a.refs.upload.state.realPath,$.ajax({type:"post",url:"/api/manage/project/apply",timeout:2e3,data:{code:l,id:u,name:i,supplierId:c,productCode:s,categoryCode:f,provinceCode:d,cityCode:m,areaCode:h,address:g,projectParty:v,contractAmount:y,loanAmount:b,loanPeriod:E,projectContractPath:S}}).done(function(e){(0,p.afterSign)(e,function(e){a.setState({status:1})},n)}).fail(function(e){(0,p.xhrTimeout)("申请项目",n)})},a}return l(t,e),u(t,[{key:"componentDidMount",value:function(){var e=this,t=N.getState().dialog.component,n=this.state.project;a.e(4,function(t){var n=a(299),r=[];for(var o in n)r.push(n[o]);e.setState({areaConfig:r})}),n?this.setState({arrManufacturer:this.getManufacturer()},function(){e.getProductData()}):$.ajax({url:"/api/manage/project/manufacturer",timeout:2e3}).done(function(t){(0,p.afterSign)(t,function(t){e.setState({arrManufacturer:e.getManufacturer(t.data)})})}).fail(function(e){(0,p.xhrTimeout)("合作厂家列表",t)})}},{key:"componentDidUpdate",value:function(){this.state.status||N.dispatch({type:"warning",component:this.refs.warning})}},{key:"render",value:function(){var e=this,t=[],a=this.state,n=a.option,r=a.areaConfig||[],o=a.arrManufacturer,l=a.arrProduct,u=a.project;return n.map(function(n,i){n.iptType?t.push(c["default"].createElement(P["default"],{option:n,key:i,ref:n.id,value:u?u[n.id]:void 0,validate:{type:["noEmpties","noBlank","noScript"],callback:function(e){N.getState().warning.component.setState({isShow:e,message:e})}}})):("address"===n.id&&t.push(c["default"].createElement("div",{className:"row",key:i},c["default"].createElement("label",{htmlFor:n.id},n.label),c["default"].createElement(w["default"],{id:n.id,"default":u,option:u&&r.length?e.getArea(u.provinceCode,u.cityCode,u.areaCode):r,checkType:"region",ref:n.id,callback:function(t,a){e.setState({showAddress:t,arrAddress:a})}}),a.showAddress?c["default"].createElement("input",{className:"ipt-txt single"+(u&&u.address?" disabled":""),placeholder:"请输入"+n.label,ref:"street",value:u?u.address:void 0,onChange:e.handleStreet}):[])),"loanPeriod"===n.id&&t.push(c["default"].createElement("div",{className:"row",key:i},c["default"].createElement("label",{htmlFor:n.id},n.label),c["default"].createElement(w["default"],{id:n.id,option:[[,,"2个月","3个月","4个月","5个月","6个月"]],checkType:"single",ref:n.id,callback:function(t,a){t&&e.setState({term:a[0]})}}))),"manufacturer"===n.id&&o&&t.push(c["default"].createElement("div",{className:"row",key:i},c["default"].createElement("label",{htmlFor:n.id},n.label),c["default"].createElement(w["default"],{"default":u,id:n.id,option:[e.getManufacturer(o)],checkType:"single",ref:n.id,callback:function(t,a){if(t){var n=a[0].split(/C/);e.setState({category:n[0],manufacturer:n[1],showProduct:1},function(){e.getProductData()})}}}),c["default"].createElement("a",{className:"add",href:"/manage/manufacturer"},"＋新增"))),"product"===n.id&&a.showProduct&&l&&t.push(c["default"].createElement("div",{className:"row",key:i},c["default"].createElement("label",{htmlFor:n.id},n.label),c["default"].createElement(w["default"],{id:n.id,option:[l],checkType:"single",ref:n.id,callback:function(t,a){t&&e.setState({product:a[0]})}}))))}),a.status?c["default"].createElement("div",{className:"content success"},c["default"].createElement("div",{className:"note"},c["default"].createElement("h2",null,"您的申请已经提交"),c["default"].createElement("p",null,"我们的专属服务人员将于两个工作日内与您联系"),c["default"].createElement("a",{onClick:this.getList},"查看我的项目"))):c["default"].createElement("form",null,c["default"].createElement(S["default"],{ref:"warning"}),t,c["default"].createElement(x,{ref:"upload",userClass:this}),c["default"].createElement("input",{className:"singleBtn",type:"button",value:"提交申请",onClick:this.handleSubmit}))}}]),t}(i.Component);T.defaultProps={option:[{iptType:1,id:"name",className:"ipt-txt",label:"项目名称"},{iptType:0,id:"address",label:"所在地"},{iptType:1,id:"projectParty",className:"ipt-txt",label:"项目方",maxlength:15},{iptType:1,id:"contractAmount",className:"ipt-txt",label:"合同金额",unit:"元"},{iptType:1,id:"loanAmount",className:"ipt-txt",label:"申请金额",unit:"元"},{iptType:0,id:"loanPeriod",label:"申请期限"},{iptType:0,id:"manufacturer",label:"合作厂家"},{iptType:0,id:"product",label:"产品"}]};var D=function(e){function t(e){r(this,t);var a=o(this,Object.getPrototypeOf(t).call(this,e));a.state=e,N.dispatch({type:"filter",component:a});var n=void 0,l=void 0;a.getProject=function(){return a.state.arrProject||[]},a.getManufacturer=function(){return a.state.arrManufacturer||[]},a.getStatus=function(e){if(l=[],(a.state.arrStatus||[]).map(function(e){l[e.value]=e.label}),e){var t=a.subscriber||[];t.push(e),a.subscriber=t}return l},a.getIptVal=function(e){return a.refs[e].refs.ipt.value};var u=void 0,i=void 0;a.toggleStart=function(){u=!a.state.dateStart,i=0,a.setState({dateStart:u,dateEnd:i})},a.toggleEnd=function(){u=0,i=!a.state.dateEnd,a.setState({dateStart:u,dateEnd:i})},a.getDateStart=function(e,t,n){a.setState({startDate:e,dateStart:0})},a.getDateEnd=function(e,t,n){a.setState({endDate:e,dateEnd:0})};var c=void 0;return a.handleSearch=function(){n=a.state,c=a.getIptVal("projectName"),a.state.userClass.getData({name:c?encodeURI(c):void 0,supplierId:n.manufacturer,status:n.state,startDate:n.startDate,endDate:n.endDate})},a}return l(t,e),u(t,[{key:"componentDidMount",value:function(){var e=this,t=N.getState().dialog.component;a.e(1,function(t){var n=a(179);e.setState({datePicker:n})}),$.ajax({url:"/api/manage/project/condition",timeout:2e3}).done(function(a){(0,p.afterSign)(a,function(t){e.setState({arrStatus:t.data.statusItem},function(){var t=e.subscriber;t&&t.map(function(e){e.forceUpdate()})})},t)}).fail(function(e){(0,p.xhrTimeout)("订单查询条件",t)}),$.ajax({url:"/api/manage/project/manufacturer",timeout:2e3}).done(function(a){(0,p.afterSign)(a,function(t){var a=[];t.data.map(function(e){a[e.supplierId]=e.supplierName}),e.setState({arrManufacturer:a})},t)}).fail(function(e){(0,p.xhrTimeout)("项目列表",t)})}},{key:"render",value:function(){var e=this,t=this.state,a=t.datePicker,n=t.dateStart,r=t.dateEnd,o=t.startDate,l=t.endDate;return c["default"].createElement("div",{className:"filter"},c["default"].createElement("label",null,"开始日期:"),c["default"].createElement("input",{className:"ipt-txt",placeholder:"请选择开始日期",readOnly:"readOnly",onClick:this.toggleStart,value:this.state.startDate}),c["default"].createElement("label",null,"截止日期:"),c["default"].createElement("input",{className:"ipt-txt",placeholder:"请选择截止日期",readOnly:"readOnly",onClick:this.toggleEnd,value:this.state.endDate}),a?c["default"].createElement(a,{className:""+(n||r?"on":"off")+(n?" start":"")+(r?" end":""),minDate:n?"2010-01-01":o||"2010-01-01",maxDate:r?Date.now():l||Date.now(),defaultDate:Date.now(),highlightWeekends:!0,locale:"zh-cn",todayText:"当前月",gotoSelectedText:"选中日",onChange:this["getDate"+(n?"Start":"End")]}):[],c["default"].createElement("label",{htmlFor:"manufacturer"},"合作厂家:"),c["default"].createElement(w["default"],{id:"manufacturer",option:[this.getManufacturer()],checkType:"single",callback:function(t,a){t&&e.setState({manufacturer:a[0]})}}),c["default"].createElement(P["default"],{option:{label:"项目名称",className:"ipt-txt"},ref:"projectName"}),c["default"].createElement("label",{htmlFor:"state"},"项目状态:"),c["default"].createElement(w["default"],{id:"state",option:[this.getStatus()],checkType:"single",callback:function(t,a){t&&e.setState({state:a[0]})}}),c["default"].createElement("div",{className:"option"},c["default"].createElement("a",{className:"singleBtn",onClick:this.handleSearch},"查询")))}}]),t}(i.Component),_=function(e){function t(e){r(this,t);var a=o(this,Object.getPrototypeOf(t).call(this,e));return a.state=e,a.getStatusName=function(e){return N.getState().filter.component.getStatus(a)[e]},a}return l(t,e),u(t,[{key:"componentDidMount",value:function(){var e=this,t=N.getState().dialog.component;$.ajax({url:"/api/user/supplier/category",timeout:2e3}).done(function(a){(0,p.afterSign)(a,function(t){var a=[];t.data.map(function(e){a[e.value]=e.label}),e.setState({arrCategory:a})},t)}).fail(function(e){(0,p.xhrTimeout)("合作厂家所属品类",t)})}},{key:"componentWillReceiveProps",value:function(e){this.setState(e)}},{key:"render",value:function(){var e=this,t=[],a=[],n=this.state,r=n.title,o=n.arrCategory||[],l=n.option;for(var u in r)t.push(c["default"].createElement("th",{key:u},r[u]));return l&&l.map(function(t,n){a.push(c["default"].createElement("tr",{key:n},c["default"].createElement("td",{title:t.code},c["default"].createElement("div",null,t.code)),c["default"].createElement("td",{title:t.name},c["default"].createElement("div",null,t.name)),c["default"].createElement("td",{title:t.supplierName},t.supplierName),c["default"].createElement("td",null,o[t.categoryCode]),c["default"].createElement("td",{title:t.loanAmount+"元"},t.loanAmount+"元"),c["default"].createElement("td",null,e.getStatusName(t.status))))}),c["default"].createElement("table",null,c["default"].createElement("thead",null,c["default"].createElement("tr",null,t)),c["default"].createElement("tbody",null,a))}}]),t}(i.Component);_.defaultProps={title:{id:"项目编号",name:"项目名称",manufacturer:"合作厂家",category:"品类",sum:"申请金额",progress:"申请进度"}};var M=function(e){function t(){r(this,t);var e=o(this,Object.getPrototypeOf(t).call(this));e.state={};var a=N.getState().dialog.component;N.dispatch({type:"content",component:e}),e.handleClick=function(){e.setState({status:1})};var n=void 0;return e.getData=function(t){n=(0,d.parse)(location.search.slice(1)).code,$.ajax({url:"/api/manage/project/"+(n?"detail":"list"),timeout:2e3,data:t||{projectCode:n}}).done(function(t){(0,p.afterSign)(t,function(t){var a=t.data;n?e.setState({status:1,project:a}):e.setState({option:a})},a)}).fail(function(e){(0,p.xhrTimeout)("项目"+(n?"详情":"列表"),a)})},e}return l(t,e),u(t,[{key:"componentDidMount",value:function(){this.getData()}},{key:"render",value:function(){var e=this.state.option,t=this.state.status;return t?c["default"].createElement(T,{project:this.state.project}):e?c["default"].createElement("div",{className:"content normal"},c["default"].createElement("h1",null,"我的项目"),[],c["default"].createElement(D,{userClass:this}),c["default"].createElement(_,{option:this.state.option})):c["default"].createElement("div",{className:"content blank"},c["default"].createElement("a",{className:"singleBtn",onClick:this.handleClick},"我要申请"))}}]),t}(i.Component),I=function(e){function t(){return r(this,t),o(this,Object.getPrototypeOf(t).apply(this,arguments))}return l(t,e),u(t,[{key:"render",value:function(){return c["default"].createElement("div",{className:"mainArea"},c["default"].createElement("div",{className:"w1000"},c["default"].createElement(C["default"],{index:1}),c["default"].createElement(M,null)))}}]),t}(i.Component),A=function(e){function t(){return r(this,t),o(this,Object.getPrototypeOf(t).apply(this,arguments))}return l(t,e),u(t,[{key:"render",value:function(){return c["default"].createElement("div",{className:"page"},c["default"].createElement(b["default"],{store:N}),c["default"].createElement(h["default"],{store:N}),c["default"].createElement(I,null),c["default"].createElement(v["default"],null))}}]),t}(i.Component),F=function(e){e(c["default"].createElement(A,null),document.querySelector(".main"))};t.Page=A,t.init=F},307:function(e,t,a){"use strict";function n(e){return e&&e.__esModule?e:{"default":e}}function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function o(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function l(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var u=function(){function e(e,t){for(var a=0;a<t.length;a++){var n=t[a];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,a,n){return a&&e(t.prototype,a),n&&e(t,n),t}}(),i=a(2),c=n(i),s=function(e){function t(e){r(this,t);var a=o(this,Object.getPrototypeOf(t).call(this,e));return a.state=e,a.handleClose=function(){a.setState({isShow:0})},a}return l(t,e),u(t,[{key:"componentDidUpdate",value:function(){var e=this,t=this.state.autoClose,a=setTimeout(function(){clearTimeout(a),t&&e.handleClose()},1e3*t)}},{key:"render",value:function(){var e=this.state;return c["default"].createElement("div",{className:"warning "+(e.isShow?"block":"hidden")},c["default"].createElement("p",null,e.message),c["default"].createElement("i",{className:"btnClose",onClick:this.handleClose}))}}]),t}(i.Component);t["default"]=s}});