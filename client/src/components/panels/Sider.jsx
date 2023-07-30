import { MenuOutlined } from "@ant-design/icons";
import { Layout } from "antd";
import { useEffect, useState } from "react";
import { useAppContext } from "../../context/app";
import { useCrudContext } from "../../context/crud";
import { SiderCard } from "../cards";
import { FixedHeaderPanel } from "../panels";

const { Sider } = Layout;

function SiderPanel({ config }) {
  const { ADD_NEW_ENTITY } = config;
  const { state, crudContextAction } = useCrudContext();
  const { isPanelClose, isBoxCollapsed } = state;
  const { panel, collapsedBox } = crudContextAction;
  const [isSidePanelClose, setSidePanel] = useState(isPanelClose);
  const [leftSider, setLeftSider] = useState("-1px");
  const [opacitySider, setOpacitySider] = useState(0);
  const [paddingTopSider, setPaddingTopSider] = useState("20px");

  const { state: stateApp, appContextAction } = useAppContext();
  const { isNavMenuClose } = stateApp;
  const { navMenu } = appContextAction;

  useEffect(() => {
    let timer = [];
    if (isPanelClose) {
      setOpacitySider(0);
      setPaddingTopSider("20px");

      timer = setTimeout(() => {
        setLeftSider("-1px");
        setSidePanel(isPanelClose);
      }, 200);
    } else {
      setSidePanel(isPanelClose);
      setLeftSider(0);
      timer = setTimeout(() => {
        setOpacitySider(1);
        setPaddingTopSider(0);
      }, 200);
      if (!isNavMenuClose) {
        navMenu.close();
      }
    }

    return () => clearTimeout(timer);
  }, [isPanelClose]);

  const collapsePanel = () => {
    panel.collapse();
  };

  const collapsePanelBox = () => {
    collapsedBox.collapse();
  };

  return (
    <Sider
      trigger={<MenuOutlined className="trigger" />}
      width={400}
      collapsible
      collapsed={isSidePanelClose}
      collapsedWidth={"0px"}
      onCollapse={collapsePanel}
      className="sidePanel"
      zeroWidthTriggerStyle={{
        right: "-50px",
        top: "15px",
      }}
      style={{
        left: leftSider,
        backgroundColor: "#f5f5f5",
      }}
    >
      <div
        className="sidePanelContent"
        style={{
          opacity: opacitySider,
          paddingTop: paddingTopSider,
        }}
      >
        <FixedHeaderPanel config={config} />
        <SiderCard
          config={config}
          buttonTitle={ADD_NEW_ENTITY}
          isCollapsed={isBoxCollapsed}
          onCollapse={collapsePanelBox}
        />
      </div>
    </Sider>
  );
}

export default SiderPanel;
