import { Switch } from "antd";
import { CloseOutlined, CheckOutlined } from "@ant-design/icons";
import { CrudFeature } from "../features";

export default function PaymentMode() {
  const entity = "PaymentMode";

  const dataTable = [
    {
      title: "Payment Mode",
      dataIndex: "name",
      key: "paymentMode",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
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
  };
  return <CrudFeature config={config} />;
}
