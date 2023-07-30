import { SearchOutlined } from "@ant-design/icons";
import { Empty, Select } from "antd";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useDebounce } from "react-use";
import { useCrudContext } from "../../context/crud";
import { crud } from "../../redux/crud/actions.js";
import { selectSearchedItems } from "../../redux/crud/selectors.js";
import store from "../../redux/store";
import { Search } from "../../redux/api/entityApiSlice";

function EntitySearchFeature({ config }) {
  const {
    crudContextAction: { panel, collapsedBox, readBox },
  } = useCrudContext();
  const dispatch = useDispatch();
  const {
    dataTable,
    searchConfig: { displayLabels, outputValue = "_id" },
    entity,
  } = config;
  const { Option } = Select;

  // const { result, isLoading, isSuccess } = useSelector(selectSearchedItems);

  const [options, setOptions] = useState([]);
  const [currentValue, setCurrentValue] = useState(undefined);
  const [state, setState] = useState([0]);
  const [searching, setSearching] = useState(false);
  const [valToSearch, setValToSearch] = useState("");
  const [searchInput, setSearchInput] = useState("");

  const isSearching = useRef(false);

  const [
    fn,
    {
      currentData,
      data,
      isError,
      isFetching,
      isLoading,
      isSuccess,
      isUninitialized,
      status,
    },
    { lastArg },
  ] = Search();

  const { result } = isSuccess && data;

  useEffect(() => {
    if (searchInput != "") {
      const searchFields = dataTable.map((value) => value.title);
      const args = { entity, searchFields, searchInput };
      fn(args);
    }
    return () => {
      cancel();
    };
  }, [entity, searchInput]);

  useEffect(() => {
    if (isSearching.current) {
      if (isSuccess) {
        setOptions(result);
      } else {
        setSearching(false);
        setCurrentValue(undefined);
        setOptions([]);
      }
    }
  }, [isSuccess, result]);

  const [, cancel] = useDebounce(
    () => {
      setSearchInput(valToSearch);
    },
    500,
    [valToSearch]
  );

  const labels = (optionField) => {
    return displayLabels.map((x) => optionField[x]).join(" ");
  };

  const onRerender = () => {
    setState([state + 1]);
  };

  const onSearch = (searchedText) => {
    if (searchedText && searchedText != "") {
      isSearching.current = true;
      setSearching(true);
      setOptions([]);
      setCurrentValue(undefined);
      setValToSearch(searchedText);
    }
  };

  const onSelect = (data) => {
    const currentItem = result.find((item) => {
      return item[outputValue] === data;
    });

    dispatch(crud.currentItem({ data: currentItem }));

    panel.open();
    collapsedBox.open();
    readBox.open();
    onRerender();
  };

  return state.map((comp) => (
    <Select
      key={comp}
      loading={isLoading}
      showSearch
      allowClear
      placeholder={
        <SearchOutlined style={{ float: "right", padding: "8px 0" }} />
      }
      defaultActiveFirstOption={false}
      showArrow={false}
      filterOption={false}
      notFoundContent={searching ? "... Searching" : <Empty />}
      value={currentValue}
      onSearch={onSearch}
      style={{ width: "100%" }}
      onSelect={onSelect}
    >
      {options.map((optionField) => (
        <Option key={optionField[outputValue]} value={optionField[outputValue]}>
          {labels(optionField)}
        </Option>
      ))}
    </Select>
  ));
}

export default EntitySearchFeature;
