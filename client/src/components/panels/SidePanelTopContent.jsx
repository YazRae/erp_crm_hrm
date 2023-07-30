import { DeleteOutlined, EditOutlined, LockOutlined } from "@ant-design/icons";
import { Button, Col, Row } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { UpdateForm } from "../../components/forms";
import { ReadItemPanel } from "../../components/panels";
import { useCrudContext } from "../../context/crud";
import { crud } from "../../redux/crud/actions.js";
import { selectCurrentItem } from "../../redux/crud/selectors.js";
// import { UpdatePasswordForm } from "../forms";

function SidePanelTopContent({ config, formElements }) {
  const { crudContextAction, state } = useCrudContext();
  const {
    searchConfig: { displayLabels },
  } = config;
  const { panel, advancedBox, modal, readBox, editBox } = crudContextAction;

  const { isReadBoxOpen, isEditBoxOpen, isAdvancedBoxOpen } = state;

  const { result: currentItem } = useSelector(selectCurrentItem);

  const dispatch = useDispatch();

  const [labels, setLabels] = useState("");
  useEffect(() => {
    if (currentItem) {
      const currentlabels = displayLabels.map((x) => currentItem[x]).join(" ");

      setLabels(currentlabels);
    }
  }, [currentItem]);

  const removeItem = () => {
    dispatch(crud.currentAction({ actionType: "remove", data: currentItem }));
    modal.open();
  };
  const editItem = () => {
    dispatch(crud.currentAction({ actionType: "update", data: currentItem }));
    editBox.open();
  };
  const updatePassword = () => {
    dispatch(crud.currentAction({ actionType: "update", data: currentItem }));
    advancedBox.open();
  };

  const show =
    isReadBoxOpen || isEditBoxOpen || isAdvancedBoxOpen
      ? { opacity: 1 }
      : { opacity: 0 };
  return (
    <>
      <Row style={show}>
        <Col span={13}>
          <p style={{ marginBottom: "10px" }}>{labels}</p>
        </Col>
        <Col span={24}>
          <Button
            onClick={removeItem}
            type="text"
            icon={<DeleteOutlined />}
            size="small"
            style={{
              float: "left",
              marginRight: "5px",
              marginLeft: "-5px",
            }}
          >
            remove
          </Button>
          <Button
            onClick={editItem}
            type="text"
            icon={<EditOutlined />}
            size="small"
            style={{ float: "left", marginRight: "5px" }}
          >
            edit
          </Button>
          <Button
            onClick={updatePassword}
            type="text"
            icon={<LockOutlined />}
            size="small"
            style={{ float: "left", marginRight: "0px" }}
          >
            update password
          </Button>
        </Col>

        <Col span={24}></Col>
        <div className="space10"></div>
      </Row>
      {/* <ReadItemPanel config={config} /> */}
      <UpdateForm config={config} formElements={formElements} />
      {/* <UpdatePasswordForm config={config} /> */}
    </>
  );
}

export default SidePanelTopContent;
