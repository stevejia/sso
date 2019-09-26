import axios from "axios";
import { showSpinAction } from "../redux/reducers/spin";
import store from "../redux/store";
// import store from "@/store";
// import router from "@/router";
// import { utils } from "@/utils/utils";
// import { Message } from "iview";
// import goMainLogin from "@/utils/mainLogin";
let httpMethods = 0;
const ajax = (method, isDownload = false) => {
  return (url, params, needLoading = true, fileName, extensions = "xls") => {
    // 如果参数是 FormData 默认不做参数清理 因为会将form data 对象变成空对象
    // if (!(params instanceof FormData)) {
    //     params = utils.cleanEmpty(params);
    // }

    axios.defaults.headers.common["token"] = window.localStorage.getItem(
      "token"
    );
    axios.defaults.headers.common["locale"] = window.localStorage.getItem(
      "locale"
    );
    axios.defaults.headers.common["tenant"] =
      window.localStorage.getItem("tenantCode") || "TestC";

    return new Promise((resolve, reject) => {
      //   needLoading && store.commit("showLoading");
      store.dispatch(showSpinAction(true));
      httpMethods++;
      let config = {
        method: method,
        url: `api/${url}`
      };
      if (method === "post") {
        config["data"] = params;
      } else {
        params = formatParams(params);
        config["params"] = params;
        if (isDownload) {
          // download 模式下 responseType: 'blob'
          config["responseType"] = "blob";
        }
      }
      axios(config)
        .then(response => {
          if (!isDownload) {
            if (response && response.data) {
              if (response.data.failed) {
                showStateError(response);
                reject(response.data);
                store.dispatch(showSpinAction(false));
                // needLoading && store.commit("hideLoading");
                return;
              }
            }
            resolve(response.data);
            store.dispatch(showSpinAction(false));
            // needLoading && store.commit("hideLoading");
          } else {
            const blob = new Blob([response.data], {
              type:
                "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8"
            });
            const downloadElement = document.createElement("a");
            const href = window.URL.createObjectURL(blob);
            downloadElement.href = href;
            downloadElement.download = `${fileName}.${extensions}`;
            document.body.appendChild(downloadElement);
            downloadElement.click();
            document.body.removeChild(downloadElement); // 下载完成移除元素
            window.URL.revokeObjectURL(href); // 释放掉blob对象
          }

          httpMethods--;
          if (!httpMethods) {
            store.dispatch(showSpinAction(false));
            // needLoading && store.commit("hideLoading");
          }
        })
        .catch(error => {
          showStateError(error.response);
          reject(error);
          httpMethods--;
          if (!httpMethods) {
            store.dispatch(showSpinAction(false));
            // needLoading && store.commit("hideLoading");
          }
        });
    });
  };
};

function formatParams(params) {
  let _params = { ...params };
  if (params && params.pagination) {
    _params = {
      ..._params,
      "pagination.currentPage": _params.pagination.currentPage,
      "pagination.pageSize": _params.pagination.pageSize
    };
    delete _params.pagination;
  }
  return _params;
}

function showStateError(response) {
  if (!response) {
    showMessage("系统错误，请联系管理员");
    return;
  }
  let message = response.data.message;
  switch (response.status) {
    case 200:
      showMessage(message);
      break;
    case 400:
      showMessage(message);
      return Promise.reject(response);
    case 401:
      // goMainLogin();
      break;
    case 404:
      showMessage(message);
      break;
    case 500:
      showMessage(message);
      break;
    default:
      showMessage("系统错误，请联系管理员");
  }
}
const showMessage = message => {
  alert("message");
  // Message.destroy();
  // Message.error({
  //     content: message,
  //     duration: 0,
  //     closable: true,
  //     onClose: () => {
  //         Message.destroy();
  //     }
  // });
};
export { ajax };
