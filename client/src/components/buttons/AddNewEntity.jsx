import { useCrudContext } from "../../context/crud/index.jsx";
import { Button } from "antd";

function AddNewEntityButton({ config }) {
  const { crudContextAction } = useCrudContext();
  const { collapsedBox, panel } = crudContextAction;
  const { entity } = config;

  const handelClick = () => {
    panel.open();
    collapsedBox.close();
  };

  return (
    <Button onClick={handelClick} type="primary">
      {`Add New ${entity}`}
    </Button>
  );
}

export default AddNewEntityButton;
