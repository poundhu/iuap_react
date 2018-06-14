import request from "utils/request";

const URL = {
    "GET_EDIT":  "/iuap-example/demo_order/get",
    "GET_BODYLIST": process.env.IMS_PATH + "/oprtparamconfig/queryBodyByParentid",    
    "ADD_SAVE": process.env.IMS_PATH + "/oprtparamconfig/add",
    "EDIT_SAVE": process.env.IMS_PATH + "/oprtparamconfig/update",
    "DELETE_ITEMS": "/iuap-example/demo_order/delete",
    "ENABLE": process.env.IMS_PATH + "/oprtparamconfig/enable",
    "DISABLE": process.env.IMS_PATH + "/oprtparamconfig/disable"    
}

export const getItemData = (params) =>{
    let url =URL.GET_LIST+'?1=1';
    for(let attr in params){
        url+='&'+attr+'='+params[attr];
    }
    return request(url, {
        method: "get",
        data: params
    });
}

export const editSave = (params) => {
    return request(URL.EDIT_SAVE, {
        method: "post",
        data: params
    });
}

