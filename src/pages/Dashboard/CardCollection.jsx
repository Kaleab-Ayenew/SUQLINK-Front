import React from "react";
import { Container, Row, Col, Card, CardBody, CardTitle } from "reactstrap";

function RevenueCard(props) {
  const data = [
    {
      title: `Total Sales`,
      description:
        props.statData.total_sales !== null ||
        props.statData.total_sales !== undefined
          ? `${props.statData.total_sales}`
          : "0",
      iconClass: "bx bx-euro",
    },
    {
      title: `Total Income (ETB)`,
      description: props.statData.total_income || "0",
      iconClass: "bx bx-euro",
    },
  ];

  return (
    <Row>
      {data.map((report, key) => (
        <Col md="4" key={"_col_" + key}>
          <Card className="mini-stats-wid">
            <CardBody>
              <div className="d-flex">
                <div className="flex-grow-1">
                  <p className="text-muted fw-medium">{report.title}</p>
                  <h4 className="mb-0">{report.description}</h4>
                </div>
                <div className="avatar-sm rounded-circle bg-primary align-self-center mini-stat-icon">
                  <span className="avatar-title rounded-circle bg-primary">
                    <i
                      className={"bx " + report.iconClass + " font-size-24"}
                    ></i>
                  </span>
                </div>
              </div>
            </CardBody>
          </Card>
        </Col>
      ))}
    </Row>
  );
}

export default RevenueCard;
