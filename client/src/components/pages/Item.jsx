import { CrudFeature } from "../features";

function Item() {
  const entity = "item";
  const searchConfig = {
    displayLabels: ["company"],
    outputValue: "_id",
    path: "item",
  };
  const dataTable = [
    {
      title: "Item Code",
      dataIndex: "itemCode",
    },
    {
      title: "Description",
      dataIndex: "description",
    },
    {
      title: "Cost records",
      dataIndex: "costRecords",
    },
    {
      title: "Price Records",
      dataIndex: "priceRecords",
    },
    {
      title: "Provider",
      dataIndex: "Provider",
    },
    {
      title: "Provider Email",
      dataIndex: "providerEmail",
    },
    {
      title: "Default Units of Measure",
      dataIndex: "Default units of measure",
    },
    {
      title: "Item Locations",
      dataIndex: "itemlocations",
    },
  ];

  const config = {
    entity,
    dataTable,
    searchConfig,
  };
  return <CrudFeature config={config} />;
}

export default Item;
