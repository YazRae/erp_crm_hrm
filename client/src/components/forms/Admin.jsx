// import SelectAsync from "../components/SelectAsync/index.jsx";
import { Form, Input } from "antd";

function AdminForm({ isUpdateForm = false }) {
  const { Item } = Form;

  return (
    <>
      <Item
        label="Name"
        name={isUpdateForm ? "name" : "nameUpdate"}
        // name={isUpdateForm ? "nameUpdate" : "name"}
        // name={"name"}
        rules={[
          {
            required: true,
            message: "Please input your Name!",
          },
        ]}
      >
        <Input autoComplete="off" />
      </Item>
      <Item
        label="Surname"
        name={isUpdateForm ? "surname" : "surnameUpdate"}
        // name={isUpdateForm ? "surnameUpdate" : "surname"}
        // name={"surname"}
        rules={[
          {
            required: true,
            message: "Please input your surname!",
          },
        ]}
      >
        <Input autoComplete="off" />
      </Item>
      <Item
        label="E-mail"
        name={isUpdateForm ? "email" : "emailUpdate"}
        // name={isUpdateForm ? "emailUpdate" : "email"}
        // name={"email"}
        rules={[
          {
            required: true,
            message: "Please input your Email!",
          },
        ]}
      >
        <Input autoComplete="off" />
      </Item>

      {!isUpdateForm && (
        <Item
          label="Password"
          // name={"password"}
          id="password"
          rules={[
            {
              required: true,
              message: "Please input your Password!",
            },
          ]}
        >
          <Input.Password autoComplete="new-password" />
        </Item>
      )}
      <Item
        label="Role"
        // name="role"
        id="role"
        rules={[
          {
            required: true,
            message: "This Field is required",
          },
        ]}
      >
        {/* <SelectAsync
          entity={"role"}
          displayLabels={["displayName"]}
        ></SelectAsync> */}
      </Item>
    </>
  );
}

export default AdminForm;
