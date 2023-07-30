import { EllipsisOutlined } from "@ant-design/icons";
import { PageHeader } from "@ant-design/pro-layout";
import { Button, Dropdown, Table } from "antd";
import { List, resetState } from "../../redux/api/entityApiSlice";
import store from "../../redux/store";
import { uniqueId } from "../../utils";
import { AddNewEntityButton } from "../buttons";
import { DropDownRowMenu } from "../menus";
import { DeleteModal } from "../modals";

function DataFeedTable({ config }) {
  const { entity, dataTable } = config;

  const columns = [
    ...dataTable,
    {
      title: "Actions",
      render: (row) => (
        <Dropdown
          dropdownRender={() => <DropDownRowMenu row={row} />}
          trigger={["hover"]}
        >
          <EllipsisOutlined style={{ cursor: "pointer", fontSize: "24px" }} />
        </Dropdown>
      ),
    },
  ];

  const rowSelection = {
    renderCell: (checked, record, index, originNode) => {
      // console.log(checked);
    },
  };

  const {
    currentData,
    data,
    isError,
    isFetching,
    isLoading,
    isSuccess,
    isUninitialized,
    refetch,
    status,
  } = List({ entity });

  if (isError) {
    refetch({ entity });
  }

  const { pagination, result } = isSuccess && data;

  const refresh = () => {
    store.dispatch(resetState());
  };

  return (
    <>
      <PageHeader
        onBack={() => window.history.back()}
        title={`${entity}s List`}
        ghost={false}
        extra={[
          <Button onClick={refresh} key={`${uniqueId()}`}>
            Refresh
          </Button>,
          <AddNewEntityButton key={`${uniqueId()}`} config={config} />,
        ]}
        style={{
          padding: "20px 0px",
        }}
      />
      <Table
        columns={columns}
        dataSource={result}
        pagination={pagination}
        rowKey={(row) => row._id}
        rowSelection={rowSelection}
        loading={isLoading}
        onChange={refresh}
      />
      <DeleteModal config={config} />
    </>
  );
}

export default DataFeedTable;
