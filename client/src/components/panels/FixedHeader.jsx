import { PlusOutlined } from "@ant-design/icons";
import { Button, Col, Row } from "antd";
import { EntitySearchFeature } from "../../components/features";
import { useCrudContext } from "../../context/crud";

function FixedHeaderPanel({ config }) {
  const { entity } = config;
  const {
    crudContextAction: { collapsedBox },
  } = useCrudContext();

  const addNewItem = () => {
    collapsedBox.close();
  };

  return (
    <div className="box">
      <Row gutter={12}>
        <Col className="gutter-row" span={21}>
          <h1 style={{ fontSize: 20, marginBottom: 20 }}>
            {`${entity} Panel`}
          </h1>
        </Col>
      </Row>
      <Row gutter={8}>
        <Col className="gutter-row" span={21}>
          <EntitySearchFeature config={config} />
        </Col>
        <Col className="gutter-row" span={3}>
          <Button
            onClick={addNewItem}
            block={true}
            icon={<PlusOutlined />}
          ></Button>
        </Col>
      </Row>
    </div>
  );
}

export default FixedHeaderPanel;
