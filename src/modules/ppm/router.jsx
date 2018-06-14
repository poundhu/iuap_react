import React from "react";
import { Route, Link } from "mirrorx";
import PlanIndexProj from "./containers/PlanIndexProj";

const Routers = ({ match }) => (
  <div>
    <Route exact path={match.url} render={() => <h3>请选择一个菜单</h3>} />
    <Route
      path={`${match.url}/PlanIndexProj`}
      component={PlanIndexProj}
    />
  </div>
);
export default Routers;
