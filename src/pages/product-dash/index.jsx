import React from "react";
import Breadcrumbs from "../../components/Common/Breadcrumb";
import { Container, Row, Col, Card, CardBody, CardTitle } from "reactstrap";
import { Link } from "react-router-dom";

import Line from "./LineGraph";
import RevenueCard from "./CardCollection";
import TableComp from "./TableComp";
import BadgesComp from "./BadgesComp";
import { Badge } from "reactstrap";
import DeleteModal from "../../components/Common/DeleteModal";

function ProductDash(props) {
  const [orderData, setOrderData] = React.useState([]);
  const [cardData, setCardData] = React.useState({});
  const [graphPeriod, setGraphPeriod] = React.useState("now");

  React.useLayoutEffect(() => {
    fetch("http://127.0.0.1:8000/ecom_full/static/orders/", {
      headers: {
        Authorization: `Token ${
          JSON.parse(localStorage.getItem("authUser")).token
        }`,
      },
    })
      .then((rsp) => rsp.json())
      .then((data) => {
        console.log(data);
        setOrderData(data);
      });
    fetch("http://127.0.0.1:8000/ecom_full/static/get-sales-data/", {
      headers: {
        Authorization: `Token ${
          JSON.parse(localStorage.getItem("authUser")).token
        }`,
      },
    })
      .then((rsp) => rsp.json())
      .then((data) => {
        console.log(data);
        setCardData(data);
      });
  }, []);
  return (
    <div className="page-content">
      <Container fluid={true}>
        <Breadcrumbs
          title="AKalish Experminet Page"
          breadcrumbItem={"AKalish Exp"}
        />
        <Row>
          <Col>
            <Card>
              <CardBody>
                <div className="d-sm-flex flex-wrap">
                  <CardTitle>Monthly Sales Data</CardTitle>
                  <div className="ms-auto">
                    <ul className="nav nav-pills">
                      <li className="nav-item">
                        <Link
                          onClick={() => {
                            setGraphPeriod("now");
                          }}
                          to="#"
                          className={`nav-link ${
                            graphPeriod === "now" ? "active" : ""
                          }`}
                        >
                          To Now
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link
                          onClick={() => {
                            setGraphPeriod("all");
                          }}
                          to="#"
                          className={`nav-link ${
                            graphPeriod === "all" ? "active" : ""
                          }`}
                        >
                          All Hours
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>

                <div id="line-chart" className="e-chart">
                  <Line
                    graphPeriod={graphPeriod}
                    orderData={orderData}
                    dataColors='["--bs-success"]'
                  />
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <RevenueCard cardData={cardData} />
        <TableComp orderData={orderData} />
        <BadgesComp />
      </Container>
    </div>
  );
}

export default ProductDash;
