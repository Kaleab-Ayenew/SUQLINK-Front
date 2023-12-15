import React from "react";
import Breadcrumbs from "../../components/Common/Breadcrumb";
import { Container, Row, Col, Card, CardBody, CardTitle } from "reactstrap";
import { Link } from "react-router-dom";

import Line from "./LineGraph";
import RevenueCard from "./CardCollection";
import TableComp from "./TableComp";
import SaleRankTable from "./SaleRankTable";
import BadgesComp from "./BadgesComp";
import { Badge } from "reactstrap";
import DeleteModal from "../../components/Common/DeleteModal";
import { CORE_BACKEND_URL } from "../../helpers/url_helper";
import YoutubeSale from "../YoutubePage";
import YvideosTable from "./YoutubeVideosTable";

function SellerDash(props) {
  document.title = "Product Dashboard | Suqlink Admin Dashboard";

  const [statData, setStatData] = React.useState({ product_stats: [] });
  const [videoStats, setVideoStats] = React.useState({ video_stats: [] });
  const [cardData, setCardData] = React.useState({});
  const [graphPeriod, setGraphPeriod] = React.useState("day");
  let all_sales = [];
  let all_vid_sales = [];
  statData?.product_stats?.forEach((product) => {
    product?.product_sales?.forEach((val) => {
      all_sales.push(val);
    });
  });

  videoStats?.video_stats?.forEach((video) => {
    video?.video_sales?.forEach((val) => {
      all_vid_sales.push(val);
    });
  });

  React.useLayoutEffect(() => {
    fetch(`${CORE_BACKEND_URL}/suqlink/stats/`, {
      headers: {
        Authorization: `Token ${
          JSON.parse(localStorage.getItem("authUser")).token
        }`,
      },
    })
      .then((rsp) => rsp.json())
      .then((data) => {
        setStatData(data);
      });

    fetch(`${CORE_BACKEND_URL}/suqlink/yvideos/s/stats/`, {
      headers: {
        Authorization: `Token ${
          JSON.parse(localStorage.getItem("authUser")).token
        }`,
      },
    })
      .then((rsp) => rsp.json())
      .then((data) => {
        setVideoStats(data);
      });
  }, []);

  const graphPeriodMap = {
    hour: ["Current Hour", "hour"],
    day: ["Current Day", "day"],
    month: ["Current Month", "month"],
    year: ["Current Year", "year"],
  };

  return (
    <div className="page-content">
      <Container fluid={true}>
        <Breadcrumbs
          title="Sale Statistics"
          breadcrumbItem={"Sales Info Dashboard"}
        />
        <Row>
          <Col>
            <Card>
              <CardBody>
                <div className="d-sm-flex flex-wrap">
                  <CardTitle>
                    Revenue Data for {graphPeriodMap[graphPeriod][0]}
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
                    statData={statData}
                    dataColors='["--bs-success"]'
                  />
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <RevenueCard statData={statData} graphPeriod={graphPeriod} />
        <YvideosTable statData={videoStats} />
        <SaleRankTable statData={statData} />
        <TableComp statData={statData} />
      </Container>
    </div>
  );
}

export default SellerDash;
