/*
* 路由表
* */
import React from "react";
import { Router, Route } from "mirrorx";
import Layout from "layout";
import BDM from "modules/bdm/router";
import MST from "modules/mst/router";
import PPM from "modules/ppm/router";
import order from 'modules/order/router';

import MainLayout from '../layout'

const App = () => (
  <Router>
    <div>
      <MainLayout />
      {/* 单表路由 */}
      <Route path="/bdm" component={BDM} />
      {/* 主子表路由 */}
      <Route path="/mst" component={MST} />
      {/* 树表路由 */}
      <Route path="/ppm" component={PPM} />
      {/* 订单管理 */}
      <Route path="/order" component={order} />
    </div>
  </Router>
);

export default App;
