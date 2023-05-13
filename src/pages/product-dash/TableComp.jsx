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
  const data = props.orderData;
  return (
    <Row>
      <Col>
        <Card>
          <CardBody>
            <CardTitle className="h4">Striped rows</CardTitle>
            <CardSubtitle className="card-title-desc">
              Use <code>.table-striped</code> to add zebra-striping to any table
              row within the <code>&lt;tbody&gt;</code>.
            </CardSubtitle>

            <div className="table-responsive">
              <Table className="table table-striped mb-0">
                <thead>
                  <tr>
                    {data[0] && Object.keys(data[0]).map((k) => <th>{k}</th>)}
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
