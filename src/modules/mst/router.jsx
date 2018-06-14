import React from "react";
import { Route, Link } from "mirrorx";
import {
  OprtParamconfig,
  OprtParamconfigAdd
} from "./containers/OprtParamConfig";
const Routers = ({ match }) => (
  <div>
    <Route exact path={match.url} render={() => <h3>请选择一个菜单</h3>} />
    <Route
      exact
      path={`${match.url}/oprtparamconfig`}
      component={OprtParamconfig}
    />
    <Route
      exact
      path={`${match.url}/oprtparamconfig/add`}
      component={OprtParamconfigAdd}
    />
  </div>
);

export default Routers;
