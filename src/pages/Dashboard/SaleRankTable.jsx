import React from "react";
import { round } from "lodash";
import { Link } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
  Table,
  Badge,
} from "reactstrap";

import { PaymentStatus } from "./BillingStuff";

function SaleRankTable(props) {
  const stdata = props.statData;
  const tableNames = {
    product_name: "Product Name",
    product_total_sales: "Total Product Sales",
    product_total_income: "Total Product Sale Income (ETB)",
    edit_link: "Edit Product",
    product_link: "Product Link",
  };
  let sales_rank_data = [];
  stdata.product_stats.forEach((product) => {
    sales_rank_data.push({
      product_name: product.product_name,
      product_total_sales: product.product_sales.length,
      product_total_income: round(
        product.product_sales.length * parseFloat(product.product_price) * 0.8,
        2
      ),
      edit_link: [
        <Link to={"/edit/" + product.product_id}>edit product info</Link>,
      ],
      product_link: `https://p.suqlink.com/p/${product.product_id}`,
    });
  });
  const data = sales_rank_data;

  return (
    <Row>
      <Col>
        <Card>
          <CardBody>
            <CardTitle className="h4">Product Sale Ranks</CardTitle>
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

export default SaleRankTable;
