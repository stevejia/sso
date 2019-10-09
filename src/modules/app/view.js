import React from "react";
import AuthRouter from "./auth";
import { Spin } from "antd";
import store from "../../redux/store";
class View extends React.Component {
  constructor(props) {
    super(props);
    this.state = { show: this.props.show };
  }
  async componentDidMount() {
    store.subscribe(() => {
      let state = store.getState();
      this.setState({ show: state.spin.show });
    });
  }
  render() {
    return (
      <div>
        <AuthRouter></AuthRouter>
        <Spin spinning={this.state.show} size="large" />
      </div>
    );
  }
}

export default View;
