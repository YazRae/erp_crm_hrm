import dayjs from "dayjs";
import { Tag } from "antd";
import { CrudFeature } from "../features";
// import { useMoney } from "../settings/index.jsx";

export default function Quote() {
  // const { moneyRowFormatter } = useMoney();

  const entity = "Quote";

  const dataTable = [
    {
      title: "Number",
      dataIndex: "number",
      key: "number",
      Number,
    },
    {
      title: "Client",
      dataIndex: ["client", "company"],
      key: "client",
      ref: true,
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      render: (date) => {
        return dayjs(date).format("DD/MM/YYYY");
      },
      Date,
    },
    {
      title: "Due date",
      dataIndex: "expiredDate",
      key: "expiredDate",
      render: (date) => {
        return dayjs(date).format("DD/MM/YYYY");
      },
      Date,
    },
    {
      title: "SubTotal",
      dataIndex: "subTotal",
      key: "subTotal",
      // render: (amount) => moneyRowFormatter({ amount }).children,
      Number,
    },
    {
      title: "Total",
      dataIndex: "total",
      key: "total",
      // render: (amount) => moneyRowFormatter({ amount }).children,
      Number,
    },

    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        let color =
          status === "draft"
            ? "cyan"
            : status === "sent"
            ? "blue"
            : status === "accepted"
            ? "green"
            : status === "expired"
            ? "orange"
            : "red";
        return <Tag color={color}>{status && status.toUpperCase()}</Tag>;
      },
    },
  ];

  const config = {
    entity,
    dataTable,
  };
  return <CrudFeature config={config} />;
}
