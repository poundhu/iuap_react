/**
 * 业务容器组件
 */
import React, { Component } from "react";
import mirror, { actions, connect } from "mirrorx";
import List from './components/List';
import Edit from './components/Edit';
import model from './models'

//注入Model
mirror.model(model);

export const orderList= connect((state) => state.order)(List);
export const orderEdit= connect((state) => state.order)(Edit);
