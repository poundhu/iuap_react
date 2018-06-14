import React from "react";
import { Route, Link } from "mirrorx";
import {orderList,orderEdit} from "./order_manage/containers";
const Routers = ({ match }) => (
  <div>
    <Route exact path={match.url} render={() => <h3>请选择一个菜单</h3>} />
    <Route
      exact
      path={`${match.url}/edit`}
      component={orderEdit}
    />
    <Route
      exact
      path={`${match.url}/list`}
      component={orderList}
    />
  </div>
);

export default Routers;
