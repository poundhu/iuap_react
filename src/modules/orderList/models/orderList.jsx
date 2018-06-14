
import { actions } from "mirrorx";
import * as api from "../services/orderList";
import { processData } from "utils";


export default {
  name: "orderList",
  initialState: {
    list: [],
    pageActive:1,
    pageSize:10,
    totalPages:1,
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
    async load(param, getState) {//加载数据
      let oldParam={
        pageSize:10,
        pageIndex:0,
        searchCode:'',
        searchName:''
      }
      let res = await api.getList(Object.assign(oldParam,param));
      let data=processData(res);
      if(data){
        data.content.forEach(function (item, index) {
          item.key = index;
        });
        actions.orderList.save(
          {
            list:data.content,
            pageActive:data.number+1,
            pageSize:data.totalPages
          }
        );
      }
      
    },
  }
};
