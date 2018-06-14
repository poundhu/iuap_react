import React, { Component } from "react";
import mirror, { actions, connect } from "mirrorx";

import OrderEdit from "../components/index";
import OrderEditModel from "../models/orderEdit";

// 注入Model
mirror.model(OrderEditModel);

// 能够让你监控每一个 dispatch 出去的 action。
mirror.hook((action, getState) => {
    const {routing: {location}} = getState();
    if (action.type === "@@router/LOCATION_CHANGE" && location.pathname === '/ol/orderEdit') {
      actions.orderEdit.loadData();
    }
})

export default connect((state) => state.orderEdit)(OrderEdit);
