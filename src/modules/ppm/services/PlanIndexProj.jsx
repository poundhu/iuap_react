import request from "utils/request";
const URL = {
  GET_TREE: "/iuap-example/instit/list",
  GET_TABLE: "/iuap-example/telBook/list",
  ADD_TREE: "/iuap-example/instit/save"
};
// 获取tree数据
export const get_tree = param => {
  return request(URL.GET_TREE, {
    method: "get",
    data: param
  });
};
//增加 tree 数据
export const add_tree = param => {
  return request(URL.ADD_TREE, {
    method: "post",
    data: param
  });
};
//获取 table 数据
export const get_table = param => {
  return request(URL.GET_TABLE + param, {
    method: "get",
    data: param
  });
};
