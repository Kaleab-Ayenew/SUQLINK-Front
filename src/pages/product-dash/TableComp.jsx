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
  const ordata = props.orderData;
  const data = ordata.map((o) => {
    const t = new Date(o.order_time);
    const newObj = { ...o, order_time: t.toLocaleDateString() };
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
            <CardTitle className="h4">Product Orders</CardTitle>
            {/* <CardSubtitle className="card-title-desc">
              
            </CardSubtitle> */}

            <div className="table-responsive">
              <Table className="table table-striped mb-0">
                <thead>
                  <tr>
                    {data[0] &&
                      Object.keys(data[0]).map((k) => (
                        <th>{formatTitle(k)}</th>
                      ))}
                  </tr>
                </thead>
                <tbody>
                  {data.map((order) => (
                    <tr>
                      {Object.values(order).map((val, index) => {
                        console.log(val, index);
                        return index === 0 ? <th>{val}</th> : <td>{val}</td>;
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
