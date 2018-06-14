
import React, { Component } from 'react';
import {Loading,Message, Table, Checkbox,Button,Popconfirm,Icon } from 'tinper-bee';
import {actions,routing} from 'mirrorx';
import EnhancedPagination from '../EnhancedPagination';
import {BpmButtonSubmit,BpmButtonRecall} from 'yyuap-bpm';
import './index.less';

const defaultPropsSelf = {
    prefixCls: "bee-table",
    multiSelect: {
      type: "checkbox",
      param: "key"
    }
}

const masterCols = [
    {
        title: "工单编码",
        dataIndex: "code",
        key: "code",
        width: 150
    },
    {
        title: "工单名称",
        dataIndex: "name",
        key: "name",
        width: 150
    },
    {
        title: "工单类型",
        dataIndex: "type",
        key: "type",
        width: 150,
    },
    {
        title: "申请人",
        dataIndex: "applicant",
        key: "applicant",
        width: 150,
    },
    {
        title: "申请时间",
        dataIndex: "applyTime",
        key: "applyTime",
        width: 150,
    },
    {
        title: "最后修改时间",
        dataIndex: "lastModifyUser",
        key: "lastModifyUser",
        width: 150,
    }
];

let isInitChecked = true;

//设置默认设置
Message.config({
    top: 20,  //顶上显示时距顶部的位置
    duration: 1, //显示持续时间
    width: 500, //左下左上右下右上显示时的宽度
    size:"large"
});

/*
    showLine为是否显示加载提示
*/

class TableWrapper extends Component {
    constructor(props) {
        super(props);
        this.state = {
            checkedAll: false,
            checkedArray: [],
            commitFlag:0,
            showLine:false
        };
    }
    
    componentWillReceiveProps = (nextProps)=>{
        let data = nextProps.data;
        let length = data ? data.length : 20;
        let checkedArray = []
        for (var i = 0; i < length; i++) {
            checkedArray.push(false);
        }
        this.setState({checkedArray:checkedArray});
        // actions.master.save({ checkedArray });
        
    }
    onAllCheckChange = () => {
        let self = this;
        let checkedArray = [];
        let listData = this.props.data.concat();
        let selIds = [];
        // let id = self.props.multiSelect.param;
        for (var i = 0; i < self.state.checkedArray.length; i++) {
            checkedArray[i] = !self.state.checkedAll;
        }
        self.setState({
            checkedAll: !self.state.checkedAll,
            checkedArray: checkedArray,
            // selIds: selIds
        });
        // self.props.onSelIds(selIds);
    };
    onCheckboxChange = (text, record, index) => {
        let self = this;
        let allFlag = false;
        // let selIds = self.state.selIds;
        // let id = self.props.postId;
        let checkedArray = self.state.checkedArray.concat();
        // if (self.state.checkedArray[index]) {
        // selIds.remove(record[id]);
        // } else {
        // selIds.push(record[id]);
        // }
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

    // 编辑修改
    onEdit=(text, record, index)=>{
        
        return ()=>{
            console.log("点击修改",record,index);
            let tempState = {
                "btnFlag":1,
                "rowData":record,
                // "showIndex":1
            }
            actions.master.save(tempState);
            actions.routing.push({
                pathname:'/bdm/bpmcard'
            })
        }
    }

    // 行删除
    onRowDel = (text, record, index)=>{
        return async ()=>{
            console.log("点击删除",record,index);
            this.setState({
                showLine:true
            },async ()=>{
                let {done,message} = await actions.master.remove([{"id":record["id"]}]);
                if(done){
                    this.setState({
                        showLine:false
                    })
                    Message.create({content: '单据删除成功', color: 'success'});
                }else {
                    Message.create({content: message, color: 'danger'});
                }
            })
            
            
            
        }
        
    }

    onLoad = ()=>{
        this.setState({
            showLine: true
        },async ()=>{
            // done表示是否加载完毕
            let {done} = await actions.master.load();
            if (done) {
                this.setState({
                    showLine: false
                }) 
            }
        })
    }

    renderColumnsMultiSelect(columns) {
        const { checkedArray } = this.state;
        const { multiSelect } = this.props;
        let select_column = {};
        let indeterminate_bool = false;
        // let indeterminate_bool1 = true;
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
            const operateCols = [
                {
                    title: "操作",
                    dataIndex: "operate",
                    key: "operate",
                    render:(text, record, index)=> {
                        return (
                            <div>
                                <span className="bcolor" onClick={this.onEdit(text, record, index)}>编辑</span>
                                {/* <span className="span-adjust" onClick={this.onRowDel(text, record, index)} >删除</span> */}
                                <Popconfirm content="确认删除?" id="aa" onClose={this.onRowDel(text, record, index)}>
                                    {/* <Icon type="uf-del" className="tablewrapper-delicon"/> */}
                                    <span className="span-adjust" >删除</span>
                                </Popconfirm>
                            </div>
                        );
                    }
                }
            ]
            columns = defaultColumns.concat(columns).concat(operateCols);
        }
        return columns;
    }

