webpackJsonp([10],{0:function(e,t,a){"use strict";var n=a(304),l=a(154);(0,n.init)(l.render)},304:function(e,t,a){"use strict";function n(e){return e&&e.__esModule?e:{"default":e}}function l(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function r(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function o(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0}),t.init=t.Page=void 0;var i=function(){function e(e,t){for(var a=0;a<t.length;a++){var n=t[a];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,a,n){return a&&e(t.prototype,a),n&&e(t,n),t}}(),u=a(2),c=n(u),s=a(155),f=a(168),p=a(172),m=n(p),d=a(176),h=n(d),g=a(175),b=n(g),y=a(170),v=n(y),E=a(165),C=(0,s.createStore)(function(){var e=arguments.length<=0||void 0===arguments[0]?[]:arguments[0],t=arguments[1];if(e[t.type])for(var a in t)e[t.type][a]=t[a];else e[t.type]=t;return e}),O=function(e){function t(e){l(this,t);var a=r(this,Object.getPrototypeOf(t).call(this,e));a.state={imageCaptchaUrl:"",message:"获取验证码",enableMessage:1};var n=C.getState().dialog.component;return a.handleImageCaptcha=function(){a.setState({imageCaptchaUrl:"/api/stream/captcha?t="+Date.now()})},a.setDefaultInfo=function(){var e=(0,E.parse)(location.search.substr(1));a.setState({mobile:e.mobile,code:e.code})},a.getStrangeIptVal=function(e){return a.refs[e].value},a.handleMessageCaptcha=function(){var e=a.state;a.state.enableMessage&&$.ajax({url:"/api/message/contractcaptcha",timeout:2e3,data:{code:e.code,phone:e.mobile}}).done(function(e){(0,f.afterSign)(e,function(e){var t=60,n=setInterval(function(){--t?a.setState({message:t+"秒后重试",enableMessage:0}):(clearInterval(n),a.setState({message:"获取验证码",enableMessage:1}))},1e3)},n)}).fail(function(e){(0,f.xhrTimeout)("验证码",n)})},a.handleSign=function(){var e=a.state;$.ajax({url:"/api/message/contract/validate",timeout:2e3,type:"post",data:{code:e.code,mobile:e.mobile,imgCode:a.getStrangeIptVal("imageCaptcha"),smsCode:a.getStrangeIptVal("messageCaptcha")}}).done(function(e){(0,f.afterSign)(e,function(e){console.log(e)},n)}).fail(function(e){(0,f.xhrTimeout)("用户合同匹配验证",n)})},a}return o(t,e),i(t,[{key:"componentDidMount",value:function(){this.handleImageCaptcha(),this.setDefaultInfo()}},{key:"render",value:function(){var e=this,t=[],a=this.props.option;return a.map(function(a,n){"mobile"===a.id&&t.push(c["default"].createElement(v["default"],{option:a,key:n,ref:a.id,form:e,value:e.state.mobile})),a.iptType||t.push(c["default"].createElement("div",{className:"row",key:n},c["default"].createElement("label",{htmlFor:a.id},a.label),c["default"].createElement("input",{className:a.className,placeholder:"请输入"+a.label,ref:a.id,maxLength:a.maxlength}),"imageCaptcha"===a.id?c["default"].createElement("img",{src:e.state.imageCaptchaUrl,onClick:e.handleImageCaptcha}):c["default"].createElement("a",{type:"button",className:"singleBtn",onClick:e.handleMessageCaptcha},e.state.message)))}),c["default"].createElement("form",null,c["default"].createElement("h1",null,c["default"].createElement("i",null),c["default"].createElement("span",null,"身份验证")),t,c["default"].createElement("input",{className:"singleBtn",type:"button",value:"好的，去签约",onClick:this.handleSign}))}}]),t}(u.Component);O.defaultProps={option:[{iptType:1,label:"手机号",id:"mobile",className:"ipt-txt",maxlength:11},{iptType:0,label:"图片验证码",id:"imageCaptcha",className:"ipt-txt withButton",maxlength:4},{iptType:0,label:"短信验证码",id:"messageCaptcha",className:"ipt-txt withButton",maxlength:6}]};var S=function(e){function t(){return l(this,t),r(this,Object.getPrototypeOf(t).apply(this,arguments))}return o(t,e),i(t,[{key:"render",value:function(){return c["default"].createElement("div",{className:"content"},c["default"].createElement("div",{className:"w1000"},c["default"].createElement(O,null)))}}]),t}(u.Component),w=function(e){function t(){return l(this,t),r(this,Object.getPrototypeOf(t).apply(this,arguments))}return o(t,e),i(t,[{key:"render",value:function(){return c["default"].createElement("div",{className:"mainArea"},c["default"].createElement(S,null))}}]),t}(u.Component),x=function(e){function t(){return l(this,t),r(this,Object.getPrototypeOf(t).apply(this,arguments))}return o(t,e),i(t,[{key:"render",value:function(){return c["default"].createElement("div",{className:"page"},c["default"].createElement(b["default"],{store:C}),c["default"].createElement(m["default"],{store:C}),c["default"].createElement(w,null),c["default"].createElement(h["default"],null))}}]),t}(u.Component),j=function(e){e(c["default"].createElement(x,null),document.querySelector(".main"))};t.Page=x,t.init=j}});