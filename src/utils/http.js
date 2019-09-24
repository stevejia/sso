import axios from "axios";
import baseURL from "@/utils/baseUrl";
import { ajax } from "./httpBase";
axios.defaults.timeout = 120000; //  响应时间
axios.defaults.headers.post["Content-Type"] =
  "application/x-www-form-urlencoded"; // 配置请求头 responseType:
axios.defaults.baseURL = baseURL;

let httpMethods = {
  /** get 请求
   * @param  {接口地址} url
   * @param  {请求参数} params
   */
  get: ajax("get"),
  /** post 请求
   * @param  {接口地址} url
   * @param  {请求参数} params
   */
  post: ajax("post"),
  /** put 请求
   * @param  {接口地址} url
   * @param  {请求参数} params
   */
  put: ajax("put"),
  /** delete 请求
   * @param  {接口地址} url
   * @param  {请求参数} params
   */
  delete: ajax("delete"),

  download: ajax("get", true)
};

export default httpMethods;
