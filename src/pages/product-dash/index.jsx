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
import { CORE_BACKEND_URL } from "../../helpers/url_helper";

function ProductDash(props) {
  document.title = "Product Dashboard | Balck Storm Admin Dashboard";

  const [orderData, setOrderData] = React.useState([]);
  const [cardData, setCardData] = React.useState({});
  const [graphPeriod, setGraphPeriod] = React.useState("day");

  React.useLayoutEffect(() => {
    fetch(`${CORE_BACKEND_URL}/ecom_full/static/orders/`, {
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
    fetch(`${CORE_BACKEND_URL}/ecom_full/static/get-sales-data/`, {
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

  const graphPeriodMap = {
    hour: ["Hourly", "hour"],
    day: ["Daily", "day"],
    month: ["Monthly", "month"],
    year: ["Yearly", "year"],
  };

  return (
    <div className="page-content">
      <Container fluid={true}>
        <Breadcrumbs
          title="Product Dashboard"
          breadcrumbItem={"Product Info Dashboard"}
        />
        <Row>
          <Col>
            <Card>
              <CardBody>
                <div className="d-sm-flex flex-wrap">
                  <CardTitle>
                    {graphPeriodMap[graphPeriod][0]} Sales Data
                  </CardTitle>
                  <div className="ms-auto">
                    <ul className="nav nav-pills">
                      {Object.values(graphPeriodMap).map((item, index) => {
                        return (
                          <li className="nav-item">
                            <Link
                              onClick={() => {
                                setGraphPeriod(item[1]);
                              }}
                              to="#"
                              className={`nav-link ${
                                graphPeriod === item[1] ? "active" : ""
                              }`}
                            >
                              {item[0]}
                            </Link>
                          </li>
                        );
                      })}
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
        <RevenueCard cardData={cardData} graphPeriod={graphPeriod} />
        <TableComp orderData={orderData} />
      </Container>
    </div>
  );
}

export default ProductDash;
