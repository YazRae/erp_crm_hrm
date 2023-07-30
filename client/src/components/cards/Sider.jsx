import { Col, Row } from "antd";
import { CreateForm } from "../forms";
import { SidePanelTopContent } from "../panels";

function SiderCard({ config, buttonTitle, isCollapsed, onCollapse }) {
  const collapsed = isCollapsed ?? "collapsed";

  const showTop = isCollapsed
    ? { display: "block", opacity: 1 }
    : { display: "none", opacity: 0 };

  const showBottom = !isCollapsed
    ? { display: "block", opacity: 1 }
    : { display: "none", opacity: 0 };

  return (
    <div className="panelBox">
      <div className="TopCollapseBox">
        <div style={showTop}>
          <Row>
            <Col span={24}>
              <SidePanelTopContent config={config} />
            </Col>
          </Row>
        </div>
      </div>

      <div className={"collapseBox " + collapsed}>
        <div className="collapseBoxHeader" onClick={onCollapse}>
          {buttonTitle}
        </div>

        <div className="whiteBg"></div>

        <div className="BottomCollapseBox">
          <div style={showBottom}>
            <Row>
              <Col span={24}>
                <CreateForm config={config} />
              </Col>
            </Row>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SiderCard;
