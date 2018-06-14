import React, { Component } from 'react';
import { Icon,Button,Modal,Form,FormControl,Panel } from 'tinper-bee';
import './index.less';

const FormItem = Form.FormItem;

export default class AdvanceQryPanel extends Component {

	constructor(props) {
		super(props);
	}
	
	render() {
		let { showAdvanceQryPanel, qryConfirm, qryReset, width, height,qryParamItems}= this.props;
        let _qryParamItems=[];

        {qryParamItems.map(item=>{
            let labelName = item.formItem.labelName;
            let type = item.formItem.type;
            let valuePropsName = item.formItem.valuePropsName;
            let paramItem;
            if(type=="string"){
                //字符，使用formControl
                let controlName = item.formItem.formControl.name;
                let controlValue = item.formItem.formControl.value;
                // paramItem = (<FormItem
                //     className='u-form-item'
                //     showMast={true}
                //     labelName={labelName+":"}
                //     isRequire={true}
                //     errorMessage="查询条件为空或格式不正确"
                //     method="blur"
                //     inline={true}
                //     labelMd={1}
                //     md={3}
                //     valuePropsName={valuePropsName}
                // >
                //     <FormControl
                //         name={controlName}
                //         placeholder={"请输入"+labelName}
                //         value={controlValue}
                //     />
                // </FormItem>);
                paramItem = (<div className="filter-item">
                <FormControl
                        name={controlName}
                        placeholder={"请输入"+labelName}
                        value={controlValue}
                    />
                </div>);
            }else if(type=="ref"){
                //参照组件
            }else if(type=="number"){
                //数值
            }else if(type=="date"){
                //日期控件 datepicker
            }else{
                //TODO 其他类型
            }
            _qryParamItems.push(paramItem);
        })}
        return (<Panel collapsible expanded={showAdvanceQryPanel}>
                <div className="more-header-filter">
                    {_qryParamItems}    
                </div>
                <div className="qry-btn-right">
                    <Button colors="primary" className="header-btn-item" onClick={qryConfirm}>
                        确定
                    </Button>
                    <Button style = {{color : 'black'}} className="header-btn-item" onClick={qryReset}>
                        重置
                    </Button>
                </div>
        </Panel>);
	}
}
