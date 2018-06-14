/**
 * 业务容器组件
 */
import React, { Component } from "react";
import mirror, { actions, connect } from "mirrorx";
import MonitorsvgAdd from "../components/monitorsvg/monitorsvgAdd";

//全局HOOK函数
mirror.hook((action, getState) => {
  const { routing: { location } } = getState();
  if (action.type === "@@router/LOCATION_CHANGE" && location.pathname === "/ims/monitorsvg") {
    actions.monitorsvg.loading({
      type: 'load'
    });
  }
});

export default connect((state) => state.monitorsvg)(MonitorsvgAdd);
