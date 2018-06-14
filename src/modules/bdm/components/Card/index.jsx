import React, { Component } from 'react';
import {Loading,Message,Button,FormControl,Label,Checkbox,InputNumber,Input,Col, Row,Icon,Select} from 'tinper-bee';
import { BpmTaskApprovalWrap } from 'yyuap-bpm';
import Form from 'bee-form';
import { actions } from 'mirrorx';
import createModal from 'yyuap-ref';
import DatePicker from 'bee-datepicker';
import "bee-datepicker/build/DatePicker.css";
import zhCN from "rc-calendar/lib/locale/zh_CN";
import moment from "moment";
import ChildTable from '../AddChildTable';
const format = 'YYYY-MM-DD HH:mm:ss';

const dateInputPlaceholder = "选择日期";
import './index.less'

const Option = Select.Option;
const FormItem = Form.FormItem;

const fieldArray = ["code","name","type","content","status","applicant","applyTime","remark"]
function onChange(d){
    console.log(d);
}

function disabledDate(current){
    return current && current.valueOf() < Date.now();
}

//设置默认设置
Message.config({
    top: 20,  //顶上显示时距顶部的位置
    duration: 1, //显示持续时间
    width: 500, //左下左上右下右上显示时的宽度
    size:"large"
});


class Card extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showLine:false
        }
        
    }
    // 返回按钮点击事件
    onBack=  ()=>{
        actions.master.changePage({"showIndex":0})
        actions.master.load();
        // actions.routing.goBack();
    }
    // 参照图标点击事件
    onRefClick=(inputid,propForm)=>{
        // console.log(this.props.form)
        return (
            ()=>{
                let option = {
                    title: '参照类型',
                    refType:2,//1:树形 2.单表 3.树卡型 4.多选 5.default
                    isRadio:false,//1.true 单选 2.false多选
                    hasPage:true,
                    tabData:[//tab标签
                        {"title":"常用","key":"commonUse"},
                        {"title":"全部","key":"total"},
                        {"title":"推荐","key":"recommed"}
                    ],// option中可增加defaultActiveKey作为默认tab标签
                    param:{//url请求参数
                        refCode:'newuser',
                        tenantId:'',
                        sysId:'',
                    },
                    refModelUrl:{
                        TableBodyUrl:'/newref/rest/iref_ctr/blobRefTreeGrid',//表体请求
                        TableBarUrl:'/newref/rest/iref_ctr/refInfo',//表头请求
                    },
                    checkedArray:[],
                    onCancel: function (p) {
                      console.log(p)
                    },
                    onSave: function (sels) {
                    //   console.log("sels",sels,inputid);
                        let param = {
                            inputid:inputid,
                            singleRefData:sels
                        }
                        actions.master.setInputFromRef(param);
                        let {setFieldsValue} = propForm;
                        console.log(sels[0]["refname"]);
                        let obj={};
                        obj[inputid+""]=sels[0]["refname"];  
                        console.log(obj)
                        setFieldsValue(obj);
                    },
                }
                createModal(option);
            }
        );
        
    }

    /**
     * 保存事件中进行字段验证,字段验证应该包括类型、格式、是否必输项
     * 
     */
    onSave =  ()=>{
        
        console.log("onSave",this.props.form);
        /* 
            first若为 true，则每一表单域的都会在碰到第一个失败了的校验规则后停止校验
            force对已经校验过的表单域，在 validateTrigger 再次被触发时是否再次校验
            这里设置force为true，验证不通过的同时触发validateTrigger弹出错误提示
        */
        this.props.form.validateFields(fieldArray,{
            first:false,
            force:true
        },async (error,value)=>{
            console.log("error",error,value);
            if(!error){
                this.setState({
                    showLine: true
                })
                // done表示是否加载完毕
                console.log("formdata",value);
                let {done} = await actions.master.onSave(value);
                console.log("成功执行保存");
                if (done) {
                    this.setState({
                        showLine: false
                    }) 
                    Message.create({content: '单据保存成功', color: 'success'});
                    
                }else {
                    this.setState({showLine: false})
                }
                
            }
        });
    }
    // 跳转到流程图
    onClickToBPM = ()=>{
        console.log("actions",actions);
        actions.routing.push({
            pathname:'/bdm/bpm',
            search:`?id=${this.props.rowData.id}`
        })
    } 

    /* onLoad = ()=>{
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
    } */

    render() {
        const { getFieldProps, getFieldError,getFieldDecorator} = this.props.form;
        let {childPageFlag,cardPageChildData,count,childActivePage,btnFlag,rowData} = this.props;
        let {code,name,type,content,status,applicant,remark,applyTime} = rowData;
        // let code="",name="",type="",content="",status="",applicant="",remark="",applyTime;
        let msg= function(btnFlag){
            switch(btnFlag){
                case 0:
                    return "新增";
                    break;
                case 1:
                    return "编辑";
                    break;
                case 2:
                    return "详情";
                    break;
                default:
                    return "新增";
            }
        }(btnFlag);
        console.log("rowData",rowData);
        let bpmClick = this.onClickToBPM;
        return (
            <div >
                <div className="card-page">
                    <div className="content">
                        <div className="topPart">
                            <Button size="sm" colors="primary" className="editable-add-btn backBtn" onClick={this.onBack}>返回</Button>
                            <h1>{msg}</h1>
                            <Button size="sm" shape="border" colors="info" className={btnFlag==2? "hide":"cancelBtn"}>取消</Button>
                            <Button size="sm" colors="primary" className={btnFlag==2 ? "hide":"saveBtn"} onClick={this.onSave}>保存</Button>
                        </div>
                    </div>
                    {

                        function (btnFlag) {
                            if (btnFlag == 2) {
                                return <BpmTaskApprovalWrap
                                    id={rowData.id}
                                    onBpmFlowClick={bpmClick}
                                    appType={"1"}
                                />;
                            }

                        }(btnFlag, rowData, bpmClick)
                    }
                </div>
                
                
                
                <div className="card-content">
            
                    <div className={btnFlag==2?"user-form mt15":"user-form"} disabled={btnFlag==2?"disabled":false}>
                        <Form >
                            <Row>
                                <Col md={4} xs={4} sm={4}>
                                    <FormItem>
                                        <Label className="label_ajust">工单编码</Label>
                                        
                                        <FormControl  value="123"  readOnly="readonly" className={"readonlyinput input_adjust require_icon_adjust"} placeholder="工单编码"
                                            
                                            {...getFieldProps('code', {
                                                initialValue : code||"",
                                                validateTrigger: 'onBlur',
                                                rules: [{
                                                    type:'string',required: false, message: '请输入工单编码',
                                                }],
                                            }) } />
                                        <span className='error'>
                                            {getFieldError('code')}
                                        </span>
                                    </FormItem>
                                </Col>
                                <Col md={4} xs={4} sm={4}>
                                    <FormItem>
                                        <Label className="label_ajust">工单名称</Label>
                                        <span style={{color:"#ff0000"}}>*</span>
                                        <FormControl disabled={btnFlag==2?"disabled":false} className="input_adjust"  placeholder="" 
                                        {...getFieldProps('name', {
                                            initialValue : name,
                                            validateTrigger: 'onBlur',
                                            rules: [{
                                                type:'string',required: true, message: '请输入工单名称',
                                            }],
                                        }) } />
                                        <span className='error'>
                                            {getFieldError('name')}
                                        </span>
                                    </FormItem>
                                </Col>
                                <Col md={4} xs={4} sm={4}>
                        
                                    {/* <FormItem>
                                        <Label className="label_ajust">工单类型</Label>
                                        <span style={{color:"#ff0000"}}>*</span>
                                        <FormControl disabled={btnFlag==2?"disabled":false} className="input_adjust"  placeholder="" 
                                        {...getFieldProps('type', {
                                            initialValue : type,
                                            validateTrigger: 'onBlur',
                                            rules: [{
                                                type:'string',required: true, message: '请输入工单类型',
                                            }],
                                        }) } />
                                        <span className='error'>
                                            {getFieldError('type')}
                                        </span>
                                    </FormItem> */}
                                    <FormItem >
                                        <Label className="label_ajust">工单类型</Label>
                                        <span style={{color:"#ff0000"}}>*</span>
                                        <Select
                                            disabled={btnFlag==2?true:false}
                                            defaultValue={type?type:""}
                                            searchPlaceholder="标签模式"
                                            {
                                                ...getFieldProps('type', {
                                                    initialValue:type,
                                                    validateTrigger: 'onBlur',
                                                    rules: [{ required: true, message: '请选择工单类型!' }],
                                                  })
                                            }
                                        >
                                            <Option  value="投诉工单">投诉工单</Option>
                                            <Option  value="对账工单">对账工单</Option>
                                        </Select>
                                        <span className='error'>
                                            {getFieldError('type')}
                                        </span>
                                    </FormItem>
                                </Col>
                                <Col md={4} xs={4} sm={4}>
                                    <FormItem >
                                        <Label className="label_ajust">申请人</Label>
                                        <span style={{color:"#ff0000"}}>*</span>
                                        <FormControl disabled={btnFlag==2?"disabled":false} className="input_adjust " placeholder="" 
                                        {...getFieldProps('applicant', {
                                            initialValue : applicant,
                                            validateTrigger: 'onBlur',
                                            rules: [{
                                                required: true,type:'string', message: '请选择申请人',
                                            }],
                                        }) } />
                                        <Icon type="uf-navmenu" key={"icon"} className="reficon_adjust" onClick={this.onRefClick("applicant",this.props.form)}></Icon>
                                        <span className='error'>
                                            {getFieldError('applicant')}
                                        </span>
                                    </FormItem>
                                </Col>
                                <Col md={4} xs={4} sm={4}>
                                    <FormItem >
                                        <Label className="label_ajust">申请时间</Label>
                                        <span  className="date-icon-adjust" >*</span>
                                        <div className="date_adjust ">
                                            <DatePicker 
                                                disabled={btnFlag==2?true:false}
                                                name="time"
                                                format={format}
                                                onChange={onChange}
                                                defaultValue={moment(applyTime)}
                                                locale={zhCN}
                                                // disabledDate={disabledDate}
                                                placeholder={dateInputPlaceholder}
                                                {...getFieldProps('applyTime', {
                                                    validateTrigger: 'onBlur',
                                                    rules: [{
                                                        required: true, type: 'object',message: '请选择开始时间',
                                                    }],
                                                }) }
                                            />
                                            
                                        </div>
                                        <span className='error'>
                                            {getFieldError('applyTime')}
                                        </span>
                                    </FormItem>
                                </Col>
                                <Col md={4} xs={4} sm={4}>
                                    <FormItem >
                                        <Label className="label_ajust">工单状态</Label>
                                        <span style={{color:"#ff0000"}}>*</span>
                                        <Select
                                            disabled={true}
                                            searchPlaceholder="标签模式"
                                            {
                                                ...getFieldProps('status', {
                                                    initialValue:status? status+"":"0",
                                                    validateTrigger: 'onBlur',
                                                    rules: [{ required: true, message: '请选择工单状态!' }],
                                                  })
                                            }
                                        >
                                            <Option value="0">未提交</Option>
                                            <Option value="1">已提交</Option>
                                            <Option value="2">审批中</Option>
                                            <Option value="3">已办结</Option>
                                        </Select>
                                        <span className='error'>
                                            {getFieldError('status')}
                                        </span>
                                    </FormItem>
                                    {/* <FormItem>
                                        <Label className="label_ajust">工单状态</Label>
                                        <span style={{color:"#ff0000"}}>*</span>
                                        <FormControl  readOnly="readonly" className={"readonlyinput input_adjust "} 
                                            
                                            {...getFieldProps('status', {
                                                initialValue : status||"未提交",
                                                validateTrigger: 'onBlur',
                                                rules: [{
                                                    type:'string',required: false
                                                }],
                                            }) } />
                                        <span className='error'>
                                            {getFieldError('code')}
                                        </span>
                                    </FormItem> */}
                                </Col>
                                <Col md={12} xs={12} sm={12}>
                                    <FormItem className="content-adjust" >
                                        <Label className="align-label-adjust">工作内容</Label>
                                        <textarea disabled={btnFlag==2?"disabled":false} className="area-adjust" name="\" id="" width="100%" rows="3"
                                            {
                                                ...getFieldProps('content', {
                                                    initialValue: content||"",
                                                    validateTrigger: 'onBlur',
                                                    rules: [{ required: false,message:"工作内容"}]
                                                }
                                            )}
                                        ></textarea>
                                    </FormItem>
                                </Col>
                                <Col md={12} xs={12} sm={12} className="mt30">
                                    <FormItem className="content-adjust " >
                                        <Label className="align-label-adjust">备注</Label>
                                        <textarea disabled={btnFlag==2?"disabled":false} className="area-adjust remark" name="\" id="" width="100%" rows="3"
                                            {
                                                ...getFieldProps('remark', {
                                                    initialValue: remark||"",
                                                    validateTrigger: 'onBlur',
                                                    rules: [{ required: false,message:"备注"}]
                                                }
                                            )}
                                        ></textarea>
                                    </FormItem>
                                </Col>
                            </Row>
                        </Form>
                        
                    </div>
                </div>
                <Loading
                    fullScreen
                    showBackDrop={true}
                    loadingType="line"
                    show={this.state.showLine}
                />
                
            </div>
        );
    }
}

export default Form.createForm()(Card);