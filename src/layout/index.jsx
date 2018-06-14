import React, { Component } from 'react';
import { Link } from "mirrorx";
import './index.less';

const urlListPreview = [
	// 贵冶项目，原框架默认（岳明）
	{ "url": "/bdm/user", "name": "user" },
	{ "url": "/bdm/Master", "name": "Master" },
	{ "url": "/bdm/bpm", "name": "bpm" },
	{ "url": "/bdm/bpmcard", "name": "bpmcard" },
	// 志鹏：流程
	{ "url": "/mst/oprtparamconfig", "name": "oprtparamconfig" },
	{ "url": "/bdm/oprtparamconfig/add", "name": "oprtparamconfig/add" },
	// 绍振：查询表单+表格+分页
	{ "url": "/order/list", "name": "orderList" },
	{ "url": "/order/edit", "name": "orderEdit" },
	// 帅中：左树右表
	{ "url": "/ppm/PlanIndexProj", "name": "PlanIndexProj" }
]

const getURLList = () => {
	return urlListPreview.map((item, index) => {
		return (
			<li key={index} className="index-li">
				<Link to={item.url}>{item.name}</Link>
			</li>
		)
	})
}

export default class MainLayout extends Component {
	constructor(props){
		super(props);
	}
	render() {
		return (
			<div className="index">
				<div className="index-header">
					<ul className="index-main">
						<li className="index-main-li">
							<h3>iuap 应用平台前端典型案例</h3>
							<ul className="index-ul">
								{ getURLList() }
							</ul>
						</li>
					</ul>
				</div>
				
			</div>
		);
	}
}
