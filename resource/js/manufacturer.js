webpackJsonp([9],{0:function(e,t,n){"use strict";var a=n(304),r=n(154);(0,a.init)(r.render)},177:function(e,t,n){"use strict";function a(e){return e&&e.__esModule?e:{"default":e}}function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function o(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function u(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var i=function(){function e(e,t){for(var n=0;n<t.length;n++){var a=t[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}return function(t,n,a){return n&&e(t.prototype,n),a&&e(t,a),t}}(),l=n(2),c=a(l),s=function(e){function t(e){return r(this,t),o(this,Object.getPrototypeOf(t).call(this,e))}return u(t,e),i(t,[{key:"render",value:function(){var e=this.props;return c["default"].createElement("a",{className:"case "+e.className+(this.props.userClass.props.index===this.props.index?" current":" normal"),href:e.href},c["default"].createElement("i",null),c["default"].createElement("span",null,e.name))}}]),t}(l.Component),f=function(e){function t(e){return r(this,t),o(this,Object.getPrototypeOf(t).call(this,e))}return u(t,e),i(t,[{key:"render",value:function(){var e=this,t=[],n=this.props.option;return n.map(function(n,a){t.push(c["default"].createElement(s,{name:n.name,className:n.className,href:n.href,index:a,key:a,userClass:e}))}),c["default"].createElement("div",{className:"menu"},t)}}]),t}(l.Component);t["default"]=f,f.defaultProps={option:[{name:"企业信息",className:"corporation",href:"/manage/corporation"},{name:"我的项目",className:"project",href:"/manage/project"},{name:"我的订单",className:"bill",href:"/manage/bill"},{name:"我的放款",className:"loan",href:"/manage/loan"},{name:"我的合同",className:"contract",href:"/manage/contract"},{name:"合作厂家",className:"manufacturer",href:"/manage/manufacturer"}]}},178:function(e,t,n){"use strict";function a(e){return e&&e.__esModule?e:{"default":e}}function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function o(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function u(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var i=function(){function e(e,t){for(var n=0;n<t.length;n++){var a=t[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}return function(t,n,a){return n&&e(t.prototype,n),a&&e(t,a),t}}(),l=n(2),c=a(l),s=function(e){function t(e){r(this,t);var n=o(this,Object.getPrototypeOf(t).call(this,e));return n.state=e,n.handleChange=function(e){var t=n.state,a=t.index,r=t.userClass,o=(r.state.selectIndex||[]).filter(function(e,t){return a>t});o[a]=e.target.value,r.setState({selectIndex:o},function(){var e=r.getCompleteStatus();e?r.state.callback(e,r.getSelectIndex()):r.state.callback(e)})},n}return u(t,e),i(t,[{key:"componentDidMount",value:function(){var e=this.state;e.userClass.state["default"]&&this.handleChange({target:{value:Object.keys(e.option)[0]}})}},{key:"componentWillReceiveProps",value:function(e){this.setState(e)}},{key:"render",value:function(){var e=[],t=this.state,n=t.option,a=t.userClass;for(var r in n)e.push(c["default"].createElement("option",{value:r,key:r},n[r]));return a.state["default"]||e.splice(0,0,c["default"].createElement("option",{value:0,key:0},"请选择")),c["default"].createElement("select",{onChange:this.handleChange},e)}}]),t}(l.Component),f=function(e){function t(e){r(this,t);var n=o(this,Object.getPrototypeOf(t).call(this,e));return n.state=e,n.getPureSelect=function(e,t){return e[t]},n.getCompleteStatus=function(){var e=n.state.selectIndex;switch(n.state.checkType){case"single":return e.length&&e[0];case"region":return e[1]&&6===e[1].length||e[2]&&6===e[2].length;case"manufacturer":return 2===e.length&&e[1]}},n.getSelectIndex=function(){var e=n.state.selectIndex;return"region"===n.state.checkType&&(e[2]=e[2]||e[1],e[1]=(e[2]||e[1]).slice(0,4),e[0]=e[1].slice(0,2)),e},n}return u(t,e),i(t,[{key:"componentWillReceiveProps",value:function(e){this.setState(e)}},{key:"render",value:function(){var e=this,t=[],n=this.state,a=n.option,r=n.selectIndex;return a.map(function(n,a){n.filter(function(e,t){return e instanceof Object}).length?r&&r.map(function(r,o){var u=e.getPureSelect(n,r);u&&t.splice(a,1,c["default"].createElement(s,{option:u,key:a,userClass:e,index:a}))}):t.push(c["default"].createElement(s,{option:n,key:a,userClass:e,index:a}))}),c["default"].createElement("div",{className:"selectGroup"+(n["default"]?" disabled":"")},t)}}]),t}(l.Component);t["default"]=f},304:function(e,t,n){"use strict";function a(e){return e&&e.__esModule?e:{"default":e}}function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function o(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function u(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0}),t.init=t.Page=void 0;var i=function(){function e(e,t){for(var n=0;n<t.length;n++){var a=t[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}return function(t,n,a){return n&&e(t.prototype,n),a&&e(t,a),t}}(),l=n(2),c=a(l),s=n(154),f=n(155),p=n(168),d=n(173),m=a(d),h=n(176),y=a(h),v=n(177),g=a(v),b=n(175),O=a(b),E=n(178),C=a(E),k=(0,f.createStore)(function(){var e=arguments.length<=0||void 0===arguments[0]?[]:arguments[0],t=arguments[1];if(e[t.type])for(var n in t)e[t.type][n]=t[n];else e[t.type]=t;return e}),S=function(e){function t(e){r(this,t);var n=o(this,Object.getPrototypeOf(t).call(this,e));return n.state=e,n}return u(t,e),i(t,[{key:"componentWillReceiveProps",value:function(e){this.setState(e)}},{key:"render",value:function(){var e=this.state,t=e.index,n=(e.option,k.getState().dialogContent.component);n.state.upload;return c["default"].createElement("li",null,c["default"].createElement("a",{target:"_blank"},"文件"+(t+1)))}}]),t}(l.Component),P=function(e){function t(e){r(this,t);var n=o(this,Object.getPrototypeOf(t).call(this,e));return n.state=e,n}return u(t,e),i(t,[{key:"componentWillReceiveProps",value:function(e){this.setState(e)}},{key:"render",value:function(){var e=[],t=this.state.option;return t&&t.map(function(t,n){e.push(c["default"].createElement(S,{index:n,key:n,id:t.id,option:t}))}),c["default"].createElement("ul",null,e)}}]),t}(l.Component),j=function(e){function t(){r(this,t);var e=o(this,Object.getPrototypeOf(t).call(this));e.state={};var n=k.getState().dialog.component,a=void 0;return k.dispatch({type:"dialogContent",component:e}),e.handleUpload=function(t){a=t.target.value.split(/\\/),$((0,s.findDOMNode)(e)).ajaxSubmit({type:"post",url:"/api/upload/manufacturer",processData:1,success:function(r){(0,p.afterSign)(r,function(r){$.ajax({url:"/api/manage/manufacturerfile/reassure",type:"post",timeout:2e3,data:{id:e.state.manufacturerId,authFile:r.data.authFile}}).done(function(o){(0,p.afterSign)(r,function(o){e.setState({option:[{name:a[a.length-1],fileUploadPath:r.data.authFile}]},function(){n.setState({option:{title:{iconClassName:"info",name:"温馨提示",btnClose:1},message:"上传成功"}},function(){t.value=""})})},n)}).fail(function(e){(0,p.xhrTimeout)("资料上传结果",n)})},n)}})},e}return u(t,e),i(t,[{key:"render",value:function(){return c["default"].createElement("form",{className:"content"},c["default"].createElement(P,{option:this.state.option,code:this.state.code}),this.state.upload?c["default"].createElement("div",{className:"singleBtn"},c["default"].createElement("input",{type:"file",multiple:"multiple",name:"upload",onChange:this.handleUpload})):[])}}]),t}(l.Component),x=function(e){function t(e){r(this,t);var n=o(this,Object.getPrototypeOf(t).call(this,e));n.state=e;var a=k.getState().dialog.component;return n.handleAdd=function(){n.getOption()},n.getOption=function(){var e=n.state.option;e?n.setState({option:e,status:1}):!function(){var e=n.state.category,t=[];for(var r in e)t[r]=[];$.ajax({url:"/api/user/supplier/list",timeout:2e3}).done(function(r){(0,p.afterSign)(r,function(a){var r=a.data;r.map(function(e){t[e.categoryCode][e.id]=e.name}),n.setState({option:[e,t],status:1})},a)}).fail(function(e){(0,p.xhrTimeout)("合作厂家列表",a)})}()},n.handleSubmit=function(){var e=n.state,t=e.arrManufacturer[0],r=e.arrManufacturer[1];$.ajax({url:"/api/manage/manufacturer/add",type:"post",timeout:2e3,data:{categoryCode:t,supplierId:r}}).done(function(e){(0,p.afterSign)(e,function(e){k.getState().table.component.getData()},a)}).fail(function(e){(0,p.xhrTimeout)("新增合作厂家操作结果",a)})},n.handleCancel=function(){n.setState({status:0})},n}return u(t,e),i(t,[{key:"componentWillReceiveProps",value:function(e){this.setState(e)}},{key:"render",value:function(){var e=this,t=this.state.status;return t?c["default"].createElement("div",{className:"option"},c["default"].createElement(C["default"],{id:"manufacturer",option:this.state.option,callback:function(t,n){e.setState({arrManufacturer:n})},checkType:"manufacturer"}),c["default"].createElement("a",{className:"singleBtn submit",onClick:this.handleSubmit},"提交"),c["default"].createElement("a",{className:"singleBtn cancel",onClick:this.handleCancel},"取消")):c["default"].createElement("a",{className:"add",onClick:this.handleAdd})}}]),t}(l.Component),N=function(e){function t(e){r(this,t);var n=o(this,Object.getPrototypeOf(t).call(this,e));return n.state=e,n.getCategoryName=function(e){return n.state.userClass.getCategoryName(e)},n.getStatusName=function(e){return{TODO:"申请中",DONE:"申请成功",FAILURE:"申请失败"}[e]},n.handleFile=function(){k.getState().dialog.component.setState({option:{title:{iconClassName:"upload",name:"文件上传",btnClose:1},content:(0,l.createFactory)(j)({}),message:0},isShow:1},function(){var e=n.state.option.uploadPath.value;k.getState().dialogContent.component.setState({upload:1,manufacturerId:n.state.id,option:e?[{fileUploadPath:e}]:[]})})},n}return u(t,e),i(t,[{key:"componentWillReceiveProps",value:function(e){this.setState(e)}},{key:"render",value:function(){var e=[],t=this.state.option,n=void 0;for(var a in t)n=t[a].value,e[t[a].index]=c["default"].createElement("td",{key:a},"categoryCode"===a?this.getCategoryName(n):"status"===a?(t.uploadPath.value?"已":"未")+"上传证书":"uploadPath"===a?c["default"].createElement("a",{className:"btnFile",onClick:this.handleFile},t[a].value?"重新上传":"上传证书"):n);return c["default"].createElement("tr",null,e)}}]),t}(l.Component),w=function(e){function t(e){r(this,t);var n=o(this,Object.getPrototypeOf(t).call(this,e));n.state=e;var a=k.getState().dialog.component;return k.dispatch({type:"table",component:n}),n.getCategoryName=function(e){return n.state.category[e]},n.getTrOption=function(e){var t={},a=n.state.title;t.uploadPath={index:3,value:""};for(var r in e)a[r]&&(t[r]={index:Object.keys(a).indexOf(r),value:e[r]});return t},n.getData=function(){$.ajax({url:"/api/manage/project/manufacturer",timeout:2e3}).done(function(e){(0,p.afterSign)(e,function(e){var t=e.data;n.setState({option:t})},a)}).fail(function(e){(0,p.xhrTimeout)("我的合作厂家列表",a)})},n}return u(t,e),i(t,[{key:"componentDidMount",value:function(){this.getData()}},{key:"componentWillReceiveProps",value:function(e){this.setState(e)}},{key:"render",value:function(){var e=this,t=[],n=[],a=this.state,r=a.title,o=a.option;for(var u in r)t.push(c["default"].createElement("th",{key:u},r[u]));return o.map(function(t,a){n.push(c["default"].createElement(N,{id:t.id,option:e.getTrOption(t),key:a,userClass:e}))}),c["default"].createElement("table",null,c["default"].createElement("thead",null,c["default"].createElement("tr",null,t)),c["default"].createElement("tbody",null,n))}}]),t}(l.Component);w.defaultProps={title:{categoryCode:"品类",supplierName:"合作厂家",status:"状态",uploadPath:"合作证明"},option:[]};var _=function(e){function t(){r(this,t);var e=o(this,Object.getPrototypeOf(t).call(this));return e.state={},e}return u(t,e),i(t,[{key:"componentDidMount",value:function(){var e=this,t=k.getState().dialog.component;$.ajax({url:"/api/user/supplier/category",timeout:2e3}).done(function(n){var a=[];(0,p.afterSign)(n,function(t){t.data.map(function(e){a[e.value]=e.label}),e.setState({category:a})},t)}).fail(function(e){(0,p.xhrTimeout)("合作厂家所属品类",t)})}},{key:"render",value:function(){var e=this.state.category;return c["default"].createElement("div",{className:"content"},c["default"].createElement("h1",null,"我的合作厂家"),c["default"].createElement(w,{category:e}),c["default"].createElement(x,{category:e}))}}]),t}(l.Component),T=function(e){function t(){return r(this,t),o(this,Object.getPrototypeOf(t).apply(this,arguments))}return u(t,e),i(t,[{key:"render",value:function(){return c["default"].createElement("div",{className:"mainArea"},c["default"].createElement("div",{className:"w1000"},c["default"].createElement(g["default"],{index:5}),c["default"].createElement(_,null)))}}]),t}(l.Component),M=function(e){function t(){return r(this,t),o(this,Object.getPrototypeOf(t).apply(this,arguments))}return u(t,e),i(t,[{key:"render",value:function(){return c["default"].createElement("div",{className:"page"},c["default"].createElement(O["default"],{store:k}),c["default"].createElement(m["default"],{store:k}),c["default"].createElement(T,null),c["default"].createElement(y["default"],null))}}]),t}(l.Component),I=function(e){e(c["default"].createElement(M,null),document.querySelector(".main"))};t.Page=M,t.init=I}});