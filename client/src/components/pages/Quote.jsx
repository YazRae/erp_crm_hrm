import dayjs from "dayjs";
import { Tag } from "antd";
import { CrudFeature } from "../features";
// import { useMoney } from "../settings/index.jsx";

export default function Quote() {
  // const { moneyRowFormatter } = useMoney();

  const entity = "quote";
  const searchConfig = {
    displayLabels: ["name", "surname"],
    path: "quote",
  };
  const dataTable = [
    {
      title: "Number",
      dataIndex: "number",
    },
    {
      title: "Client",
      // dataIndex: ["client", "company"],
      dataIndex: "client company",
    },
    {
      title: "Date",
      dataIndex: "date",
      render: (date) => {
        return dayjs(date).format("DD/MM/YYYY");
      },
    },
    {
      title: "Due date",
      dataIndex: "expiredDate",
      render: (date) => {
        return dayjs(date).format("DD/MM/YYYY");
      },
    },
    {
      title: "SubTotal",
      dataIndex: "subTotal",
      // render: (amount) => moneyRowFormatter({ amount }).children,
    },
    {
      title: "Total",
      dataIndex: "total",
      // render: (amount) => moneyRowFormatter({ amount }).children,
    },

    {
      title: "Status",
      dataIndex: "status",
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
    searchConfig,
  };
  return <CrudFeature config={config} />;
}
