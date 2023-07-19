import React from "react";
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
  };
  let sales_rank_data = [];
  stdata.product_stats.forEach((product) => {
    product.product_sales.forEach((val) => {
      sales_rank_data.push({
        product_name: product.product_name,
        product_total_sales: product.product_sales.length,
        product_total_income:
          product.product_sales.length *
          parseFloat(product.product_price) *
          0.8,
      });
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
                  {data.map((order) => (
                    <tr>
                      {Object.values(order).map((val, index) => {
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
