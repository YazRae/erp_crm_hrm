import { Layout } from "antd";
import { CrudContextProvider } from "../../context/crud";
import { ContentCard } from "../cards";
import { SiderPanel } from "../panels";

function CrudFeature({ config }) {
  return (
    <CrudContextProvider
      children={
        <Layout style={{ minHeight: "100vh" }}>
          <SiderPanel config={config} />
          <Layout>
            <ContentCard config={config} />
          </Layout>
        </Layout>
      }
    />
  );
}

export default CrudFeature;
