import React from "react";
import { Container, Row, Col, Card, CardBody, CardTitle } from "reactstrap";

function RevenueCard(props) {
  const data = [
    {
      title: `Past ${props.graphPeriod} Revenue`,
      description: props.cardData.total_sales
        ? `ETB ${props.cardData.total_sales}.00`
        : "0",
      iconClass: "bx bx-euro",
    },
    {
      title: `Past ${props.graphPeriod} Orders`,
      description: props.cardData.total_orders || "0",
      iconClass: "bx bx-euro",
    },
    {
      title: "All Orders",
      description: props.cardData.all_orders || "0",
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
