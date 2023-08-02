import { Select } from "antd";
import { useEffect, useState } from "react";
import { useAppContext } from "../../context/app";
import { List } from "../../redux/apiSlice.js";

export default function SelectAsync({ entity, value, onChange }) {
  const [isLoading, setIsLoading] = useState(false);
  const [selectOptions, setOptions] = useState([]);
  const [currentValue, setCurrentValue] = useState(undefined);

  const {
    appContextAction: { searchConfig },
  } = useAppContext();

  const outputValue = searchConfig[entity].outputValue;
  const displayLabels = searchConfig[entity].displayLabels;

  const {
    currentData,
    data,
    endpointName,
    fulfilledTimeStamp,
    isError,
    isFetching,
    isLoading: fetchIsLoading,
    isSuccess,
    isUninitialized,
    originalArgs,
    refetch,
    requestId,
    startedTimeStamp,
    status,
  } = List({
    entity,
  });

  const { result, pagination } = isSuccess && data;

  useEffect(() => {
    isSuccess ? setOptions(result) : setOptions([]);
    setIsLoading(fetchIsLoading);
  }, [fetchIsLoading]);

  const labels = (optionField) => {
    return displayLabels.map((x) => optionField[x]).join(" ");
  };

  useEffect(() => {
    // this for update Form , it's for setField
    if (value) {
      setCurrentValue(value[outputValue] || value); // set nested value or value
      onChange(value[outputValue] || value);
    }
  }, [value]);

  return (
    <Select
      loading={isLoading}
      disabled={isLoading}
      value={currentValue}
      showSearch={true}
      onSelect={(value, LabeledValue) => value}
      onChange={(newValue) => {
        setCurrentValue(newValue[outputValue] || newValue);
        if (onChange) {
          onChange(newValue[outputValue] || newValue);
        }
      }}
    >
      {selectOptions.map((optionField) => (
        <Select.Option
          key={optionField[outputValue]}
          value={optionField[outputValue]}
        >
          {labels(optionField)}
        </Select.Option>
      ))}
    </Select>
  );
}
