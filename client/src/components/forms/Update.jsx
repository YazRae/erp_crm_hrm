import { Button, DatePicker, Form, Input, Select } from "antd";
import dayjs from "dayjs";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Loader } from "../../components/app";
import { useCrudContext } from "../../context/crud";
import { Update } from "../../redux/api/entityApiSlice";
import { crud } from "../../redux/crud/actions.js";
import { selectUpdatedItem } from "../../redux/crud/selectors.js";
import { SelectAsyncFeature } from "../features";

function UpdateForm({ config }) {
  const { entity, dataTable } = config;
  const { Option } = Select;
  const { Password } = Input;

  const dispatch = useDispatch();
  const { current } = useSelector(selectUpdatedItem);

  const { crudContextAction } = useCrudContext();

  const { panel, collapsedBox, readBox } = crudContextAction;

  const showCurrentRecord = () => {
    readBox.open();
  };

  const [form] = Form.useForm();
  const { Item } = Form;

  const [update, { isError, isLoading, isSuccess, reset }] = Update();

  if (isError) {
    reset();
  }

  const onSubmit = (body) => {
    const id = current._id;
    update({ entity, id, body });
  };

  useEffect(() => {
    if (current) {
      let newValues = { ...current };
      if (newValues.birthday) {
        newValues = {
          ...newValues,
          birthday: dayjs(newValues["birthday"]),
        };
      }
      if (newValues.date) {
        newValues = {
          ...newValues,
          date: dayjs(newValues["date"]),
        };
      }
      if (newValues.expiredDate) {
        newValues = {
          ...newValues,
          expiredDate: dayjs(newValues["expiredDate"]),
        };
      }
      if (newValues.created) {
        newValues = {
          ...newValues,
          created: dayjs(newValues["created"]),
        };
      }
      if (newValues.updated) {
        newValues = {
          ...newValues,
          updated: dayjs(newValues["updated"]),
        };
      }

      form.setFieldsValue(newValues);
    }
  }, [current]);

  useEffect(() => {
    if (isSuccess) {
      readBox.open();
      collapsedBox.open();
      panel.open();
      form.resetFields();
      dispatch(crud.resetAction({ actionType: "update" }));
      dispatch(crud.list({ entity }));
    }
  }, [isSuccess]);

  const content = (
    <div>
      <Loader
        isLoading={isLoading}
        children={
          <Form form={form} layout="vertical" onFinish={onSubmit}>
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
                {field.title == "Role" ? (
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
            <Item
              style={{
                display: "inline-block",
                paddingRight: "5px",
              }}
            >
              <Button type="primary" htmlType="submit">
                Update
              </Button>
            </Item>
            <Item
              style={{
                display: "inline-block",
                paddingLeft: "5px",
              }}
            >
              <Button onClick={showCurrentRecord}>Cancel</Button>
            </Item>
          </Form>
        }
      />
    </div>
  );

  return content;
}

export default UpdateForm;
