import React from "react";
import {
  Row,
  Col,
  CardBody,
  Card,
  Alert,
  Container,
  Input,
  Label,
  Form,
} from "reactstrap";

//redux
import { useDispatch } from "react-redux";

import { Link } from "react-router-dom";

// import images
import profileImg from "../../assets/images/profile-img.png";
import logoImg from "../../assets/images/logo.svg";

// My Imports
import { CORE_BACKEND_URL } from "../../helpers/url_helper";
import { useNavigate } from "react-router-dom";

const Register = (props) => {
  document.title =
    "Register | BlackStorm - Vite React Admin & Dashboard Template";

  const navigate = useNavigate();

  // Component States
  const [registrationError, setRegistrationError] = React.useState();
  const [registerSuccess, setRegisterSuccess] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    const fdata = new FormData(e.target);
    setLoading(true);
    fetch(`${CORE_BACKEND_URL}/suqlink/register/`, {
      method: "POST",
      body: fdata,
    })
      .then((rsp) => {
        setLoading(false);
        if (rsp.ok) {
          rsp.json().then((data) => {
            localStorage.setItem("regInfo", JSON.stringify(data));
            setRegisterSuccess(true);
            setTimeout(() => {
              navigate(`/verify-email/${data.temp_data_uuid}`);
            }, 3000);
          });
        } else {
          rsp.json().then((data) => {
            console.log(data);
            const errMsg = [];
            Object.keys(data).forEach((k) => errMsg.push(`${k}:\n${data[k]}`));
            const errTxt = errMsg.join("\n *** \n");
            setRegistrationError(errTxt);
          });
        }
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
        setRegistrationError(err.message);
      });
  }

  return (
    <React.Fragment>
      <div className="home-btn d-none d-sm-block">
        <Link to="/" className="text-dark">
          <i className="bx bx-home h2" />
        </Link>
      </div>
      <div className="account-pages my-5 pt-sm-5">
        <Container>
          <Row className="justify-content-center">
            <Col md={8} lg={6} xl={5}>
              <Card className="overflow-hidden">
                <div className="bg-primary bg-soft">
                  <Row>
                    <Col className="col-7">
                      <div className="text-primary p-4">
                        <h5 className="text-primary">Free Register</h5>
                        <p>Get your free SUQLINK account now.</p>
                      </div>
                    </Col>
                    <Col className="col-5 align-self-end">
                      <img src={profileImg} alt="" className="img-fluid" />
                    </Col>
                  </Row>
                </div>
                <CardBody className="pt-0">
                  <div>
                    <Link to="/">
                      <div className="avatar-md profile-user-wid mb-4">
                        <span className="avatar-title rounded-circle bg-light">
                          <img
                            src={logoImg}
                            alt=""
                            className="rounded-circle"
                            height="60"
                          />
                        </span>
                      </div>
                    </Link>
                  </div>
                  <div className="p-2">
                    <Form className="form-horizontal" onSubmit={handleSubmit}>
                      {registerSuccess ? (
                        <Alert color="success">
                          Register User Successfully
                        </Alert>
                      ) : null}

                      {registrationError ? (
                        <Alert color="danger">{registrationError}</Alert>
                      ) : null}

                      <div className="mb-3">
                        <Label className="form-label">Email</Label>
                        <Input
                          id="seller_email"
                          name="seller_email"
                          className="form-control"
                          placeholder="Enter email"
                          type="email"
                        />
                      </div>

                      <div className="mb-3">
                        <Label className="form-label">Password</Label>
                        <Input
                          name="seller_password"
                          type="password"
                          placeholder="Enter Password"
                        />
                      </div>

                      <div className="mt-4">
                        <button
                          className="btn btn-primary btn-block "
                          type="submit"
                        >
                          {loading ? (
                            <i className="bx bx-loader bx-spin font-size-16 align-middle me-2"></i>
                          ) : null}
                          Register
                        </button>
                      </div>

                      <div className="mt-4 text-center">
                        <p className="mb-0">
                          By registering you agree to the SUQLINK{" "}
                          <Link to="#" className="text-primary">
                            Terms of Use
                          </Link>
                        </p>
                      </div>
                    </Form>
                  </div>
                </CardBody>
              </Card>
              <div className="mt-5 text-center">
                <p>
                  Already have an account ?{" "}
                  <Link to="/login" className="font-weight-medium text-primary">
                    {" "}
                    Login
                  </Link>{" "}
                </p>
                <p>
                  © {new Date().getFullYear()} SUQLINK.COM Crafted with{" "}
                  <i className="mdi mdi-heart text-danger" /> by Black Storm
                  Technologies
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default Register;
