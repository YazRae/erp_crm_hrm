import { Col, Layout, Row } from "antd";
import { Suspense } from "react";
import { FeedHeader, Loader, Navigation } from "../app";

const PrivetLayout = ({ element: Children }) => {
  return (
    <Layout>
      <Row>
        <Col>
          <Navigation />
        </Col>
        <Col>
          <Suspense fallback={<Loader />}>
            <Children />
          </Suspense>
        </Col>
        <Col>
          <FeedHeader />
        </Col>
      </Row>
    </Layout>
  );
};

export default PrivetLayout;
