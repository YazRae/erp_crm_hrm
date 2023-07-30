import {
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  LockOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useCrudContext } from "../../context/crud/index.jsx";
import { crud } from "../../redux/crud/actions.js";
import { uniqueId } from "../../utils";

function DropDownRowMenu({ row }) {
  const dispatch = useDispatch();

  const { crudContextAction } = useCrudContext();

  const { panel, collapsedBox, modal, advancedBox, readBox, editBox } =
    crudContextAction;

  const moreInfo = () => {
    dispatch(crud.currentItem({ data: row }));
    panel.open();
    collapsedBox.open();
    readBox.open();
  };

  function Edit() {
    dispatch(crud.currentItem({ data: row }));
    dispatch(crud.currentAction({ actionType: "update", data: row }));
    editBox.open();
    panel.open();
    collapsedBox.open();
  }

  function UpdatePassword() {
    dispatch(crud.currentItem({ data: row }));
    dispatch(crud.currentAction({ actionType: "update", data: row }));
    advancedBox.open();
    panel.open();
    collapsedBox.open();
  }

  function Remove() {
    dispatch(crud.currentAction({ actionType: "remove", data: row }));
    modal.open();
  }

  const items = [
    {
      label: "More Info",
      key: `${uniqueId()}`,
      icon: <EyeOutlined />,
      onClick: moreInfo,
    },
    {
      label: "Edit",
      key: `${uniqueId()}`,
      icon: <EditOutlined />,
      onClick: Edit,
    },
    {
      label: "Update Password",
      key: `${uniqueId()}`,
      icon: <LockOutlined />,
      onClick: UpdatePassword,
    },
    {
      label: "Remove",
      key: `${uniqueId()}`,
      icon: <DeleteOutlined />,
      onClick: Remove,
    },
  ];

  return <Menu style={{ minWidth: 130 }} items={items} />;
}

export default DropDownRowMenu;
