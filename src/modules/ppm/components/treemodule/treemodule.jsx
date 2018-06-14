import React, { Component } from "react";
import { actions, connect } from "mirrorx";
import PropTypes from "prop-types";
import TreeForm from "../treeform/treeform";
import { Table, Button, Col, Row, Tree, FormControl, Modal } from "tinper-bee";
const TreeNode = Tree.TreeNode;
const setTreeData = data => {
  let parentArr = [];
  if (Array.isArray(data) && data.length) {
    data.map(item => {
      if (!item.parent_id) {
        parentArr.push(item);
        item.children = [];
      }
      parentArr.map(iitem => {
        if (iitem.institid == item.parent_id) {
          iitem.children.push(item);
        }
      });
    });
    return parentArr;
  }
};
const loop = data =>
  data.map(item => {
    if (item.children) {
      return (
        <TreeNode key={item.institid} title={item.instit_name}>
          {loop(item.children)}
        </TreeNode>
      );
    } else {
      return <TreeNode key={item.institid} title={item.instit_name} />;
    }
  });
class TreeModule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false
    };
  }

  componentWillMount() {}

  componentDidMount() {}

  componentWillReceiveProps(nextProps) {}
  // 选择树节点
  onSelectTree(info) {
    actions.PlanIndexProj.onTreeClick(info);
    actions.PlanIndexProj.getTable(
      `?pageIndex=0&pageSize=5&sortField=peocode&sortDirection=asc&institid=${info}`
    );
  }
  onAddTable = () => {
    actions.PlanIndexProj.showModul(true);
  };
  render() {
    let { treeData } = this.props;
    treeData.length ? (treeData = setTreeData(treeData)) : treeData;
    return (
      <Col md={4} xs={4} sm={4}>
        <Col md={4} xs={4} sm={4}>
          <span className="tree_heard"> 组织结构</span>
        </Col>
        <Col md={8} xs={8} sm={8}>
          <Button colors="primary" onClick={this.onAddTable}>
            增加
          </Button>
          <Button colors="primary">修改</Button>
          <Button colors="danger">删除</Button>
        </Col>
        <Col md={12} xs={12} sm={12}>
          <Tree className="myCls" showLine onSelect={this.onSelectTree}>
            {treeData ? loop(treeData) : ""}
          </Tree>
        </Col>
        <TreeForm />
      </Col>
    );
  }
}

TreeModule.propTypes = {};

export default connect(state => state.PlanIndexProj)(TreeModule);
