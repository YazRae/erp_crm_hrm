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
    },
    {
      title: "Client",
      // dataIndex: ["client", "company"],
      dataIndex: "compam",
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
      title: "total",
      dataIndex: "total",
      // onCell: () => moneyRowFormatter({}).props,
      // render: (amount) => moneyRowFormatter({ amount }).children,
    },
    {
      title: "Balance",
      dataIndex: "credit",
      // onCell: () => moneyRowFormatter({}).props,
      // render: (amount) => moneyRowFormatter({ amount }).children,
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
