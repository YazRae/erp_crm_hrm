import { Typography, Layout, Space, Divider } from "antd";

import { logo } from "../../style/images";

const { Content } = Layout;
const { Title, Text } = Typography;

const Sider = () => {
  return (
    <Content
      style={{
        padding: "20% 5%",
        width: "100%",
        maxWidth: "500px",
        margin: "0 15%",
      }}
      className="sideContent"
    >
      <div style={{ width: "100%", margin: "5% 4% 3% 10%" }}>
        <img src={logo} alt="Logo" style={{ display: "block" }} />
        <div className="space40"></div>
        <Title level={3}>
          Automate &amp; manage daily business activities.
        </Title>
        <div className="space20"></div>
      </div>
    </Content>
  );
};

export default Sider;
