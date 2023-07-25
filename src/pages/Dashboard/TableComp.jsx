import React from "react";
import { round } from "lodash";
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

function TableComp(props) {
  const stdata = props.statData;
  const tableNames = {
    sale_timestamp: "Sale Time",
    completed: "Payment Status",
    sold_product: "Product ID",
    product_name: "Product Name",
    product_price: "Product Price ( We take 20% fee )",
  };
  let all_sales = [];
  stdata.product_stats.forEach((product) => {
    product.product_sales.forEach((val) => {
      all_sales.push({
        product_name: product.product_name,
        ...val,
        completed: val.completed ? "Completed" : "Waiting",
        product_price: product.product_price,
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

  return (
    <Row>
      <Col>
        <Card>
          <CardBody>
            <CardTitle className="h4">All Product Sales</CardTitle>
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
