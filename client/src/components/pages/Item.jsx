import { CrudFeature } from "../features";

function Item() {
  const entity = "Item";

  const dataTable = [
    {
      title: "Item Code",
      dataIndex: "itemCode",
      key: "itemCode",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Cost records",
      dataIndex: "costRecords",
      key: "costRecords",
      Number,
    },
    {
      title: "Price Records",
      dataIndex: "priceRecords",
      key: "priceRecords",
      Number,
    },
    {
      title: "Suppliers",
      dataIndex: ["suppliers", "company"],
      key: "suppliers",
      ref: true,
    },
    {
      title: "Default Units of Measure",
      dataIndex: "defaultUnitsOfMeasure",
      key: "defaultUnitsOfMeasure",
    },
    {
      title: "Item Locations",
      dataIndex: "itemLocations",
      key: "itemLocations",
    },
  ];

  const config = {
    entity,
    dataTable,
  };
  return <CrudFeature config={config} />;
}

export default Item;
