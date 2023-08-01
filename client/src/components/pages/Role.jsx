import { CrudFeature } from "../features";

function Role() {
  const entity = "Role";

  const dataTable = [
    { title: "Department", dataIndex: "department" },
    { title: "Role", dataIndex: "displayName" },
    { title: "Dashboard Type", dataIndex: "dashboardType" },
  ];

  const config = {
    entity,
    dataTable,
  };

  return <CrudFeature config={config} />;
}

export default Role;
