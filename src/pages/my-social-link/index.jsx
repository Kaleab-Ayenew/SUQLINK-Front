import React from "react";
import { Link } from "react-router-dom";
import FacebookLogin from "react-facebook-login";
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
  CardText,
} from "reactstrap";

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";

const SocialLink = () => {
  //meta title
  document.title = "Social Link | Balck Storm Admin Dashboard";
  const [login, setLogin] = React.useState(false);
  const [data, setData] = React.useState({});
  const [picture, setPicture] = React.useState("");

  const responseFacebook = (response) => {
    console.log(response);
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumbs */}
          <Breadcrumbs title="Utility" breadcrumbItem="Starter Page" />
          <div className="row justify-content-center">
            <Col lg={6}>
              <Card body>
                <CardTitle className="mt-0">
                  Connect your Facebook Page
                </CardTitle>
                <CardText>
                  Connect your Facebook account to start posting automatically
                  to facebook.
                </CardText>
                {/* <Link to="#" className="btn btn-primary">
                  Login with Facebook
                </Link> */}
                <FacebookLogin
                  appId="897403791338730"
                  autoLoad={true}
                  scope="pages_manage_posts"
                  fields="name"
                  callback={responseFacebook}
                />
                ,
              </Card>
            </Col>
          </div>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default SocialLink;
