import React, { Component } from "react";
import { actions, connect } from "mirrorx";
import PropTypes from "prop-types";
import { FormControl, Label, Col, Modal, Button } from "tinper-bee";
import Form from "bee-form";
import "./treeform.less";
const FormItem = Form.FormItem;
class TreeForm extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {}

  componentDidMount() {}

  componentWillReceiveProps(nextProps) {}
  // 新增提交
  submit = () => {
    this.props.form.validateFields((error, value) => {
      if (!error) {
        value.institid = null;
        console.log(this.props.currentId)
        value.parent_id = this.props.currentId[0];
        actions.PlanIndexProj.addTreeData([value]);
        actions.PlanIndexProj.onTreeSelect(value);
      }
    });
  };
  //新增树节点
  onAddTable = () => {};
  // 关闭新增
  onAddClose = () => {
    actions.PlanIndexProj.showModul(false);
  };
  render() {
    const { getFieldProps, getFieldError } = this.props.form;
    return (
      <div className="tree_form">
        <Modal show={this.props.showModul} onHide={this.onAddClose}>
          <Modal.Header>
            <Modal.Title>{this.props.showText}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Col md={6} xs={6} sm={6}>
                <Col md={4} xs={4} sm={4}>
                  <Label>编码:</Label>
                </Col>
                <Col md={8} xs={8} sm={8}>
                  <FormControl
                    initialValue=""
                    placeholder="编码"
                    {...getFieldProps("instit_code", {
                      validateTrigger: "onBlur",
                      initialValue: "",
                      rules: [
                        {
                          required: true,
                          message: "请输入编码"
                        }
                      ]
                    })}
                  />
                  <span className="error">{getFieldError("instit_code")}</span>
                </Col>
              </Col>
              <Col md={6} xs={6} sm={6}>
                <Col md={4} xs={4} sm={4}>
                  <Label>组织名称:</Label>
                </Col>
                <Col md={8} xs={8} sm={8}>
                  <FormControl
                    placeholder="组织名称"
                    {...getFieldProps("instit_name", {
                      validateTrigger: "onBlur",
                      initialValue: "",
                      rules: [
                        {
                          required: true,
                          message: "请输入组织名称"
                        }
                      ]
                    })}
                  />
                  <span className="error">{getFieldError("instit_code")}</span>
                </Col>
              </Col>
              <Col md={6} xs={6} sm={6}>
                <Col md={4} xs={4} sm={4}>
                  <Label>上级:</Label>
                </Col>
                <Col md={8} xs={8} sm={8}>
                  <FormControl
                    placeholder="上级"
                    {...getFieldProps("parent_id", {
                      validateTrigger: "onBlur",
                      initialValue: "",
                      rules: [
                        {
                          required: false,
                          message: "请输入组织名称"
                        }
                      ]
                    })}
                  />
                  <span className="error">{getFieldError("parent_id")}</span>
                </Col>
              </Col>
              <Col md={6} xs={6} sm={6}>
                <Col md={4} xs={4} sm={4}>
                  <Label>名称缩写:</Label>
                </Col>
                <Col md={8} xs={8} sm={8}>
                  <FormControl
                    placeholder="名称缩写"
                    {...getFieldProps("short_name", {
                      validateTrigger: "onBlur",
                      initialValue: "",
                      rules: [
                        {
                          required: false,
                          message: "请输入组织名称"
                        }
                      ]
                    })}
                  />
                  <span className="error">{getFieldError("short_name")}</span>
                </Col>
              </Col>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button
              onClick={this.onAddClose}
              shape="border"
              style={{ marginRight: 10 }}
            >
              关闭
            </Button>
            <Button onClick={this.submit} colors="primary">
              确认
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

TreeForm.propTypes = {};

export default connect(state => state.PlanIndexProj)(
  Form.createForm()(TreeForm)
);
