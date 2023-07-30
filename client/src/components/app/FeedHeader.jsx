import {
  AppstoreOutlined,
  BellOutlined,
  LogoutOutlined,
  MailOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Avatar, Dropdown, Menu } from "antd";
import { useNavigate } from "react-router-dom";
import photo from "../../style/images/photo.png";
// import uniqueId from "../../utils";

const FeedHeader = () => {
  const Navigate = useNavigate();

  const items = [
    {
      label: "Navigation One",
      key: "sub1",
      icon: <MailOutlined />,
      children: [
        {
          label: "Item 1",
          key: "g1",

          children: [
            {
              label: "Option 1",
              key: "1",
              onClick: () => Navigate("/"),
            },
            {
              label: "Option 2",
              key: "2",
              onClick: () => Navigate("/"),
            },
          ],
        },
        {
          label: "Item 2",
          key: "g2",

          children: [
            {
              label: "Option 3",
              key: "3",
              onClick: () => Navigate("/"),
            },
            {
              label: "Option 4",
              key: "4",
              onClick: () => Navigate("/"),
            },
          ],
        },
      ],
    },

    {
      label: "Navigation Two",
      key: "sub2",
      icon: <AppstoreOutlined />,
      children: [
        {
          label: "option 5",
          key: "5",
        },
        {
          label: "Option 6",
          key: "6",
        },
        {
          label: "Submenu",
          key: "sub3",
          children: [
            {
              label: "option 7",
              key: "7",
            },
            {
              label: "Option 8",
              key: "8",
            },
          ],
        },
      ],
    },
    {
      label: "Navigation Three",
      key: "sub4",
      icon: <SettingOutlined />,
      children: [
        {
          label: "option 9",
          key: "9",
        },
        {
          label: "Option 10",
          key: "10",
        },
        {
          label: "Option 11",
          key: "11",
        },
        {
          label: "Option 12",
          key: "12",
        },
      ],
    },
  ];

  const logoutItem = [
    {
      label: "logout",
      // key: `${uniqueId()}`,
      icon: <LogoutOutlined />,
      onClick: () => Navigate("/logout"),
    },
  ];

  const profileDropdown = (
    <div
      className="profileDropdown whiteBox shadow"
      style={{ minWidth: "200px" }}
    >
      <div className="pad15">
        <Avatar
          size="large"
          className="last"
          src={photo}
          style={{ float: "left" }}
        />
        <div className="info">
          <p className="strong">Salah Eddine Lalami</p>
          <p>Lalami.sdn@gmail.com</p>
        </div>
      </div>
      <div className="line"></div>
      <div>
        <Menu items={items} />
      </div>
      <div className="line"></div>

      <div>
        <Menu items={logoutItem} />
      </div>
    </div>
  );

  return (
    <div
      className="headerIcon"
      style={{ position: "absolute", right: 0, zIndex: "99" }}
    >
      <Dropdown
        trigger={["hover"]}
        placement="bottomRight"
        dropdownRender={() => profileDropdown}
      >
        {/* <Avatar className="last" src={photo} /> */}
        <Avatar className="last" />
      </Dropdown>

      <Avatar icon={<AppstoreOutlined />} />

      <Avatar icon={<BellOutlined />} />
    </div>
  );
};

export default FeedHeader;
