import { Button, DatePicker, Form, Input, Select, InputNumber } from "antd";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useCrudContext } from "../../context/crud";
import { Create, resetState } from "../../redux/api/entityApiSlice";
import { crud } from "../../redux/crud/actions.js";
import Loader from "../app/Loader";
import { SelectAsyncFeature } from "../features";
import store from "../../redux/store";

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

    store.dispatch(create({ entity, body }));
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
              name={field.dataIndex}
              label={field.title}
              rules={[
                {
                  required: true,
                  message: `Please input your ${field.title}!`,
                },
              ]}
            >
              {["Role", "Suppliers"].includes(field.title) ? (
                <SelectAsyncFeature entity={field.title} />
              ) : field.title == "Gender" ? (
                <Select>
                  <Option value="male">Male</Option>
                  <Option value="female">Female</Option>
                </Select>
              ) : field.title == "Cell" ? (
                <Input type="number" />
              ) : field.title == "Company REG Number" ? (
                <Input type="number" format={"DD/MM/YYYY"} />
              ) : field.title == "Birthday" ? (
                <DatePicker format={"DD/MM/YYYY"} />
              ) : (
                <Input autoComplete="off" />
              )}
            </Item>
          ))}
          {["Admin", "Employee"].includes(entity) && (
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
          )}
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
