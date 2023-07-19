import React from "react";
import { Row, Col, Badge, Card, CardBody, CardTitle } from "reactstrap";
function BadgesComp(props) {
  return (
    <Row>
      <Col>
        <Card>
          <CardBody>
            <CardTitle>A Collection of Badges</CardTitle>
            <div className="mt-1">
              <Badge className="badge-soft-primary me-1">Primary</Badge>
              <Badge className="badge-soft-success me-1">Success</Badge>
              <Badge className="badge-soft-info me-1">Info</Badge>
              <Badge className="badge-soft-warning me-1">Warning</Badge>
              <Badge className="badge-soft-danger me-1">Danger</Badge>
              <Badge className="badge-soft-dark me-1">Dark</Badge>
            </div>
          </CardBody>
        </Card>
      </Col>
    </Row>
  );
}

export default BadgesComp;
