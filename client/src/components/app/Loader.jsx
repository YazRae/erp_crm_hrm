import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

function Loader({ isLoading, children }) {
  const indicator = <LoadingOutlined style={{ fontSize: 24 }} spin />;

  return (
    <Spin indicator={indicator} spinning={isLoading}>
      {children}
    </Spin>
  );
}

export default Loader;
