import React from "react";
import { Button } from "antd";
import http from "@/utils/http";
class UserList extends React.Component {
  async componentDidMount() {
    await http.get("sso/check", { loginName: "admin" });
  }
  onLogout = async e => {
    await http.post("sso/logout");
  };
  onCheck = async e => {
    await http.get("sso/check", { loginName: "admin" });
  };
  render() {
    return (
      <div>
        <Button type="primary" onClick={this.onLogout}>
          LogOut
        </Button>
        <Button type="primary" onClick={this.onCheck}>
          Check
        </Button>
      </div>
    );
  }
}
export default UserList;
