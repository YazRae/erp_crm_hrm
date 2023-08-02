import dayjs from "dayjs";
import { CrudFeature } from "../features";

function Employee() {
  const entity = "Employee";

  const dataTable = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Surname",
      dataIndex: "surname",
      key: "surname",
    },
    {
      title: "Birthday",
      dataIndex: "birthday",
      render: (date) => {
        return dayjs(date).format("DD/MM/YYYY");
      },
      key: "birthday",
      Date,
    },
    {
      title: "Gender",
      dataIndex: "gender",
      label: "Gender",
      key: "gender",
    },
    {
      title: "Department",
      dataIndex: "department",
      key: "department",
    },
    {
      title: "Role",
      dataIndex: ["role", "displayName"],
      label: "Role",
      ref: true,
      key: "role",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
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
  ];

  const config = {
    entity,
    dataTable,
  };
  return <CrudFeature config={config} />;
}

export default Employee;
