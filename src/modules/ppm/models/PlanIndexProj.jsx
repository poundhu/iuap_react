import React, { Component } from "react";
import { actions } from "mirrorx";
import * as api from "../services/PlanIndexProj";
import * as tips from "utils/index";
export default {
  name: "PlanIndexProj",
  initialState: {
    addShow: "",
    showModul: false,
    showText: "新增",
    treeData: [],
    currentNode: "组织结构",
    currentId: null,
    currentData: {},
    tableData: [],
    totalPages: 0
  },
  reducers: {
    save(state, data) {
      return {
        ...state,
        ...data
      };
    }
  },
  effects: {
    // 初始化
    async load() {
      let {
        data: { success, detailMsg }
      } = await api.get_tree();
      // var a = JSON.stringify(detailMsg.data);
      if (success) {
        actions.PlanIndexProj.save({ treeData: detailMsg.data });
      } else {
        tips.Error("数据请求失败");
      }
    },
    // 获取树表数据
    async getTable(data) {
      let {
        data: { success, detailMsg }
      } = await api.get_table(data);
      if (success) {
        if (!detailMsg.data) {
          actions.PlanIndexProj.save({ tableData: [] });
        } else {
          actions.PlanIndexProj.save({
            tableData: detailMsg.data.content,
            totalPages: detailMsg.data.totalPages
          });
        }
      } else {
        tips.Error("列表数据获取失败");
      }
    },
    // 新增树数据
    async addTreeData(data) {
      let {
        data: { success, detailMsg }
      } = await api.add_tree(data);
      actions.PlanIndexProj.showModul(false);
      if (success) {
        tips.success("新增成功");
        actions.PlanIndexProj.load();
      } else {
        tips.Error("增加失败");
      }
    },
    // 展示模态框
    showModul(data) {
      actions.PlanIndexProj.save({ showModul: data });
    },
    // 点击树表结构
    onTreeClick(data) {
      actions.PlanIndexProj.save({ currentId: data });
    },
    //设置当前节点
    onTreeSelect(data) {
      actions.PlanIndexProj.save({ currentData: data });
    }
  }
};
