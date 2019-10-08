import "babel-polyfill";
import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { Provider } from "react-redux";
import "antd/dist/antd.css";

import App from "./modules/app";
import store from "./redux/store";
// ========================================
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
