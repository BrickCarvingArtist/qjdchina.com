import React, {Component} from "react";
class Footer extends Component{
	constructor(props){
		super(props);
	}
	render(){
		let arrInfo = [],
			arrOption = [],
			props = this.props,
			info = props.info,
			option = props.option;
		option.map((list, index) => {
			arrOption.push(
				<a key={index} href={list.href}>
					{list.name}
				</a>
			);
		});
		for(let i in info){
			arrInfo.push(
				<span key={i} dangerouslySetInnerHTML={
					{
						__html : info[i]
					}
				}></span>
			);
		}
		return (
			<div className="footer">
				<div className="upper">
					<div className="w1000">
						<p className="left">
							{arrOption}
						</p>
						<p className="right">
							<span>客服电话:</span>
							<strong>400-826-1582</strong>
							<span>(工作日9:00-17:00)</span>
						</p>
					</div>
				</div>
				<div className="lower">
					<div className="w1000">
						{arrInfo}
					</div>
				</div>
			</div>
		);
	}
}
Footer.defaultProps = {
	option : [
		{
			name : "公司简介",
			href : "/introduction"
		},
		{
			name : "法律法规",
			href : "/legal"
		},
		{
			name : "帮助中心",
			href : "/wiki"
		},
		{
			name : "联系我们",
			href : "/aboutus"
		}
	],
	info : {
		copyright : "&copy;2015",
		record : "浙ICP备15003727号",
		corporation : "仟金顶网络科技有限公司"
	}
};
export default Footer;