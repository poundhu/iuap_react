/**
 * 业务容器组件
 */
import React, { Component } from "react";
import mirror, { actions, connect } from "mirrorx";
import MonitorSvg from "../components/monitorsvg";
import MonitorSvgModel from "../models/MonitorSvg";

//注入Model
mirror.model(MonitorSvgModel);

//全局HOOK函数
mirror.hook((action, getState) => {
  const { routing: { location } } = getState();
  if (action.type === "@@router/LOCATION_CHANGE" && location.pathname === "/ims/monitorsvg") {
    actions.monitorsvg.loading({
      type: 'load'
    });
  }
});

export default connect((state) => state.monitorsvg)(MonitorSvg);
