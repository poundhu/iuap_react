import { actions } from "mirrorx";
import * as api from "../services/orderEdit";
import { processData } from "utils";


export default {
  name: "orderEdit",
  initialState: {
    itemData:{}
  },
  reducers: {
    updateState(state, data) {
      return {
        ...state,
        ...data
      };
    }
  },
  effects: {
    async loadData(param, getState) {//加载数据
     
    },

    async saveData(param,getState){//保存数据
      
    }
  }
};
