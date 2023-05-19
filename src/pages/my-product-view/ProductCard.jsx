import { Link } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
  CardImg,
  CardText,
} from "reactstrap";

import React from "react";
import { splitArray } from "./utils";

function ProductCard(props) {
  const data = props.productList;
  console.log(data, "This is data");
  const splitedData = splitArray(data, 4);
  console.log(splitedData);
  return splitedData.map((item) => (
    <Row>
      {item.map((p) => (
        <Col mg={4} xl={3}>
          <Card>
            <CardImg
              top
              // className="img-fluid"
              src={p.images[0].img}
              alt="Skote"
            />
            <CardBody>
              <CardTitle className="mt-0">{p.title}</CardTitle>
              <CardText>
                {p.desc.replace(/<[^>]*>/g, "").substr(0, 100)}
              </CardText>
              <Link to={`/products/${p.slug}`} className="btn btn-primary">
                View Details
              </Link>
            </CardBody>
          </Card>
        </Col>
      ))}
    </Row>
  ));
}

export default ProductCard;
