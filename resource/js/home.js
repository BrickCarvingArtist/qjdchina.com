webpackJsonp([6],{0:function(e,t,n){"use strict";var a=n(301),r=n(154);(0,a.init)(r.render)},301:function(e,t,n){"use strict";function a(e){return e&&e.__esModule?e:{"default":e}}function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function i(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function o(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0}),t.init=t.Page=void 0;var l=function(){function e(e,t){for(var n=0;n<t.length;n++){var a=t[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}return function(t,n,a){return n&&e(t.prototype,n),a&&e(t,a),t}}(),u=n(2),s=a(u),c=n(155),f=n(173),m=n(168),p=n(172),d=a(p),h=n(176),v=a(h),g=n(169),y=(a(g),n(170)),b=a(y),E=n(175),O=a(E),N=(0,c.createStore)(function(){var e=arguments.length<=0||void 0===arguments[0]?[]:arguments[0],t=arguments[1];if(e[t.type])for(var n in t)e[t.type][n]=t[n];else e[t.type]=t;return e}),P=function(e){function t(e){r(this,t);var n=i(this,Object.getPrototypeOf(t).call(this,e));return n.state=e,n}return o(t,e),l(t,[{key:"componentWillReceiveProps",value:function(e){this.setState(e)}},{key:"render",value:function(){var e=this.state,t=e.option;e.index;return s["default"].createElement("a",{className:"item "+e.status,href:t.href,title:t.name,style:{backgroundImage:"url("+t.imgUrl+")"}})}}]),t}(u.Component),k=function(e){function t(e){r(this,t);var n=i(this,Object.getPrototypeOf(t).call(this,e));n.state=e;var a=N.getState().dialog.component,o=N.getState().header.component;return n.getIptVal=function(e){return n.refs[e].refs.ipt.value},n.handleSubmit=function(){$.ajax({type:"post",url:"/api/user/signin",timeout:2e3,data:{phone:n.getIptVal("phone"),password:n.getIptVal("password")}}).done(function(e){(0,m.afterSign)(e,function(e){o.setState({signType:e.data.isMember?2:1},function(){e.data.isMember?location.href=(0,f.parse)(location.search.substr(1)).referer||"/manage/corporation":location.href="/user/join"})},a)}).fail(function(e){(0,m.xhrTimeout)("登录结果",a)})},n}return o(t,e),l(t,[{key:"render",value:function(){var e=this,t=[],n=this.state.option,a=N.getState().topNav.component;return n.map(function(n,a){t.push(s["default"].createElement(b["default"],{option:n,ref:n.id,key:a,form:e}))}),s["default"].createElement("from",{className:"signIn"},t,s["default"].createElement("a",{className:"singleBtn",onClick:this.handleSubmit},"登录"),s["default"].createElement("a",{className:"anchorSignUp",onClick:a.signUp},"免费注册"),s["default"].createElement("a",{className:"anchorReset",href:"/user/findPwd"},"忘记密码"))}}]),t}(u.Component);k.defaultProps={option:[{id:"phone",className:"ipt-txt",label:"手机号",maxlength:11},{type:"password",id:"password",className:"ipt-txt",label:"密码"}]};var w=function(e){function t(e){r(this,t);var n=i(this,Object.getPrototypeOf(t).call(this,e));n.state=e;var a=N.getState().header.component,o=void 0,l=void 0;return n.slide=function(){o=n.state.currentIndex,l=n.state.option.length,n.setState({currentIndex:o+1>=l?0:o+1})},n.autoSlide=function(){setInterval(function(){n.slide()},4e3)},n.subscribeHeader=function(){var e=a.state.subscriber||[];e.push(n),a.setState({subscriber:e})},n.getAuth=function(){return a.state.signType},n}return o(t,e),l(t,[{key:"componentDidMount",value:function(){this.autoSlide(),this.subscribeHeader()}},{key:"render",value:function(){var e=[],t=this.state,n=t.option,a=t.currentIndex;return n.map(function(t,n){e.push(s["default"].createElement(P,{option:t,status:n===a?"current":"normal",key:n}))}),s["default"].createElement("div",{className:"banner"},e,s["default"].createElement("div",{className:"w1000"},this.getAuth()?[]:s["default"].createElement(k,null)))}}]),t}(u.Component);w.defaultProps={currentIndex:0,option:[{name:"2015.2.6 网筑集团成立 红杉易居投资",imgUrl:"/image/banner/1.png"},{name:"仟金宝来啦",imgUrl:"/image/banner/2.png"},{name:"仟金顶携手东芝空调",imgUrl:"/image/banner/3.png"}]};var S=function(e){function t(){return r(this,t),i(this,Object.getPrototypeOf(t).apply(this,arguments))}return o(t,e),l(t,[{key:"render",value:function(){return s["default"].createElement("div",{className:"static"},s["default"].createElement("div",{className:"bg"}),s["default"].createElement("div",{className:"w1000"}))}}]),t}(u.Component),j=(function(e){function t(){return r(this,t),i(this,Object.getPrototypeOf(t).apply(this,arguments))}return o(t,e),l(t,[{key:"render",value:function(){return s["default"].createElement("div",{className:"media"},s["default"].createElement("div",{className:"w1000"},s["default"].createElement("h1",null,"媒体报道")))}}]),t}(u.Component),function(e){function t(e){r(this,t);var n=i(this,Object.getPrototypeOf(t).call(this,e));return n.state=e,n}return o(t,e),l(t,[{key:"render",value:function(){var e=[],t=this.props.option;return t.map(function(t,n){e.push(s["default"].createElement("a",{title:t.name,href:t.href,key:n}))}),s["default"].createElement("div",{className:"partner"},s["default"].createElement("div",{className:"w1000"},s["default"].createElement("h1",null,this.state.title),s["default"].createElement("div",{className:"container"},e)))}}]),t}(u.Component));j.defaultProps={title:"合作伙伴",option:[{name:"红杉资本"},{name:"华夏银行"},{name:"中国工商银行"},{name:"兴业银行"},{name:"中信银行"},{name:"易居"},{name:"海尔金融"},{name:"e签宝"}]};var C=function(e){function t(e){r(this,t);var n=i(this,Object.getPrototypeOf(t).call(this,e));return n.state=e,n}return o(t,e),l(t,[{key:"render",value:function(){var e=[],t=this.props.option;return t.map(function(t,n){e.push(s["default"].createElement("a",{title:t.name,href:t.href,key:n}))}),s["default"].createElement("div",{className:"manufacturer"},s["default"].createElement("div",{className:"w1000"},s["default"].createElement("h1",null,this.state.title),s["default"].createElement("div",{className:"container"},e)))}}]),t}(u.Component);C.defaultProps={title:"合作厂家",option:[{name:"汉普森电梯"},{name:"杭州西奥电梯有限公司"},{name:"华德涂料"},{name:"宇画石"},{name:"美的中央空调"},{name:"亚士漆"},{name:"TOSHIBA Carrier"},{name:"富奥电梯"},{name:"盾安中央空调"},{name:"盼盼防盗窗"},{name:"上海龙珀新型建材有限公司"},{name:"速捷"}]};var x=function(e){function t(){return r(this,t),i(this,Object.getPrototypeOf(t).apply(this,arguments))}return o(t,e),l(t,[{key:"render",value:function(){return s["default"].createElement("div",{className:"page"},s["default"].createElement(O["default"],{store:N}),s["default"].createElement(d["default"],{store:N}),s["default"].createElement(w,null),s["default"].createElement(S,null),s["default"].createElement(j,null),s["default"].createElement(C,null),s["default"].createElement(v["default"],null))}}]),t}(u.Component),I=function(e){e(s["default"].createElement(x,null),document.querySelector(".main"))};t.Page=x,t.init=I}});