    // 添加数据
    onAdd = () => {
        console.log("添加数据");
        let tempState = {
            // "showIndex": 1 ,
            "btnFlag":0,
            "rowData":{}
        }
        actions.master.changePage(tempState);
        actions.routing.push({
            pathname:'/bdm/bpmcard'
        })
    }

    // 查看方法
    onCheck = ()=>{
        let {checkedArray} = this.state;
        let rowData,data=this.props.data;
        // 查看时检查是否已选中数据
        let checkedFlag = false;
        for(var i=0;i<checkedArray.length;i++){
            if(checkedArray[i]){
                checkedFlag = true;
                rowData = data[i];
                break;
            }
        }

        if(!checkedFlag){
            Message.create({content: '请选择查看的数据', color: 'warning', duration: 1});
            return;
        }else {
            let tempState = {
                // "showIndex":1,
                "btnFlag":2,
                "rowData":rowData
            }
            actions.master.save(tempState)
            actions.routing.push({
                pathname:'/bdm/bpmcard',
            })
        }
        
    }

    // 提交方法
    onCommit = async ()=>{
        
        let { checkedArray } = this.state;
        let data = this.props.data;
        console.log("data", data);
        let length = (data.length < checkedArray.length) ? data.length : checkedArray.length;
        let submitArray = [];
        for (var i = 0; i < checkedArray.length; i++) {
            if (checkedArray[i]) {
                if(data[i]["status"]==0){
                    submitArray.push({ "id": data[i]["id"] });
                }else {
                    Message.create({content: `单据${data[i]["code"]}不能重复提交`, color: 'warning', duration: null});
                }
                
                // submitArray.push(data[i]);
            }
        }
        console.log("submitArray", submitArray);

        if (submitArray.length > 0) {
            let tempState = {
                "funccode": "react",
                "nodekey": "003",
                "submitArray": submitArray
            }
            this.setState({
                showLine:true
            },async ()=>{
                let {done,message} = await actions.master.onCommit(tempState);
                if(done){
                    this.setState({
                        showLine:false
                    });
                    Message.create({content: '单据提交操作成功', color: 'success'});
                    
                }else {
                    this.setState({showLine:false});
                    Message.create({content: message, color: 'danger'});
                }
            })
            
        } else {
            // 弹出提示请选择数据
            Message.create({content: "请重新选择提交数据", color: 'warning'});
        }
        
    }

    // 撤回
    onRecall = async ()=>{
        let {checkedArray} = this.state;
        let data = this.props.data;
        console.log("data",data);
        let length = (data.length<checkedArray.length)?data.length:checkedArray.length;
        let recallArray = [];
        for(var i=0;i<checkedArray.length;i++){
            if(checkedArray[i]){
                if(data[i]["status"]==1){
                    recallArray.push({"id":data[i]["id"]});
                }else {
                    Message.create({content: `单据${data[i]["code"]}未提交,不能执行撤回操作`, color: 'warning'});
                } 
            }
        }
        console.log("撤回",recallArray);
        if(recallArray.length>0){
            this.setState({
                showLine:true
            },async ()=>{
                let {done,message} = await actions.master.onRecall(recallArray);
                if(done){
                    this.setState({
                        showLine:false
                    })
                    Message.create({content: '单据收回操作成功', color: 'success'});
                    
                }else {
                    Message.create({content: message, color: 'danger'});
                }
            }) 
        }else {
            // 弹出提示请选择数据
            Message.create({content: '请选择收回数据', color: 'warning'});
        }
    }

