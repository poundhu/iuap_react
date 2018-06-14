import React, { Component } from "react";
import mirror, { actions, connect } from "mirrorx";
import OprtParamConfig from "../components/oprtparamconfig";
import OprtParamConfigAdd from "../components/oprtparamconfig/oprtParamConfigAdd";
import OprtParamConfigModel from "../models/OprtParamConfig";

// 注入Model
mirror.model(OprtParamConfigModel);

// 全局HOOK函数

mirror.hook((action, getState) => {
    const {routing: {location}} = getState();
    if (action.type === "@@router/LOCATION_CHANGE" && location.pathname === '/mst/oprtparamconfig') {
      actions.oprtparamconfig.load();
    }
})

export const OprtParamconfig = connect((state) => state.oprtparamconfig)(OprtParamConfig);

export const OprtParamconfigAdd = connect((state) => state.oprtparamconfig)(OprtParamConfigAdd);