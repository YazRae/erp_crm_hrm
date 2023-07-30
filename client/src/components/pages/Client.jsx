import { CrudFeature } from "../features";

function Client() {
  const entity = "Client";
  const searchConfig = {
    displayLabels: ["company"],
    outputValue: "_id",
    path: "client",
  };
  const dataTable = [
    {
      title: "Company",
      dataIndex: "company",
    },
    {
      title: "Contact Person",
      dataIndex: "contactPerson",
    },
    {
      title: "Position",
      dataIndex: "position",
    },
    {
      title: "Cell",
      dataIndex: "cell",
    },
    {
      title: "E-mail",
      dataIndex: "email",
    },
    {
      title: "Website",
      dataIndex: "website",
    },
    {
      title: "Address",
      dataIndex: "address",
    },
    {
      title: "Bank Account",
      dataIndex: "bankAccount",
    },
    {
      title: "Company REG Number",
      dataIndex: "companyRegNumber",
    },
    {
      title: "Company Tax ID",
      dataIndex: "companyTaxID",
    },
  ];

  const config = {
    entity,
    dataTable,
    searchConfig,
  };

  return <CrudFeature config={config} />;
}

export default Client;
