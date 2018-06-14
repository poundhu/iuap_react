import React from "react";
import { Route, Link } from "mirrorx";
import OrderList from "./containers/orderList";
const Routers = ({ match }) => (
  <div>
    <Route exact path={match.url} render={() => <h3>请选择一个菜单</h3>} />
    <Route
      exact
      path={`${match.url}/orderList`}
      component={OrderList}
    />
  </div>
);

export default Routers;
