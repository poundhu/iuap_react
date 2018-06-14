import React, { Component } from "react";
import mirror, { actions, connect } from "mirrorx";
import OrderList from "../components/index";
import OrderListModel from "../models/orderList";

// 注入Model
mirror.model(OrderListModel);

// 全局HOOK函数

mirror.hook((action, getState) => {
    const {routing: {location}} = getState();
    if (action.type === "@@router/LOCATION_CHANGE" && location.pathname === '/ol/orderList') {
      
      actions.orderList.load();
    }
})

export default connect((state) => state.orderList)(OrderList);
