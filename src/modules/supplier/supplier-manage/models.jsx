
import { actions } from "mirrorx";
import * as api from "./services";
import { processData } from "utils";


export default {
  name: "supplier-manager",
  initialState: {

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
    async loadList(param, getState) {//加载数据
      
    },
  }


};
