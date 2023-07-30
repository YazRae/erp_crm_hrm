import { Layout, Menu } from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../../context/app";
import { logoIcon, logoText } from "../../style/images";
import pages from "../pages";
import * as icons from "../../style/icons";

const Navigation = () => {
  const { Sider } = Layout;
  const Navigate = useNavigate();
  const { state: stateApp, appContextAction } = useAppContext();
  const { isNavMenuClose } = stateApp;
  const { navMenu } = appContextAction;
  const [showLogoApp, setLogoApp] = useState(isNavMenuClose);

  const items = pages.map((label, key) => ({
    label,
    key,
    icon: icons[`${label}Icon`](),
    onClick: () => Navigate(`/${label.toLowerCase()}`),
  }));

  useEffect(() => {
    if (isNavMenuClose) {
      setLogoApp(isNavMenuClose);
    }
    const timer = setTimeout(() => {
      if (!isNavMenuClose) {
        setLogoApp(isNavMenuClose);
      }
    }, 200);
    return () => clearTimeout(timer);
  }, [isNavMenuClose]);
  const onCollapse = () => {
    navMenu.collapse();
  };

  return (
    <Sider
      collapsible
      collapsed={isNavMenuClose}
      onCollapse={onCollapse}
      className="navigation"
    >
      <div className="logo">
        <img src={logoIcon} alt="Logo" style={{ marginLeft: "10px" }} />

        {!showLogoApp && (
          <img
            src={logoText}
            alt="Logo"
            style={{ marginTop: "3px", marginLeft: "5px" }}
          />
        )}
      </div>
      <Menu mode="inline" items={items} />
    </Sider>
  );
};
export default Navigation;
