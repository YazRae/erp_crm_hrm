import { CrudFeature } from "../features";

function Suppliers() {
  const entity = "Suppliers";

  const dataTable = [
    {
      title: "Company",
      dataIndex: "company",
      key: "company",
    },
    {
      title: "Item",
      dataIndex: ["item", "name"],
      key: "item",
      ref: true,
    },
    {
      title: "Manager",
      dataIndex: "manager",
      key: "manager",
    },
    {
      title: "Bank Account",
      dataIndex: "bankAccount",
      key: "bankAccount",
    },
    {
      title: "Rate Contract",
      dataIndex: "rateContract",
      key: "rateContract",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Cell",
      dataIndex: "cell",
      key: "cell",
      Number,
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Website",
      dataIndex: "website",
      key: "website",
    },
  ];

  const config = {
    entity,
    dataTable,
  };

  return <CrudFeature config={config} />;
}

export default Suppliers;
