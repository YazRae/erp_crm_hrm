// import { useDispatch, useSelector } from "react-redux";

import { Form, Button, Layout, Col, Divider, Space } from "antd";
import { Typography } from "antd";

import { useLocation } from "react-router-dom";

// import { login } from "../redux/auth/actions.js";
// import { selectAuth } from "../redux/auth/selectors.js";
import { LoginForm } from ".././forms";

import { logo } from "../../style/images";

function Signup({ logoDispaly = "flex" }) {
  const { Content } = Layout;
  const { Text } = Typography;
  const entity = "LoginPage";
  const ENTITY_NAME = "login";

  const config = { entity, ENTITY_NAME };

  // function LoginPage({ logoDispaly = "flex" }) {
  // const { loading: isLoading } = useSelector(selectAuth);
  // const dispatch = useDispatch();
  const location = useLocation();
  // const onFinish = (values) => {
  //   dispatch(login({ loginData: values }));
  // };
  return (
    <Content
      style={{
        padding: "10% 30px 30px",
        maxWidth: "70%",
        margin: "0 auto",
      }}
    >
      <Col
        xs={{ span: 24 }}
        sm={{ span: 24 }}
        md={{ span: 0 }}
        span={0}
        style={{
          display: "flex",
          margin: "auto 30%",
        }}
      >
        <img
          src={logo}
          alt="Logo"
          style={{
            margin: "auto auto 10%",
            display: logoDispaly,
          }}
        />
      </Col>
      <div
        className="site-layout-content"
        style={{
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <LoginForm />

        <Space direction="vertical">
          <Text strong>All-in-one tool </Text>
          <Text>
            Accounting, procurement, project management, risk management.
            compliance, and supply chain operations
          </Text>
        </Space>
      </div>
    </Content>
  );
}

export default Signup;
