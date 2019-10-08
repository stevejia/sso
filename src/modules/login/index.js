import http from "@/utils/http";
import React from "react";
import { Form, Icon, Input, Button, Checkbox } from "antd";
class NormalLoginForm extends React.Component {
  componentDidMount() {
    console.log(this.props.params.returnUrl);
    this.props.form.setFieldsValue({
      username: this.props.params.test
    });
  }
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        console.log("Received values of form: ", values);
        await http.post("sso/login", values);
        window.location.href = this.props.params.returnUrl;
      }
    });
  };
  checkLoginStatus = async e => {
    await http.get("sso/check", { loginName: "admin" });
  };
  logout = async e => {
    await http.post("sso/logout");
  };
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form id="login-form" onSubmit={this.handleSubmit} className="login-form">
        <Form.Item>
          {getFieldDecorator("username", {
            rules: [{ required: true, message: "Please input your username!" }]
          })(
            <Input
              // value={this.test}
              prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
              placeholder="Username"
            />
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator("password", {
            rules: [{ required: true, message: "Please input your Password!" }]
          })(
            <Input
              prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
              type="password"
              placeholder="Password"
            />
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator("remember", {
            valuePropName: "checked",
            initialValue: true
          })(<Checkbox>Remember me</Checkbox>)}
          {/* <a className="login-form-forgot" href="#">
            Forgot password
          </a> */}
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            Log in
          </Button>
          <Button
            type="primary"
            htmlType="button"
            className="login-form-button"
            onClick={this.checkLoginStatus}
          >
            Check Login Status
          </Button>
          <Button
            type="primary"
            htmlType="button"
            className="login-form-button"
            onClick={this.logout}
          >
            Log out
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

const WrappedNormalLoginForm = Form.create({ name: "normal_login" })(
  NormalLoginForm
);

export default WrappedNormalLoginForm;
