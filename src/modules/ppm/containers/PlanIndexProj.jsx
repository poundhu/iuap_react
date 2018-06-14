/**
 * 业务容器组件
 */
import React, { Component } from "react";
import mirror, { actions, connect } from "mirrorx";
import PlanIndexProj from "../components/PlanIndexProj";
import PlanIndexProjModel from "../models/PlanIndexProj";
//注入Model
mirror.model(PlanIndexProjModel);
export default connect(state => state.PlanIndexProj)(PlanIndexProj);
