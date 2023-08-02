import { CrudFeature } from "../features";

function Client() {
  const entity = "Client";

  const dataTable = [
    {
      title: "Company",
      dataIndex: "company",
      key: "company",
    },
    {
      title: "Contact Person",
      dataIndex: "contactPerson",
      key: "contactPerson",
    },
    {
      title: "Role",
      // dataIndex: ["role", "displayName"],
      dataIndex: ["role", "displayName"],
      key: "role",
      ref: true,
    },
    {
      title: "Cell",
      dataIndex: "cell",
      key: "cell",
      Number,
    },
    {
      title: "E-mail",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Website",
      dataIndex: "website",
      key: "website",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Bank Account",
      dataIndex: "bankAccount",
      key: "bankAccount",
    },
    {
      title: "Company REG Number",
      dataIndex: "companyRegNumber",
      key: "companyRegNumber",
      Number,
    },
    {
      title: "Company Tax ID",
      dataIndex: "companyTaxID",
      key: "companyTaxID",
    },
  ];

  const config = {
    entity,
    dataTable,
  };

  return <CrudFeature config={config} />;
}

export default Client;
