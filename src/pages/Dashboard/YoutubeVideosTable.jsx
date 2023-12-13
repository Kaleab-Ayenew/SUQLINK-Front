import React from "react";
import { round } from "lodash";
import { Link } from "react-router-dom";
import { Row, Col, Card, CardBody, CardTitle, Table } from "reactstrap";

function YvideosTable(props) {
  const stdata = props.statData;
  const tableNames = {
    product_name: "Video Name",
    product_total_sales: "Total Video Sales",
    product_total_income: "Total Video Sale Income (ETB)",
    edit_link: "Edit Video",
    product_link: "Video Link",
    product_price: "Video Price",
  };
  let sales_rank_data = [];
  stdata.video_stats.forEach((video) => {
    let completed_sales = video.video_sales.filter((item) => {
      return item.completed === true;
    });
    sales_rank_data.push({
      product_name: video.video_info.title,
      product_price: video.video_price,
      product_total_sales: completed_sales.length,
      product_total_income: round(
        completed_sales.length * parseFloat(video.video_price) * 0.8,
        2
      ),
      edit_link: [
        <Link to={"/video-edit/" + video.platform_id}>edit product info</Link>,
      ],
      product_link: `https://suqlink-youtube-market.vercel.app/videos/${video.platform_id}`,
    });
  });
  const data = sales_rank_data;

  return (
    <Row>
      <Col>
        <Card>
          <CardBody>
            <CardTitle className="h4">All Videos</CardTitle>
            {/* <CardSubtitle className="card-title-desc">
              
            </CardSubtitle> */}

            <div className="table-responsive">
              <Table className="table table-striped mb-0">
                <thead>
                  <tr>
                    {data[0] &&
                      Object.keys(data[0]).map((k) => <th>{tableNames[k]}</th>)}
                  </tr>
                </thead>
                <tbody>
                  {data.map((sale) => (
                    <tr>
                      {Object.values(sale).map((val, index) => {
                        return <td>{val}</td>;
                      })}
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          </CardBody>
        </Card>
      </Col>
    </Row>
  );
}

export default YvideosTable;