    // 多行删除
    onMultiDel= async ()=>{
        let {checkedArray} = this.state;
        let data = this.props.data;
        console.log("data",data);
        let length = (data.length<checkedArray.length)?data.length:checkedArray.length;
        let delArray = [];
        for(var i=0;i<checkedArray.length;i++){
            if(checkedArray[i]){
                delArray.push({"id":data[i]["id"]});
            }
        }
        console.log("delArray",delArray);
        if(delArray.length>0){
            this.setState({
                showLine:true
            },async ()=>{
                let {done} = await actions.master.remove(delArray);
                if(done){
                    this.setState({
                        showLine:false
                    });
                    Message.create({content: '单据删除成功', color: 'success'});
                }
            })    
                

        }else {
            // 弹出提示请选择数据
            Message.create({content: '请选择删除数据', color: 'warning'});
        }
        
    }

    onRowDoubleClick=(record, index, event)=>{
        console.log("双击",record,event);
        let tempState = {
            "btnFlag":2,
            "rowData":record
        }
        actions.master.save(tempState)
        actions.routing.push({
            pathname:'/bdm/bpmcard',
        })
    }

    onSubmitSuc = async ()=>{
        let {done} = await actions.master.load();
        if(done){
            this.setState({showLine:false }) 
        }
    }
    // 提交成功失败回调
    onSubmitStart = ()=>{
        this.setState({showLine:true});
    }

    onSubmitFail = ()=>{
        this.setState({showLine:false});
    }

    // 撤回成功，失败，开始回调函数
    onRecallSuc = async ()=>{
        let {done} = await actions.master.load();
        if(done){
            this.setState({showLine:false }) 
        }
    }
    onRecallFail = ()=>{
        this.setState({showLine:false});
    }
    onRecallStart = ()=>{
        this.setState({showLine:true});
    }


    render() {
        let columns = this.renderColumnsMultiSelect(masterCols);
        let {data} = this.props,
            {checkedArray} = this.state;
        console.log("选中数组",data,checkedArray);
        let submitParam = {
            data:data,
            checkedArray:checkedArray,
            funccode: "react",
            nodekey: "003",
            url:"/iuap-example/example_workorder/submit",
        }
        return (
            <div>
                <div style={{ margin:" 6px 15px 0 15px" }}>
                    <Button className="editable-add-btn" size="sm" colors="primary" onClick={this.onAdd} style={{ marginLeft: "5px" }} >新增</Button>
                    <Button className="editable-add-btn" size="sm" colors="primary" onClick={this.onCheck} style={{ marginLeft: "5px" }} >查看</Button>
                    {/* <Button className="editable-add-btn" size="sm" colors="primary" onClick={this.onCommit} style={{ marginLeft: "5px" }}>提交</Button> */}
                    <BpmButtonSubmit 
                        className="editable-add-btn ml5"
                        data = {data}
                        checkedArray = {checkedArray}
                        funccode = "react"
                        nodekey = "003"
                        url = "/iuap-example/example_workorder/submit"
                        onSuccess = {this.onSubmitSuc}
                        onError = {this.onSubmitFail}
                        onStart={this.onSubmitStart}
                    />
                    {/* <Button className="editable-add-btn" size="sm" colors="primary" onClick={this.onRecall} style={{ marginLeft: "5px" }}>收回</Button> */}
                    <BpmButtonRecall 
                        className="editable-add-btn ml5"
                        data = {data}
                        checkedArray = {checkedArray}
                        url = "/iuap-example/example_workorder/recall"
                        onSuccess = {this.onRecallSuc}
                        onError = {this.onRecallFail}
                        onStart = {this.onRecallStart}
                    />
                    <Button className="editable-add-btn" size="sm" colors="primary" onClick={this.onMultiDel} style={{ marginLeft: "5px" }}>删除</Button>
                </div>
                <Table 
                    columns={columns} 
                    data={data} 
                    rowKey={(record)=>record.id}
                    onRowDoubleClick={this.onRowDoubleClick}
                />
                <Loading
                    fullScreen
                    showBackDrop={true}
                    loadingType="line"
                    show={this.state.showLine}
                />
            </div>
        )
        
    }

    
}

TableWrapper.defaultProps = defaultPropsSelf;

export default TableWrapper;