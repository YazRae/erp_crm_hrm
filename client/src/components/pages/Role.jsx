import { CrudFeature } from "../features";

function Role() {
  const entity = "Role";

  const dataTable = [
    { title: "Department", dataIndex: "department", key: "department" },
    { title: "Name", dataIndex: "displayName", key: "displayName" },
    {
      title: "Dashboard Type",
      dataIndex: "dashboardType",
      key: "dashboardType",
    },
  ];

  const config = {
    entity,
    dataTable,
  };

  return <CrudFeature config={config} />;
}

export default Role;
