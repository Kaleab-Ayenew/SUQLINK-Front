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

function TableComp(props) {
  const stdata = props.statData;
  const tableNames = {
    sale_timestamp: "Sale Time",
    completed: "Payment Status",
    sold_product: "Product Link",
    product_name: "Product Name",
  };
  let all_sales = [];
  stdata.product_stats.forEach((product) => {
    product.product_sales.forEach((val) => {
      all_sales.push({
        product_name: product.product_name,
        ...val,
        completed: val.completed ? "Completed" : "Waiting",
      });
    });
  });
  const data = all_sales.map((s) => {
    const t = new Date(s.sale_timestamp);
    const newObj = {
      ...s,
      sale_timestamp: t.toLocaleDateString(),
    };
    return newObj;
  });
  function formatTitle(t) {
    var newStr = t
      .split("_")
      .map((str) => str.charAt(0).toUpperCase() + str.slice(1));

    return newStr.join(" ");
  }
  return (
    <Row>
      <Col>
        <Card>
          <CardBody>
            <CardTitle className="h4">Product Sales</CardTitle>
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

export default TableComp;
