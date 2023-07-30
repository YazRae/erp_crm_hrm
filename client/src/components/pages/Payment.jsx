import dayjs from "dayjs";
import { CrudFeature } from "../features";

function Payment() {
  const entity = "payment";
  const searchConfig = {
    displayLabels: ["number"],
    outputValue: "_id",
    path: "payment",
  };
  const dataTable = [
    {
      title: "number",
      dataIndex: "number",
    },
    {
      title: "Client",
      // dataIndex: ["client", "company"],
      dataIndex: "client company",
    },
    {
      title: "Amount",
      dataIndex: "amount",
    },
    {
      title: "Date",
      dataIndex: "date",
      render: (date) => {
        return dayjs(date).format("DD/MM/YYYY");
      },
    },
    {
      title: "Invoice Number",
      // dataIndex: ["invoice", "number"],
      dataIndex: "invoice number",
    },
    {
      title: "Invoice year",
      // dataIndex: ["invoice", "year"],
      dataIndex: "invoice year",
    },
    {
      title: "Payment Mode",
      // dataIndex: ["paymentMode", "name"],
      dataIndex: "paymentMode name",
    },
  ];

  const config = {
    entity,
    dataTable,
    searchConfig,
  };
  return <CrudFeature config={config} />;
}

export default Payment;
