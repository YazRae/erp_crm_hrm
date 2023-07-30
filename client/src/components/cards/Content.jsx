import { Layout } from "antd";
import { useEffect, useState } from "react";
import { useAppContext } from "../../context/app";
import { useCrudContext } from "../../context/crud";
import { DataFeedTable } from "../tables";

function ContentCard({ config }) {
  const { Content } = Layout;
  const { state: stateCrud, crudContextAction } = useCrudContext();
  const { state: stateApp } = useAppContext();
  const { isPanelClose } = stateCrud;
  const { isNavMenuClose } = stateApp;
  const { panel } = crudContextAction;

  const [isSidePanelClose, setSidePanel] = useState(isPanelClose);

  useEffect(() => {
    let timer = [];
    if (isPanelClose) {
      timer = setTimeout(() => {
        setSidePanel(isPanelClose);
      }, 200);
    } else {
      setSidePanel(isPanelClose);
    }

    return () => clearTimeout(timer);
  }, [isPanelClose]);

  useEffect(() => {
    if (!isNavMenuClose) {
      panel.close();
    }
  }, [isNavMenuClose]);
  return (
    <Content
      className="whiteBox shadow"
      style={{
        padding: "50px 40px",
        margin: "100px auto",
        width: isSidePanelClose ? "100%" : "830px",
        maxWidth: "1000px",
        flex: "none",
      }}
      children={<DataFeedTable config={config} />}
    />
  );
}

export default ContentCard;
