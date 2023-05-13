import React from "react";
import { Container, Row, Col, Card, CardBody, CardTitle } from "reactstrap";

function RevenueCard(props) {
  const reports = [
    {
      title: "Revenue",
      description: "ETB 50000.00",
      iconClass: "bx bx-euro",
    },
    {
      title: "Revenue",
      description: "ETB 50000.00",
      iconClass: "bx bx-euro",
    },
    {
      title: "Revenue",
      description: "ETB 50000.00",
      iconClass: "bx bx-euro",
    },
  ];

  const data = [
    {
      title: "Past Hour Revenue",
      description: `ETB ${props.cardData.total_sales}.00`,
      iconClass: "bx bx-euro",
    },
    {
      title: "Past Hour Orders",
      description: props.cardData.total_orders,
      iconClass: "bx bx-euro",
    },
    {
      title: "All Orders",
      description: props.cardData.all_orders,
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
