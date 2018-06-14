import React from "react";
import { Route, Link } from "mirrorx";
import OrderEdit from "./containers/orderEdit";
const Routers = ({ match }) => (
  <div>
    <Route exact path={match.url} render={() => <h3>请选择一个菜单</h3>} />
    <Route
      exact
      path={`${match.url}/orderEdit`}
      component={OrderEdit}
    />
  </div>
);

export default Routers;
