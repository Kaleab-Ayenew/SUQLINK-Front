import React from "react";
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

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";

import ProductCard from "./ProductCard";

const MyProductList = () => {
  //meta title
  document.title = "Product List Page";

  const [productList, setProdcutList] = React.useState([]);

  React.useLayoutEffect(() => {
    fetch("http://127.0.0.1:8000/ecom_full/static/product.json")
      .then((rsp) => rsp.json())
      .then((data) => {
        console.log(data);
        setProdcutList(data);
      });
  }, []);

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumbs */}
          <Breadcrumbs title="Product List" breadcrumbItem="My Product List" />
          <ProductCard productList={productList} />
        </Container>
      </div>
    </React.Fragment>
  );
};

export default MyProductList;
