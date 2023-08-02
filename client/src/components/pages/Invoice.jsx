import { Tag } from "antd";
import dayjs from "dayjs";
import { CrudFeature } from "../features";
// import InvoiceModule from "../modules/InvoiceModule/index.jsx";
// import { useMoney } from "../settings/index.jsx";

function Invoice() {
  // const { moneyRowFormatter } = useMoney();

  const entity = "Invoice";

  const dataTable = [
    {
      title: "#N",
      dataIndex: "number",
      key: "number",
      Number,
    },
    {
      title: "Client",
      dataIndex: ["client", "company"],
      key: "client",
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
      render: (date) => {
        return dayjs(date).format("DD/MM/YYYY");
      },
      Date,
    },
    {
      title: "total",
      dataIndex: "total",
      // onCell: () => moneyRowFormatter({}).props,
      // render: (amount) => moneyRowFormatter({ amount }).children,
      Number,
    },
    {
      title: "Balance",
      dataIndex: "credit",
      // onCell: () => moneyRowFormatter({}).props,
      // render: (amount) => moneyRowFormatter({ amount }).children,
      Number,
    },
    {
      title: "status",
      dataIndex: "status",
      render: (status) => {
        let color =
          status === "draft" ? "cyan" : status === "sent" ? "magenta" : "gold";

        return <Tag color={color}>{status && status.toUpperCase()}</Tag>;
      },
    },
    {
      title: "Payment",
      dataIndex: "paymentStatus",
      render: (paymentStatus) => {
        let color =
          paymentStatus === "unpaid"
            ? "volcano"
            : paymentStatus === "paid"
            ? "green"
            : paymentStatus === "overdue"
            ? "red"
            : "purple";

        return (
          <Tag color={color}>
            {paymentStatus && paymentStatus.toUpperCase()}
          </Tag>
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

export default Invoice;
