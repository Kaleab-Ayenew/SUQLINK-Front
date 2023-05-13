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
import { CORE_BACKEND_URL } from "../../helpers/url_helper";

const MyProductList = () => {
  //meta title
  document.title = "Product List Page";

  const [productList, setProdcutList] = React.useState([]);

  React.useLayoutEffect(() => {
    fetch(`${CORE_BACKEND_URL}/ecom_full/static/product.json`)
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
