import { Modal } from "antd";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useAppContext } from "../../context/app";
import { useCrudContext } from "../../context/crud";
import { Remove, resetState } from "../../redux/apiSlice";
import { selectRemovedItem } from "../../redux/crud/selectors.js";
import store from "../../redux/store";
import { valueByString } from "../../utils";

function DeleteModal({ config }) {
  const {
    entity,
    deleteMessage = "Do you want to remove: ",
    title = "Remove Item",
  } = config;

  const {
    appContextAction: { searchConfig },
  } = useAppContext();

  const displayLabels = searchConfig[entity].displayLabels;

  const [displayItem, setDisplayItem] = useState("");

  const [remove, { isError, isLoading, isSuccess, reset, status }] = Remove();

  const { current } = useSelector(selectRemovedItem);

  if (isError) {
    reset;
  }

  const {
    state: { isModalOpen },
    crudContextAction: { modal },
  } = useCrudContext();

  const onOk = () => {
    if (!isLoading) modal.close();

    const id = current._id;
    remove({ entity, id });
  };

  const onCancel = () => {
    if (!isLoading) modal.close();
  };

  useEffect(() => {
    if (status === "fulfilled") {
      modal.close();
      // store.dispatch(resetState());
    }

    if (current) {
      const labels = displayLabels
        .map((x) => valueByString(current, x))
        .join(" ");

      setDisplayItem(labels);
    }
  }, [status, current]);

  return (
    <Modal
      title={title}
      open={isModalOpen}
      confirmLoading={isLoading}
      onOk={onOk}
      onCancel={onCancel}
    >
      <p>
        {deleteMessage}
        {displayItem}
      </p>
    </Modal>
  );
}
export default DeleteModal;
