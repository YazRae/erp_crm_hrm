import { Col, Row } from "antd";
import dayjs from "dayjs";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useCrudContext } from "../../context/crud/index.jsx";
import { selectCurrentItem } from "../../redux/crud/selectors.js";
import { valueByString } from "../../utils";

function ReadItemPanel({ config }) {
  const { dataTable } = config;

  const { result: currentResult } = useSelector(selectCurrentItem);
  const { state } = useCrudContext();
  const { isReadBoxOpen } = state;
  const [list, setList] = useState([]);

  const isFirstRun = useRef(true);

  useEffect(() => {
    if (isFirstRun.current) {
      isFirstRun.current = false;
      return;
    }
    const list = [];
    // dataTable.map((props) => {
    //   const value = props.isDate
    //     ? dayjs(value).format("DD/MM/YYYY")
    //     : valueByString(currentResult, props.dataIndex);

    //   list.push({
    //     propsKey: props.dataIndex,
    //     label: props.title,
    //     value: value,
    //   });
    // });
    setList(list);
  }, [currentResult]);

  const show = isReadBoxOpen
    ? { display: "block", opacity: 1 }
    : { display: "none", opacity: 0 };

  const itemsList = list.map((item) => {
    return (
      <Row key={item.propsKey} gutter={12}>
        <Col className="gutter-row" span={8}>
          <p>{item.label}</p>
        </Col>
        <Col className="gutter-row" span={2}>
          <p> : </p>
        </Col>
        <Col className="gutter-row" span={14}>
          <p>{item.value}</p>
        </Col>
      </Row>
    );
  });

  return <div style={show}>{itemsList}</div>;
}

export default ReadItemPanel;
