import { Button, DatePicker, Form, Input, Select } from "antd";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useCrudContext } from "../../context/crud";
import { Create } from "../../redux/apiSlice";
import { crud } from "../../redux/crud/actions.js";
import Loader from "../app/Loader";
import { SelectAsyncFeature } from "../features";

function CreateForm({ config }) {
  const { Item } = Form;
  const { Password } = Input;
  const { Option } = Select;

  const { entity, dataTable } = config;

  const dispatch = useDispatch();

  const { crudContextAction } = useCrudContext();

  const { panel, collapsedBox, readBox } = crudContextAction;

  const [form] = Form.useForm();

  const [
    create,
    {
      isError,
      isLoading,
      isSuccess,
      isUninitialized,
      originalArgs,
      reset,
      status,
    },
  ] = Create();

  const onFinish = (body) => {
    console.log(
      "🚀 ~ file: index.jsx ~ line 19 ~ onSubmit ~ fieldsValue",
      body
    );

    create({ entity, body });
  };

  useEffect(() => {
    if (isSuccess) {
      readBox.open();
      collapsedBox.open();
      panel.open();
      form.resetFields();
      dispatch(crud.resetAction({ actionType: "create" }));
      dispatch(crud.list({ entity }));
    }
  }, [isSuccess]);

  return (
    <Loader
      isLoading={isLoading}
      children={
        <Form form={form} layout="vertical" onFinish={onFinish}>
          {dataTable.map((field) => (
            <Item
              key={field.dataIndex}
              name={field.key}
              label={field.title}
              rules={[
                {
                  required: true,
                  message: `Please input your ${field.title}!`,
                },
              ]}
            >
              {field.ref ? (
                <SelectAsyncFeature entity={field.title} />
              ) : field.title == "Gender" ? (
                <Select>
                  <Option value="male">Male</Option>
                  <Option value="female">Female</Option>
                </Select>
              ) : field.Number ? (
                <Input type="number" />
              ) : field.Date ? (
                <DatePicker format={"DD/MM/YYYY"} />
              ) : (
                <Input autoComplete="off" />
              )}
            </Item>
          ))}
          {/* {["Admin", "Employee"].includes(entity) && (
            <Item
              name={"password"}
              label={"Password"}
              rules={[
                {
                  required: true,
                  message: "Please input your Password!",
                },
              ]}
            >
              <Password
                placeholder="input password"
                autoComplete="new-password"
              />
            </Item>
          )} */}
          <Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Item>
        </Form>
      }
    />
  );
}

export default CreateForm;
