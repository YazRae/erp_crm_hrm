import dayjs from "dayjs";
import { CrudFeature } from "../features";

function Payment() {
  const entity = "Payment";

  const dataTable = [
    {
      title: "number",
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
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      Number,
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
      title: "Invoice Number",
      dataIndex: ["invoice", "number"],
      key: "invoiceNumber",
      Number,
    },
    {
      title: "Invoice year",
      dataIndex: ["invoice", "year"],
      key: "invoiceYear",
      Date,
    },
    {
      title: "Payment Mode",
      dataIndex: ["paymentMode", "name"],
      key: "paymentMode",
    },
  ];

  const config = {
    entity,
    dataTable,
  };
  return <CrudFeature config={config} />;
}

export default Payment;
