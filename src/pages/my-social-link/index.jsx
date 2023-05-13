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
  document.title =
    "Social Link | Skote - Vite React Admin & Dashboard Template";
  const [login, setLogin] = React.useState(false);
  const [data, setData] = React.useState({});
  const [picture, setPicture] = React.useState("");

  const responseFacebook = (response) => {
    console.log(response);
    // setData(response);
    // setPicture(response.picture.data.url);
    // if (response.accessToken) {
    //   setLogin(true);
    // } else {
    //   setLogin(false);
    // }
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
                  With supporting text below as a natural lead-in to additional
                  content.
                </CardText>
                {/* <Link to="#" className="btn btn-primary">
                  Login with Facebook
                </Link> */}
                <FacebookLogin
                  appId="897403791338730"
                  autoLoad={true}
                  //   fields="name,email,picture"
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
