import { CrudFeature } from "../features";

function Suppliers({}) {
  const entity = "Suppliers";

  const dataTable = [
    {
      title: "Company",
      dataIndex: "company",
    },
    {
      title: "Items",
      dataIndex: "items",
    },
    {
      title: "Manager",
      dataIndex: "manager",
    },
    {
      title: "Bank Account",
      dataIndex: "bankAccount",
    },
    {
      title: "Rate Contract",
      dataIndex: "rateContract",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Cell",
      dataIndex: "cell",
    },
    {
      title: "Address",
      dataIndex: "address",
    },
    {
      title: "Website",
      dataIndex: "website",
    },
  ];

  const config = {
    entity,
    dataTable,
  };

  return <CrudFeature config={config} />;
}

export default Suppliers;
