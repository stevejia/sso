import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import http from "../../utils/http";
import LoginForm from "../login";
import UserList from "../user";
import CustomerList from "../customer";
import NoMatch from "../404";
import utils from "../../utils";
class AuthRouter extends React.Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route
            path="/Login"
            render={matched => {
              var params = utils.getParams(matched.location.search);
              return <LoginForm params={params} />;
            }}
          ></Route>
          <PrivateRoute path="/user/list" component={UserList}></PrivateRoute>
          <PrivateRoute
            path="/customer/list"
            component={CustomerList}
          ></PrivateRoute>
          <Route component={NoMatch}></Route>
        </Switch>
      </Router>
    );
  }
}

class PrivateRoute extends Component {
  async componentDidMount() {
    await http.get("sso/check", { loginName: "admin" });
  }

  render() {
    const { component: Component, ...rest } = this.props;
    console.log({ component: Component, ...rest });
    return (
      <Route
        {...rest}
        render={props => <Component {...props}></Component>}
      ></Route>
    );
  }
}
// class PrivateRoute extends React.Component {
//   render() {
//     // await http.get("sso/check", { loginName: "admin" });
//     return <Route {...rest} component={component}></Route>;
//   }
// }

export default AuthRouter;
