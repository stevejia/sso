import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import utils from "../../utils";
import LoginForm from "../login";
import NoMatch from "../404";
import { Spin } from "antd";
import store from "../../redux/store";
class View extends React.Component {
  constructor(props) {
    super(props);
    this.state = { show: this.props.show };
  }
  componentDidMount() {
    store.subscribe(() => {
      let state = store.getState();
      this.setState({ show: state.spin.show });
    });
  }
  render() {
    return (
      <div>
        <Router>
          <Switch>
            <Route
              path="/Login"
              render={matched => {
                var params = utils.getParams(matched.location.search);
                return <LoginForm params={params} />;
              }}
            ></Route>
            <Route component={NoMatch}></Route>
          </Switch>
        </Router>
        <Spin spinning={this.state.show} size="large" />
      </div>
    );
  }
}

export default View;
