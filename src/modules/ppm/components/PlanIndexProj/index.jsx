import React, { Component } from "react";
import TreeModule from "../treemodule/treemodule";
import TreeTableModule from "../treetable/treetablemodule";
import { actions } from "mirrorx";
import "./index.less";

class PlanIndexProj extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    actions.PlanIndexProj.load()
    // actions.PlanIndexProj.load();
  }

  componentDidMount() {}

  componentWillReceiveProps(nextProps) {}

  render() {
    return (
      <div className="clearfix tree_content">
        <TreeModule />
        <TreeTableModule />
      </div>
    );
  }
}

PlanIndexProj.propTypes = {};

export default PlanIndexProj;
