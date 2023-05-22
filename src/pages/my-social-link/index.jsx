import React from "react";
import { useCallback, useState } from "react";
import { Link } from "react-router-dom";
import { FacebookLoginButton } from "react-social-login-buttons";
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

import {
  LoginSocialGoogle,
  LoginSocialAmazon,
  LoginSocialFacebook,
  LoginSocialGithub,
  LoginSocialInstagram,
  LoginSocialLinkedin,
  LoginSocialMicrosoft,
  LoginSocialPinterest,
  LoginSocialTwitter,
  LoginSocialApple,
  LoginSocialTiktok,
} from "reactjs-social-login";

// CUSTOMIZE ANY UI BUTTON
import {
  FacebookLoginButton,
  GoogleLoginButton,
  GithubLoginButton,
  AmazonLoginButton,
  InstagramLoginButton,
  LinkedInLoginButton,
  MicrosoftLoginButton,
  TwitterLoginButton,
  AppleLoginButton,
} from "react-social-login-buttons";

import { ReactComponent as PinterestLogo } from "./assets/pinterest.svg";
import { ReactComponent as TiktokLogo } from "./assets/tiktok.svg";

// REDIRECT URL must be same with URL where the (reactjs-social-login) components is locate
// MAKE SURE the (reactjs-social-login) components aren't unmounted or destroyed before the ask permission dialog closes
const REDIRECT_URI = window.location.href;

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
                {/* <FacebookLogin
                  appId="1330933267773992"
                  fields="name"
                  callback={responseFacebook}
                  redirectUri="https://pc-dash.blackstormtech.com/product-dash"
                /> */}
                <LoginSocialFacebook
                  isOnlyGetToken
                  appId={"897403791338730"}
                  onLoginStart={() => {
                    console.log("Login has started");
                  }}
                  onResolve={(data) => {
                    console.log(data);
                  }}
                  onReject={(err) => {
                    console.log(err);
                  }}
                ></LoginSocialFacebook>
              </Card>
            </Col>
          </div>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default SocialLink;
