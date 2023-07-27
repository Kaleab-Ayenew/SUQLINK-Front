import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardBody,
  Col,
  Container,
  Row,
  Label,
  Input,
  Form,
  Alert,
} from "reactstrap";

// import images
import logodark from "../../assets/images/logo-dark.png";
import logolight from "../../assets/images/logo-light.png";

// With Router Import
import withRouter from "../../components/Common/withRouter";

// Back End URL Import
import { CORE_BACKEND_URL } from "../../helpers/url_helper";

const MyEmailVerification = (props) => {
  //meta title
  document.title = "Email Verification | SUQLINK";

  const [loading, setLoading] = React.useState(false);
  const regCode = getRegCode();
  const [error, setError] = React.useState("");

  const navigate = useNavigate();
  function handleSubmit(e) {
    e.preventDefault();
    const fdata = new FormData(e.target);
    setLoading(true);
    fetch(`${CORE_BACKEND_URL}/suqlink/email/verify/${regCode}/`, {
      method: "POST",
      body: fdata,
    })
      .then((rsp) => {
        setLoading(false);
        if (rsp.status === 201) {
          rsp.json().then((data) => {
            localStorage.setItem("authUser", JSON.stringify(data));
            navigate(`/dashboard`);
          });
        } else if (rsp.status === 401 || rsp.status === 400) {
          rsp.json().then((data) => {
            console.log(data);
            const errMsg = [];
            Object.keys(data).forEach((k) => errMsg.push(`${k}:\n${data[k]}`));
            const errTxt = errMsg.join("\n *** \n");
            setError(errTxt);
          });
        } else {
          setError("An error has occured!");
        }
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
        setError(err.message);
      });
  }

  function getRegCode() {
    if (!props.router.params.registration_code) {
      navigate("/register");
    } else {
      return props.router.params.registration_code;
    }
  }
  return (
    <React.Fragment>
      <div className="account-pages my-5 pt-sm-5">
        <Container>
          <Row>
            <Col lg={12}>
              <div className="text-center mb-5 text-muted">
                <Link to="dashboard" className="d-block auth-logo">
                  <img
                    src={logodark}
                    alt=""
                    height="20"
                    className="auth-logo-dark mx-auto"
                  />
                  <img
                    src={logolight}
                    alt=""
                    height="20"
                    className="auth-logo-light mx-auto"
                  />
                </Link>
                <p className="mt-3">React Admin & Dashboard Template</p>
              </div>
            </Col>
          </Row>
          <Row className="justify-content-center">
            <Col md={8} lg={6} xl={5}>
              <Card>
                <CardBody>
                  <div className="p-2">
                    <div className="text-center">
                      <div className="avatar-md mx-auto">
                        <div className="avatar-title rounded-circle bg-light">
                          <i className="bx bxs-envelope h1 mb-0 text-primary"></i>
                        </div>
                      </div>
                      <div className="p-2 mt-4">
                        <h4>Verify your email</h4>
                        <p>
                          We have sent a verification code at{" "}
                          <span className="fw-semibold">
                            kalishayish16@gmail.com
                          </span>
                          , Please check it
                        </p>
                        <Form onSubmit={handleSubmit}>
                          <div className="mb-3">
                            <Label className="form-label">
                              Verification Code
                            </Label>
                            {error && <Alert color="danger">{error}</Alert>}

                            <Input
                              name="code"
                              className="form-control"
                              placeholder="Enter verification code"
                              type="text"
                            />
                          </div>
                          <div className="mt-4">
                            <button
                              type="submit"
                              className="btn btn-success w-md"
                            >
                              {loading ? (
                                <i className="bx bx-loader bx-spin font-size-16 align-middle me-2"></i>
                              ) : null}
                              Verify code
                            </button>
                          </div>
                        </Form>
                      </div>
                    </div>
                  </div>
                </CardBody>
              </Card>
              <div className="mt-5 text-center">
                <p>
                  Did&apos;t receive an email ?{" "}
                  <a href="#" className="fw-medium text-primary">
                    {" "}
                    Resend{" "}
                  </a>{" "}
                </p>
                <p>
                  © {new Date().getFullYear()} SUQLINK. Crafted with{" "}
                  <i className="mdi mdi-heart text-danger"></i>
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default withRouter(MyEmailVerification);
