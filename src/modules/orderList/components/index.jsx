import React, { Component } from "react";
import ReactDOM from 'react-dom';
import { actions } from "mirrorx";
import { Table, Button, Col, Row, Icon, InputGroup, FormControl, Checkbox, Modal, Panel, PanelGroup, Label, Message, Select } from "tinper-bee";
import Form from 'bee-form';
import Pagination from 'bee-pagination';
import '../../../../node_modules/bee-pagination/build/Pagination.css';
import Header from "components/Header";
import multiSelect from "tinper-bee/lib/multiSelect.js";
import './index.less';
const MultiSelectTable = multiSelect(Table, Checkbox);
const FormItem=Form.FormItem;


class orderList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectData:[]
        }
    }
    search = () => {//查询
        actions.orderList.load(
          {
            searchName: decodeURIComponent(this.props.form.getFieldValue('searchName')),
            searchCode: decodeURIComponent(this.props.form.getFieldValue('searchCode')),
          }
        )
    }
    reset = ()=>{
        this.props.form.setFieldsValue({
            searchCode:'',
            searchName:''
        })
    }
    tabelSelect = (data) => {//tabel选中数据
        this.setState({
          selectData: data
        })
    }
    componentDidMount(){

    }
    // 多选表格包装函数  开始
    onAllCheckChange = () => {//全选
        let self = this;
        let checkedArray = [];
        let listData = props.listData.concat();
        let selIds = [];
        for (var i = 0; i < self.state.checkedArray.length; i++) {
            checkedArray[i] = !self.state.checkedAll;
        }
        self.setState({
            checkedAll: !self.state.checkedAll,
            checkedArray: checkedArray,
        });
    };
    onCheckboxChange = (text, record, index) => {
        let self = this;
        let allFlag = false;
        let checkedArray = self.state.checkedArray.concat();
        checkedArray[index] = !self.state.checkedArray[index];
        for (var i = 0; i < self.state.checkedArray.length; i++) {
            if (!checkedArray[i]) {
                allFlag = false;
                break;
            } else {
                allFlag = true;
            }
        }
        self.setState({
            checkedAll: allFlag,
            checkedArray: checkedArray,
        });
    };
    renderColumnsMultiSelect(columns) {
        const { data, checkedArray } = this.state;
        const { multiSelect } = this.props;
        let select_column = {};
        let indeterminate_bool = false;
        if (multiSelect && multiSelect.type === "checkbox") {
            let i = checkedArray.length;
            while (i--) {
                if (checkedArray[i]) {
                    indeterminate_bool = true;
                    break;
                }
            }
            let defaultColumns = [
                {
                    title: (
                        <Checkbox
                            className="table-checkbox"
                            checked={this.state.checkedAll}
                            indeterminate={indeterminate_bool && !this.state.checkedAll}
                            onChange={this.onAllCheckChange}
                        />
                    ),
                    key: "checkbox",
                    dataIndex: "checkbox",
                    width: "5%",
                    render: (text, record, index) => {
                        return (
                            <Checkbox
                                className="table-checkbox"
                                checked={this.state.checkedArray[index]}
                                onChange={this.onCheckboxChange.bind(this, text, record, index)}
                            />
                        );
                    }
                }
            ];
            columns = defaultColumns.concat(columns);
        }
        return columns;
    }
    // 多选表格包装函数  结束
    onPageSelect =(value)=>{
        actions.orderList.load({
            pageIndex:value-1,
            searchName: decodeURIComponent(this.props.form.getFieldValue('searchName')),
            searchCode: decodeURIComponent(this.props.form.getFieldValue('searchCode')),
        })
    }
    dataNumSelect =(value)=>{
        let pageSize=(value+1)*5;//针对于5条/10条/15条/20条选项
        actions.orderList.load({
            pageSize:pageSize,
            pageIndex:0,
            searchName: decodeURIComponent(this.props.form.getFieldValue('searchName')),
            searchCode: decodeURIComponent(this.props.form.getFieldValue('searchCode')),
        })
    }
    render() {
        const self = this;
        const column = [
            {
                title: "订单编号",
                dataIndex: "orderCode",
                key: "orderCode",
                width: 100
            },
            {
                title: "订单名称",
                dataIndex: "orderName",
                key: "orderName",
                width: 100
            },
            {
                title: "客户",
                dataIndex: "customer",
                key: "customer",
                width: 200
            },
            {
                title: "业务员",
                dataIndex: "busiman",
                key: "busiman",
            },
            {
                title: "所属单位",
                dataIndex: "dept",
                key: "dept",
            },
            {
                title: "订单状态",
                dataIndex: "orderState",
                key: "orderState",
            },
        ];
        let {form,list,pageSize,pageActive,totalPages}=this.props;
        const { getFieldProps, getFieldError } =form;
        let columns = this.renderColumnsMultiSelect(column);
        return (
            <div className='order-list'>
                <Header title='订单管理' />
                <PanelGroup accordion>
                    <Panel header="查询与筛选" eventKey="1">
                        <Row className="search-panel">
                            <Col md={1} xs={2}>
                                <Label>编码：</Label>
                            </Col>
                            <Col md={2} xs={4}>
                                <FormControl
                                    placeholder="请输入编码"
                                    ref='searchCode'
                                    {
                                        ...getFieldProps('searchCode', {
                                            initialValue: '',
                                        }
                                    ) }
                                />
                            </Col>

                            <Col md={1} xs={2}>
                                <Label>名称：</Label>
                            </Col>
                            <Col md={2} xs={4}>
                                    <FormControl
                                        placeholder="请输入名称"
                                        ref='searchName'
                                        {
                                            ...getFieldProps('searchName', {
                                                initialValue: '',
                                            }
                                        ) }
                                    />
                            </Col>


                            <Col md={3} xs={6}>
                                <Button
                                    colors="primary"
                                    onClick={this.search}
                                >查询
                                </Button>
                                <Button
                                    style={{ marginLeft: "10px" }}
                                    onClick={this.rest}
                                >
                                    重置
                                </Button>
                            </Col>
                        </Row>
                    </Panel>
                </PanelGroup>
                <MultiSelectTable
                    columns={columns}
                    data={list}
                    multiSelect={{ type: "checkbox" }}
                    getSelectedDataFunc={this.tabelSelect}
                />
                <Pagination
                    boundaryLinks
                    items={totalPages}
                    activePage={pageActive}
                    onDataNumSelect={this.dataNumSelect}
                    onSelect={this.onPageSelect}
                    showJump={true}
                />
            </div>
        )
    }
}

export default Form.createForm()(orderList);
