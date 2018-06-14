import React, { Component } from "react";
import ReactDOM from 'react-dom';
import { actions } from "mirrorx";
import {
  Table,
  Button,
  Col,
  Row,
  Icon,
  InputGroup,
  FormControl,
  Checkbox,
  Modal,
  Panel,
  PanelGroup,
  Label,
  Message,
  Select
} from "tinper-bee";
import Pagination from 'bee-pagination';
import '../../../../../node_modules/bee-pagination/build/Pagination.css';
import Header from "components/Header";
import multiSelect from "tinper-bee/lib/multiSelect.js";
import './index.less';


const MultiSelectTable = multiSelect(Table, Checkbox);


class OprtParamConfig extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchCode: '',
      searchName:'',
      pagetotalSize: 10,
      pageActivePage: 1,
      open: false,
      orderState:'',
      checkedAll: false,
      checkedArray: [],
      selectData: [],
      delModalShow: false,
      delObj: {}
    }
  }

  componentDidMount() {
    let listData=this.props.listData;
    if(listData){
      this.setState({
        pagetotalSize:listData.totalPages,
        pageActivePage:listData.number
      })
    }
  }
  onHandChange = () => {//输入框编辑
    this.setState({
      searchCode: ReactDOM.findDOMNode(this.refs.searchCode).value,
      searchName: ReactDOM.findDOMNode(this.refs.searchName).value
      })
  }

  search = () => {//查询
    actions.oprtparamconfig.load(
      {
        pageActivePage: 0,
        pagetotalSize: this.state.pagetotalSize||10,
        searchName: decodeURIComponent(this.state.searchName),
        searchCode: this.state.searchCode
      }
    )
  }
  tableRowClick = (record, index, indent) => {//行点击

  }
  pageSizeChange = () => {//

  }
  pageIndexChange = () => {

  }
  onPageSelect = (pageIndex) => {
    this.setState({
      pageActivePage: pageIndex
    });
    actions.oprtparamconfig.load({
      pageActivePage: pageIndex - 1,
      pagetotalSize: this.state.pagetotalSize,
      searchName: this.state.searchName,
      searchCode: this.state.searchCode
    });
  }
  rest = () => {//重置
    this.setState({
      searchCode: '',
      searchName: ''
    })
    ReactDOM.findDOMNode(this.refs.searchCode).value = '';
    ReactDOM.findDOMNode(this.refs.searchName).value = '';
  }
  tabelSelect = (data) => {//tabel选中数据
    this.setState({
      selectData: data
    })
  }

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

  addClick = () => {//新增
    actions.routing.push({
      pathname: "oprtparamconfig/add",
      search: "?type=add"
    });
  }
  editClick = (record) => {//编辑
    actions.routing.push({
      pathname: "oprtparamconfig/add",
      search: "?type=edit",
      state: record
    });
  }

  delClick = (record) => {//删除
    console.log(record);
    this.setState({
      delModalShow: true,
      delObj: record
    })
  }

  delModalHide = () => {
    this.setState({
      delModalShow: false
    })
  }
  delData = () => {
    if (this.state.delObj) {
      actions.oprtparamconfig.del([this.state.delObj.id]);
    } else {alert('betch')
      let delAry=[];
      let selectData=this.state.selectData;
      selectData.forEach((item,index)=>{
        delAry.push(item.id)
      })
      actions.oprtparamconfig.batchDel(delAry);
    }
    this.setState({
      delModalShow: false,
      delObj: {}
    })
  }

  batchDel = () => {//批量删除
    if (this.state.selectData.length <= 0) {
      return Message.create({ content: '请至少选择一条数据', color: 'warning', duration: 2 });
    }
    this.setState({
      delObj: '',
      delModalShow: true
    })
  }

  onStartChange = (value) => {
    this.setState({
        startValue: value[0],
        startOpen: false,
        endOpen: true,
    });
}

remove=()=> {
    this.setState({value: ''})
}

onChange =(d) =>{
    this.setState({
        value:d,
    })
}
onSelect =()=>{

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
        title: "操作",
        dataIndex: "e",
        key: "e",
        render(text, record, index) {
          return (
            <div>
              <Button colors="primary" style={{ 'marginRight': '10px' }} onClick={() => { self.editClick(record) }}>
                修改
              </Button>
              <Button colors="primary" onClick={() => { self.delClick(record) }}>
                删除
              </Button>
            </div>
          )
        }
      },
    ];
    let columns = this.renderColumnsMultiSelect(column);

    const props = this.props;
    return (
      <div className="oprt">
        <Header title='订单管理' />
        <PanelGroup accordion>
          <Panel header="查询与筛选" eventKey="1">
            <Row className="search-panel">
              <Col md={1} xs={2}>
                <Label>
                  编码：
                </Label>
              </Col>
              <Col md={2} xs={4}>
                <FormControl
                  placeholder="请输入编码"
                  ref='searchCode'
                  onChange={this.onHandChange}
                />
              </Col>

              <Col md={1} xs={2}>
                <Label>
                  名称：
                </Label>
              </Col>
              <Col md={2} xs={4}>
              <FormControl
                  placeholder="请输入名称"
                  ref='searchName'
                  onChange={this.onHandChange}
                />
              </Col>


              <Col md={3} xs={6}>
                <Button
                  colors="primary"
                  onClick={this.search}
                >
                  查询
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

        <div className="header-btn">
          <Button
            colors="primary"
            style={{ 'marginRight': '10px' }}
            onClick={this.addClick}
          >
            新增
          </Button>
          <Button
            colors="primary"
            onClick={this.batchDel}>
            删除
          </Button>

        </div>
        <MultiSelectTable
          columns={columns}
          data={props.listData.content||[]}
          multiSelect={{ type: "checkbox" }}
          getSelectedDataFunc={this.tabelSelect}
        />
        <Pagination
          boundaryLinks
          items={this.state.pagetotalSize}
          activePage={this.state.pageActivePage}
          onSelect={this.onPageSelect}
          showJump={true}
        />
        {/* <Pagination
          onSelect={this.onPageSelect}
          items={this.state.pagetotalSize}
          activePage={this.state.pageActivePage}
        /> */}

        <Modal show={this.state.delModalShow} onHide={this.delModalHide} >
          <Modal.Header>
            <Modal.Title>操作</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            确认删除么？
                    </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.delModalHide} style={{ 'marginRight': '10px' }}>取消</Button>
            <Button onClick={this.delData} colors="primary">确认</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}
export default OprtParamConfig;
