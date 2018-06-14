import React, { Component } from "react";
import { actions } from "mirrorx";
import {
  Table,
  Button,
  InputGroup,
  FormControl,
  Select,
  DatePicker,
  Switch,
  Modal,
  Icon,
  Row,
  Col,
  Label,
  Input,
  Tooltip,
  Animate,
  Popconfirm
} from "tinper-bee";
import Form from 'bee-form';
import Header from "components/Header";
import EditableCell from './EditableCell';
import RefControl from "components/RefControl";
import createModal from "yyuap-ref";
import DeleteModal from "components/DeleteModal";
import commonref from "utils/commonref";
import docInfo from "utils/docInfo";
import './oprtParamConfigAdd.less';
const FormItem = Form.FormItem;

class AlertConfigAdd extends Component {
  constructor(props) {
    super(props);
    this.state={
      dataSource: [
        {
          key: "0",
          name: "沉鱼",
          age: "18",
          address: "96, 77, 89"
        },
        {
          key: "1",
          name: "落雁",
          age: "16",
          address: "90, 70, 80"
        },
        {
          key: "2",
          name: "闭月",
          age: "17",
          address: "80, 60, 80"
        },
        {
          key: "3",
          name: "羞花",
          age: "20",
          address: "120, 60, 90"
        }
      ],
      count:4
    }
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (err) {
        console.log('校验失败', values);
      } else {
        console.log('修改成功', values);
      }
    });
    // actions.oprtparamconfig.handleSubmit
  }

  commonrefFun = params => {
    var option = commonref(params);
    createModal(option);
  };

  onCellChange = (index, key) => {
    return value => {
      const dataSource = [...this.state.dataSource];
      dataSource[index][key] = value;
      this.setState({ dataSource });
    };
  };
  onDelete = index => {
    return () => {
      const dataSource = [...this.state.dataSource];
      dataSource.splice(index, 1);
      this.setState({ dataSource });
    };
  };
  handleAdd = () => {
    const { count, dataSource } = this.state;
    const newData = {
      key: count,
      name: `凤姐 ${count}`,
      age: 32,
      address: `100 100 100`
    };
    this.setState({
      dataSource: [...dataSource, newData],
      count: count + 1
    });
  };

  getBodyWrapper = body => {
    return (
      <Animate
        transitionName="move"
        component="tbody"
        className={body.props.className}
      >
        {body.props.children}
      </Animate>
    );
  };


  render() {
    const props = this.props;
    const columns = [
      {
        title: "姓名",
        dataIndex: "name",
        key: "name",
        width: "30%",
        render: (text, record, index) => (
          <EditableCell
            value={text}
          />
        )
      },
      {
        title: "年龄",
        dataIndex: "age",
        key: "age"
      },
      {
        title: "你懂的",
        dataIndex: "address",
        key: "address"
      },
      {
        title: "操作",
        dataIndex: "operation",
        key: "operation",
        render: (text, record, index) => {
          return this.state.dataSource.length > 1 ? (
            <Popconfirm content="确认删除?" id="aa" onClose={this.onDelete(index)}>
              <Icon type="uf-del" />
            </Popconfirm>
          ) : null;
        }
      }
    ];
    let commonrefFun = params => {
      var option = commonref(params);
      createModal(option);
    };
    const BodyRefcallback = (ref, param) => {
      actions.oprtparamconfig.bodyRefAction({
        ref: ref,
        index: param.index,
        flag: param.flag
      });
    };
    const HeadRefcallback = (ref, param) => {
      actions.oprtparamconfig.headRefAction({ ref, param });
    };
    let bodyValueChange = (type, value, record) => {
      let data = { type, value, record };
      actions.oprtparamconfig.handleBodyChange(data);
    };
    const { getFieldProps, getFieldError } = this.props.form;
    return (
      <div className="oprt-add">
        <Header title='订单管理' back={true}>
          <Button
            colors="primary"
            onClick={this.handleSubmit}
          >
            保存
          </Button>
        </Header>

        <Form className="oprt-form">
          <Row>
          <Col md={4} sm={6}>
              <Col md={3} sm={6}>
                <Label> <span className="u-mast">*</span>订单编号：</Label>
              </Col>
              <Col md={9} sm={6}>
                <FormItem>
                  <FormControl 
                    {...getFieldProps('orderCode', {
                    })} />
                </FormItem>
              </Col>
            </Col>
            <Col md={4} sm={6}>
              <Col md={3} sm={6}>
                <Label><span className="u-mast">*</span>订单名称：</Label>
              </Col>
              <Col md={9} sm={6}>
                <FormItem>
                  <FormControl placeholder="订单名称" 
                    {...getFieldProps('orderName', {
                      initialValue: props.orderName,
                    })} />
                  <span className='error'>
                    {getFieldError('orderName')}
                  </span>
                </FormItem>
              </Col>
            </Col>


            <Col md={4} sm={6}>
              <Col md={3} sm={6}>
                <Label>订单日期：</Label>
              </Col>
              <Col md={9} sm={6}>
                    
              <FormItem>
                <FormControl placeholder="订单日期" 
                    {...getFieldProps('orderDate', {
                      initialValue: props.orderDate,
                    })} />
                  <span className='error'>
                    {getFieldError('orderDate')}
                  </span>
                </FormItem>
              </Col>
            </Col>
            

            <Col md={4} sm={6}>
              <Col md={3} sm={6}>
                <Label><span className="u-mast">*</span>客户名称：</Label>
              </Col>
              <Col md={9} sm={6}>
                <FormItem>
                  <FormControl placeholder="客户名称" 
                    {...getFieldProps('customer', {
                      initialValue: props.customer,
                    })} />
                  <span className='error'>
                    {getFieldError('customer')}
                  </span>
                </FormItem>
              </Col>
            </Col>
            <Col md={4} sm={6}>
              <Col md={3} sm={6}>
                <Label>所属组织：</Label>
              </Col>
              <Col md={9} sm={6}>
                <FormItem>
                <RefControl
                  name="depta" 
                  placeholder="所属组织"
                  {...getFieldProps('depta', {
                    initialValue: props.depta,
                  })}
                  onSearch={() =>
                    commonrefFun({
                      title: "组织",
                      refType: 1,
                      isRadio: true,
                      hasPage: true,
                      refCode: "commontree",
                      callback: HeadRefcallback,
                      fieldName: { key: "pk_workshop" },
                      queryparams: { ...docInfo("dept"), condition: { dr: "0" } }
                    })
                  }
                />


                  {/* <FormControl placeholder="所属组织" 
                    {...getFieldProps('depta', {
                      initialValue: props.depta,
                    })} /> */}
                  <span className='error'>
                    {getFieldError('depta')}
                  </span>
                </FormItem>
              </Col>
            </Col>



            <Col md={4} sm={6}>
              <Col md={3} sm={6}>
                <Label>业务负责人：</Label>
              </Col>
              <Col md={9} sm={6}>
                <FormItem>
                  <FormControl placeholder="业务负责人" 
                    {...getFieldProps('busiman', {
                      initialValue: props.busiman,
                    })} />
                  <span className='error'>
                    {getFieldError('busiman')}
                  </span>
                </FormItem>
              </Col>
            </Col>
            <Col md={4} sm={6}>
              <Col md={3} sm={6}>
                <Label>订单状态：</Label>
              </Col>
              <Col md={9} sm={6}>
                <FormItem>
                <Select {
                      ...getFieldProps('orderState', {
                          initialValue: props.orderState,
                      }
                      ) }>
                    <Option value="">请选择</Option>
                    <Option value="nowOrder">新订单</Option>
                    <Option value="finished">已完成</Option>
                    <Option value="canceled">已取消</Option>
                </Select>
                  <span className='error'>
                    {getFieldError('orderState')}
                  </span>
                </FormItem>
              </Col>
            </Col>
            <Col md={4} sm={6}>
              <Col md={3} sm={6}>
                <Label>订单总金额：</Label>
              </Col>
              <Col md={9} sm={6}>
                <FormItem>
                  <FormControl placeholder="订单总金额" 
                    {...getFieldProps('amount', {
                      initialValue: props.amount,
                    })} />
                  <span className='error'>
                    {getFieldError('amount')}
                  </span>
                </FormItem>
              </Col>
            </Col>
            <Col md={4} sm={6}>
              <Col md={3} sm={6}>
                <Label>币种：</Label>
              </Col>
              <Col md={9} sm={6}>
                <FormItem>
                  <FormControl placeholder="币种" 
                    {...getFieldProps('currency', {
                      initialValue: props.currency,
                    })} />
                  <span className='error'>
                    {getFieldError('currency')}
                  </span>
                </FormItem>
              </Col>
            </Col>
            <Col md={4} sm={6}>
              <Col md={3} sm={6}>
                <Label>备注：</Label>
              </Col>
              <Col md={9} sm={6}>
                <FormItem>
                  <FormControl placeholder="备注" 
                    {...getFieldProps('remark', {
                      initialValue: props.remark,
                    })} />
                  <span className='error'>
                    {getFieldError('remark')}
                  </span>
                </FormItem>
              </Col>
            </Col>

          </Row>
          
        </Form>


        <div className="me-header">
          <div className="header-btn">
            <Button
              colors="primary"
              className="header-btn-item"
              onClick={this.handleAdd}
            >
              增行
            </Button>
          </div>
        </div>
        <div>
        <Table
          data={this.state.dataSource}
          columns={columns}
          getBodyWrapper={this.getBodyWrapper}
        />
      </div>
        <DeleteModal
          showDelModal={props.addShowDeleteModal}
          content="确定要删除吗"
          closeDelModal={actions.oprtparamconfig.addHandleDelCancel}
          delData={actions.oprtparamconfig.addHandleDelConfirm}
        />
        <Modal
          show={props.showSaveModel}
          style={{ width: 500 }}
          className="modal-style"
          onHide={actions.oprtparamconfig.closeSaveModal}
        >
          <Modal.Header className="u-modal-header" closeButton>
            <Modal.Title>确认取消</Modal.Title>
          </Modal.Header>

          <Modal.Body className="u-modal-body">
            <Icon type="uf-exc-t-o" />
            确认取消吗
          </Modal.Body>

          <Modal.Footer
            className="u-modal-footer "
            style={{ background: "white" }}
          >
            <Button
              colors="primary"
              className="btn-ok"
              onClick={actions.oprtparamconfig.leaveSave}
            >
              确认
            </Button>
            <Button
              className="btn-cancel"
              onClick={actions.oprtparamconfig.closeSaveModal}
            >
              取消
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}


export default Form.createForm()(AlertConfigAdd);
