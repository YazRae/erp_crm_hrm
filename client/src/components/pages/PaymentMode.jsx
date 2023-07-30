import { Switch } from "antd";
import { CloseOutlined, CheckOutlined } from "@ant-design/icons";
import { CrudFeature } from "../features";

export default function PaymentMode() {
  const entity = "paymentMode";
  const searchConfig = {
    displayLabels: ["name"],
    outputValue: "_id",
    path: "paymentMode",
  };
  const dataTable = [
    {
      title: "Payment Mode",
      dataIndex: "name",
    },
    {
      title: "Description",
      dataIndex: "description",
    },
    {
      title: "Is Default",
      dataIndex: "isDefault",
      key: "isDefault",
      onCell: () => {
        return {
          style: {
            width: "100px",
          },
        };
      },
      render: (text) => {
        return (
          <Switch
            checked={text}
            checkedChildren={<CheckOutlined />}
            unCheckedChildren={<CloseOutlined />}
          />
        );
      },
    },
    {
      title: "Enabled",
      dataIndex: "enabled",
      key: "enabled",
      onCell: () => {
        return {
          style: {
            width: "100px",
          },
        };
      },
      render: (text) => {
        return (
          <Switch
            checked={text}
            checkedChildren={<CheckOutlined />}
            unCheckedChildren={<CloseOutlined />}
          />
        );
      },
    },
  ];

  const config = {
    entity,
    dataTable,
    searchConfig,
  };
  return <CrudFeature config={config} />;
}
