import { CrudFeature } from "../features";
import dayjs from "dayjs";

function Admin() {
  const entity = "Admin";

  const dataTable = [
    {
      title: "Name",
      dataIndex: "name",
      label: "Name",
      key: "name",
    },
    {
      title: "Surname",
      dataIndex: "surname",
      label: "Surename",
      key: "surname",
    },
    {
      title: "Email",
      dataIndex: "email",
      label: "Email",
      key: "email",
    },
    {
      title: "Cell",
      dataIndex: "cell",
      label: "Cell",
      key: "cell",
    },
    {
      title: "Birthday",
      dataIndex: "birthday",
      label: "Birthday",
      key: "birthday",
      render: (date) => {
        return dayjs(date).format("DD/MM/YYYY");
      },
      isDate: true,
    },
    {
      title: "Gender",
      dataIndex: "gender",
      label: "Gender",
      key: "gender",
    },
    {
      title: "Role",
      // dataIndex: "role",
      dataIndex: ["role", "displayName"],
      label: "Role",
      key: "role",
    },
  ];

  const config = {
    entity,
    dataTable,
  };

  return <CrudFeature config={config} />;
}

export default Admin;
