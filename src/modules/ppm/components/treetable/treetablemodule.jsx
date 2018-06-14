import React, { Component } from "react";
import PropTypes from "prop-types";
import Form from "bee-form";
import {
  Table,
  Button,
  Col,
  Row,
  Modal,
  FormControl,
  Pagination
} from "tinper-bee";
import { connect } from "mirrorx";
const columns = [
  {
    title: "姓名",
    dataIndex: "peoname",
    key: "peoname"
  },
  {
    title: "员工编号",
    dataIndex: "peocode",
    key: "peocode"
  },
  {
    title: "所属机构",
    dataIndex: "institname",
    key: "institname",
    sorter: (a, b) => a.c - b.c
  },
  {
    title: "办公电话",
    dataIndex: "worktel",
    key: "worktel"
  },
  {
    title: "电子邮箱",
    dataIndex: "email",
    key: "email"
  },
  {
    title: "操作",
    dataIndex: "f",
    key: "f",
    render(text, record, index) {
      return (
        <div style={{ position: "relative" }} title={text}>
          <Button colors="primary">修改</Button>
          <Button colors="danger">删除</Button>
        </div>
      );
    }
  }
];
class TreeTableModule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activePage: 0
    };
  }

  componentWillMount() {}

  componentDidMount() {}

  componentWillReceiveProps(nextProps) {}
  //分页
  handleSelect = e => {};
  dataNumSelect = e => {};
  render() {
    return (
      <div>
        <Col md={8} xs={8} sm={8}>
          <Col md={4} xs={4} sm={4}>
            <Button colors="primary">新增人员</Button>
          </Col>
          <Col md={4} xs={4} sm={4}>
            {this.props.currentNode}
          </Col>
          <Col md={4} xs={4} sm={4}>
            <FormControl
              className="demo5-input"
              onSearch={this.onSearch}
              type="search"
            />
          </Col>
          <div>
            <Col md={12} xs={12} sm={12}>
              <Table
                columns={columns}
                data={this.props.tableData}
                rowKey={recode => recode.id}
              />
            </Col>
            <Col md={12} xs={12} sm={12}>
              <Pagination
                first
                last
                prev
                next
                boundaryLinks
                items={this.props.totalPages}
                maxButtons={5}
                onSelect={this.handleSelect.bind(this)}
              />
            </Col>
          </div>
        </Col>
      </div>
    );
  }
}

TreeTableModule.propTypes = {};

export default connect(state => state.PlanIndexProj)(TreeTableModule);
