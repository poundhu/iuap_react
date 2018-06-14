import { actions } from "mirrorx";
import queryString from "query-string";
import uuidv1 from "uuid/v1";
import * as api from "../services/OprtParamConfig";
import { Info, Error,processData } from "utils";


export default {
  name: "oprtparamconfig",
  initialState: {
    data:{},
    listData: [],
    delOk:false,

    bodyList: [],
    showDeleteModal: false,
    showSaveModel: false,
    selectedRow: [],
    id: "",
    code: "",
    name: "",
    note: "",
    pk_workshop: "",
    enablestate: "已启用",
    pk_workshop_name: "",
    pk_section: "",
    pk_section_name: "",
    oprtparamcls: "",
    oprtparamclsname: "",
    period: "",
    sysid: "",
    tenantid: "",
    addList: [],
    postAddList: [],
    selectedList: [],
    addSelectedList: [],
    checkFormNow: false,
    addShowDeleteModal: false
  },
  reducers: {
    save(state, data) {
      return {
        ...state,
        ...data
      };
    }
  },
  effects: {
    async load(data, getState) {//加载数据
      let listData = await api.getList(data);
      listData=processData(listData);
      listData.content.forEach(function (item, index) {
        item.key = index;
      });
      actions.oprtparamconfig.save({listData:listData});
    },
  
    async del(data,getState){//单个删除
      let res=await api.delItems(data);
      processData(res,'删除成功');
      actions.oprtparamconfig.load();
    },

    async batchDel(data,getState){//批量删除
      let res=await api.delItems(data);
      processData(res,'删除成功');
      actions.oprtparamconfig.load();
    },
    
    

    
    addHandleDelConfirm(data, getState) {
      let addList = [...getState().oprtparamconfig.addList];
      let postAddList = [...getState().oprtparamconfig.postAddList];
      let { addSelectedList } = getState().oprtparamconfig;
      let delRows = [];
      addSelectedList.forEach(item => {
        delRows.push(item.crowno);
      });
      delRows.forEach(item => {
        for (let i = 0; i < addList.length; i++) {
          if (addList[i].crowno == item) {
            addList.splice(i, 1);
          }
        }
        for (let j = 0; j < postAddList.length; j++) {
          if (postAddList[j].crowno == item) {
            if (postAddList[j].id) {
              postAddList[j].status = 3;
            } else {
              postAddList.splice(j, 1);
            }
          }
        }
      });
      // console.log(delRows,'delRows')
      // console.log(addList,'addList')
      // console.log(postAddList,'postAddList')
      actions.oprtparamconfig.save({
        addList,
        postAddList,
        addSelectedList: [],
        addShowDeleteModal: false
      });
    },
    addHandleDelCancel(data, getState) {
      actions.oprtparamconfig.save({
        addShowDeleteModal: false
      });
    },
    // add 表体字段编辑事件
    handleBodyChange(data, getState) {
      let addList = [...getState().oprtparamconfig.addList];
      let postAddList = [...getState().oprtparamconfig.postAddList];
      addList.forEach(row => {
        if (data.record.crowno == row.crowno) {
          row[data.type] = data.value;
        }
      });
      postAddList.forEach(row => {
        if (data.record.crowno == row.crowno) {
          row[data.type] = data.value;
          if (row.status == 0) {
            row.status = 1;
          }
        }
      });
      actions.oprtparamconfig.save({
        addList,
        postAddList
      });
    },
    // add 保存提交事件
    async handleSubmit(data, getState) {
      let {
        id,
        ts,
        code,
        name,
        oprtparamcls,
        oprtparamclsname,
        period,
        pk_workshop,
        pk_workshop_name,
        pk_section,
        pk_section_name,
        enablestate,
        note,
        addList,
        postAddList,
        tenantid
      } = getState().oprtparamconfig;
      if (!name || !code || !oprtparamclsname || !pk_workshop || !pk_section) {
        return;
      }
      if (postAddList.length == 0) {
        Error("表体不能为空");
        return;
      }
      let qs = queryString.parse(getState().routing.location.search);
      let bodyRows = [];
      let postData = {
        data: {
          head: {
            pageinfo: null,
            rows: ""
          },
          body: {
            pageinfo: null,
            rows: bodyRows
          }
        },
        message: null,
        success: true
      };
      if (qs.type == "add") {
        postData.data.head.rows = [
          {
            rowId: null,
            values: {
              code: {
                value: code
              },
              name: {
                value: name
              },
              pk_workshop: {
                value: pk_workshop
              },
              pk_workshop_name: {
                value: pk_workshop_name
              },
              pk_section: {
                value: pk_section
              },
              pk_section_name: {
                value: pk_section_name
              },
              oprtparamcls: {
                value: oprtparamcls
              },
              oprtparamclsname: {
                value: oprtparamclsname
              },
              period: {
                value: period
              },
              note: {
                value: note
              },
              enablestate: {
                value: enablestate == "已启用" ? 1 : 0
              }
            },
            status: 2
          }
        ];
        let flag = true;
        addList.map(item => {
          if (item.pk_instagno == "") {
            flag = false;
          }
          let row = {
            rowId: null,
            values: {
              code: { value: item.code || null },
              name: { value: item.name || null },
              bodynote: { value: item.bodynote || null },
              uplimit: { value: item.uplimit || null },
              downlimit: { value: item.downlimit || null },
              pk_instagno: { value: item.pk_instagno || null },
              instnoname: { value: item.instnoname || null },
              instnocode: { value: item.instnocode || null }
            },
            status: 2
          };
          bodyRows.push(row);
        });
        if (flag) {
          let res = await api.addSave(postData);
          if (res.data.success) {
            Info("保存成功");
            actions.oprtparamconfig.save({
              bodyList: [],
              selectedRow: []
            });
            actions.routing.push("/ims/oprtparamconfig");
          } else {
            Error("保存失败");
          }
        } else {
          Error("数据标签不能为空");
        }
      } else if (qs.type == "edit") {
        postData.data.head.rows = [
          {
            rowId: null,
            values: {
              id: {
                value: id
              },
              code: {
                value: code
              },
              name: {
                value: name
              },
              oprtparamcls: {
                value: oprtparamcls
              },
              oprtparamclsname: {
                value: oprtparamclsname
              },
              period: {
                value: period
              },
              note: {
                value: note
              },
              pk_workshop: {
                value: pk_workshop
              },
              pk_workshop_name: {
                value: pk_workshop_name
              },
              pk_section: {
                value: pk_section
              },
              pk_section_name: {
                value: pk_section_name
              },
              enablestate: {
                value: enablestate == "已启用" ? 1 : 0
              },
              ts: {
                value: ts
              },
              tenantid: {
                value: tenantid
              }
            },
            status: 1
          }
        ];
        let flag = true;
        postAddList.map(item => {
          if (item.pk_instagno == "") {
            flag = false;
          }
          let row = {
            rowId: null,
            values: {
              code: { value: item.code || null },
              name: { value: item.name || null },
              bodynote: { value: item.bodynote || null },
              uplimit: { value: item.uplimit || null },
              downlimit: { value: item.downlimit || null },
              id: { value: item.id || null },
              ts: { value: item.ts || null },
              pk_parentid: { value: item.pk_parentid || null },
              pk_instagno: { value: item.pk_instagno || null },
              instnoname: { value: item.instnoname || null },
              instnocode: { value: item.instnocode || null },
              tenantid: { value: tenantid }
            },
            status: item.status
          };
          bodyRows.push(row);
        });
        if (flag) {
          let res = await api.editSave(postData);
          if (res.data.success) {
            Info("保存成功");
            actions.oprtparamconfig.save({
              bodyList: [],
              selectedRow: []
            });
            actions.routing.push("/ims/oprtparamconfig");
          } else {
            Error("保存失败");
          }
        } else {
          Error("仪表位号不能为空");
        }
      }
    },
    // add 取消事件
    handleCancle(data, getState) {
      actions.oprtparamconfig.save({
        showSaveModel: true
      });
    },
    headRefAction(data, getState) {
      if (data.ref.length == 0) {
        Error("请选择参照");
      } else {
        let key = data.param.key;
        if (key == "pk_workshop") {
          let pk_workshop = data.ref[0].id;
          let pk_workshop_name = data.ref[0].refname;
          actions.oprtparamconfig.save({
            pk_workshop: pk_workshop,
            pk_workshop_name: pk_workshop_name
          });
        } else if (key == "pk_section") {
          let pk_section = data.ref[0].id;
          let pk_section_name = data.ref[0].name;
          actions.oprtparamconfig.save({
            pk_section: pk_section,
            pk_section_name: pk_section_name
          });
        }
      }
    },
    bodyRefAction(data, getState) {
      console.log(data);
      let addList = [...getState().oprtparamconfig.addList];
      let postAddList = [...getState().oprtparamconfig.postAddList];
      let qs = queryString.parse(getState().routing.location.search);
      let index = data.index;
      if (data.ref[0] == undefined) {
        if (data.flag == "name") {
          addList[index].pk_instagno = "";
          addList[index].instnoname = "";
          addList[index].instnocode = "";
        }
      } else {
        if (data.flag == "name") {
          let ref = data.ref[0];
          addList[index].pk_instagno = ref.id;
          addList[index].instnoname = ref.name;
          addList[index].instnocode = ref.code;
        }
      }
      if (qs.type == "edit") {
        postAddList = addList;
        actions.oprtparamconfig.save({
          postAddList
        });
      }
      actions.oprtparamconfig.save({
        addList
      });
    },
    //确认取消关闭弹出框
    closeSaveModal(data, getState) {
      actions.oprtparamconfig.save({
        showSaveModel: false
      });
    },
    leaveSave(data, getState) {
      actions.oprtparamconfig.save({
        selectedList: [],
        bodyList: [],
        showSaveModel: false
      });
      actions.routing.goBack();
      let list = getState().oprtparamconfig.list;
      if (list != null && list.length > 0) {
        actions.oprtparamconfig.handleRowClick({
          index: 0,
          record: { id: list[0].id }
        });
      }
    }
  }
};
