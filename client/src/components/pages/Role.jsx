import { CrudFeature } from "../features";

function Role() {
  const entity = "role";
  const searchConfig = {
    displayLabels: ["displayName"],
    outputValue: "_id",
    path: "role",
  };
  const dataTable = [
    { title: "Department", dataIndex: "department" },
    { title: "Role", dataIndex: "displayName" },
    { title: "Dashboard Type", dataIndex: "dashboardType" },
  ];

  const config = {
    entity,
    dataTable,
    searchConfig,
  };

  return <CrudFeature config={config} />;
}

export default Role;
