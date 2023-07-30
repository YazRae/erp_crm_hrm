import { Layout, Row, Col, Divider } from "antd";
import { Login, Sider } from "../app";

function PublicLayout() {
  const { Footer } = Layout;
  return (
    <Layout style={{ margin: "0px" }}>
      <Row style={{ minHeight: "90vh", backgroundColor: "#f0f2f5" }}>
        <Col
          xs={{ span: 0, order: 2 }}
          sm={{ span: 0, order: 2 }}
          md={{ span: 11, order: 1 }}
          lg={{ span: 12, order: 1 }}
        >
          <Sider />
        </Col>

        <Col
          xs={{ span: 24, order: 1 }}
          sm={{ span: 24, order: 1 }}
          md={{ span: 13, order: 2 }}
          lg={{ span: 12, order: 2 }}
        >
          <Login logoDispaly="none" />
        </Col>
      </Row>

      <Row style={{ backgroundColor: "#FFF" }}>
        <div style={{ alignItems: "center", display: "grid" }}>
          <Footer>Footer</Footer>
          <Divider />
        </div>
      </Row>
    </Layout>
  );
}

export default PublicLayout;
