import { CrudFeature } from "../features";

function Item() {
  const entity = "Item";

  const dataTable = [
    {
      title: "Item Code",
      dataIndex: "itemCode",
    },
    {
      title: "Name",
      dataIndex: "name",
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
      title: "Suppliers",
      dataIndex: "suppliers",
    },
    {
      title: "Default Units of Measure",
      dataIndex: "defaultUnitsOfMeasure",
    },
    {
      title: "Item Locations",
      dataIndex: "itemlocations",
    },
  ];

  const config = {
    entity,
    dataTable,
  };
  return <CrudFeature config={config} />;
}

export default Item;
