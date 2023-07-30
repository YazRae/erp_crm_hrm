import { Form, Input, Checkbox, Button, Divider, Card } from "antd";

import { UserOutlined, LockOutlined } from "@ant-design/icons";

const LoginForm = () => {
  return (
    <Card>
      <Form
        name="normal_login"
        className="login-form"
        initialValues={{
          remember: true,
        }}
        // onFinish={onFinish}
      >
        <Form.Item
          name="email"
          rules={[
            {
              required: true,
              message: "Please input your Email!",
            },
          ]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Email or phone number"
            autoComplete="email"
            size="large"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your Password!",
            },
          ]}
        >
          <Input.Password
            prefix={<LockOutlined className="site-form-item-icon" />}
            placeholder="Password"
            size="large"
          />
        </Form.Item>
        <Form.Item>
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <a className="login-form-forgot" href="">
            Forgot password
          </a>
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
            // loading={isLoading}
            size="large"
            style={{
              margin: "auto",
            }}
          >
            Log in
          </Button>
          <Divider />

          <Button
            type="primary"
            // htmlType="submit"
            className="login-form-button"
            // loading={isLoading}
            size="large"
            style={{
              backgroundColor: "blue",
              width: "50%",
              margin: "auto",
            }}
          >
            Create New Account
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};
export default LoginForm;
