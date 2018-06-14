/*
* bdm模块路由表
* */
import React from "react";
import { Route,Link } from "mirrorx";
import Master from './containers/Master';
import Bpm from './components/BPM/Bpm.jsx';
import Card from './components/Card';
import BpmCard  from './components/BpmCard';

const Routers = ({ match }) => (
	<div>
		<Route exact path={match.url} render={() => (
            <h3>请选择一个菜单</h3>
        )}/>
        <Route exact path={`${match.url}/Master`} component={Master}/>
        <Route exact path={`${match.url}/bpm`} component={Bpm}/>
        <Route exact path={`${match.url}/bpmcard`} component={BpmCard}/>
	</div>
);

export default Routers;