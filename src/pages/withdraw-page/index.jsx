import React from "react";
import {
  Container,
  CardTitle,
  Row,
  Col,
  Card,
  CardBody,
  Form,
} from "reactstrap";

import { getAuthData } from "./utils";

import Breadcrumbs from "../../components/Common/Breadcrumb";
import RenderForm from "./RenderForm";
import { formFields } from "./formFields";
import bankOptions from "./formFields";
import { CORE_BACKEND_URL } from "../../helpers/url_helper";
import toastr from "toastr";

export const EditorContext = React.createContext();

const Withdraw = (props) => {
  document.title = "Withdraw page | SUQLINK Admin Dashboard";
  const [formFieldData, setFormFieldData] = React.useState(formFields);
  const [editorState, setEditorState] = React.useState({});
  const [loading, setLoading] = React.useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    let f = new FormData(e.target);

    f.set("chapa_bank", bankOptions[f.get("chapa_bank")].id);
    for (var [key, value] of f.entries()) {
      console.log(key, value);
    }
    setLoading(true);
    fetch(`${CORE_BACKEND_URL}/suqlink/payment/withdraw/`, {
      method: "POST",
      headers: {
        Authorization: `Token ${getAuthData().token}`,
      },
      body: f,
    })
      .then((rsp) => {
        if (rsp.ok) {
          return rsp.json();
        } else if (rsp.status < 500) {
          setLoading(false);
          rsp.json().then((data) => {
            const errMsg = [];
            Object.keys(data).forEach((k) => errMsg.push(`${k}:\n${data[k]}`));
            errMsg.forEach((errTxt) => {
              toastr.error(errTxt, "Error");
            });
          });
        } else {
          setLoading(false);
          toastr.error("An Error has occured, please try again.", "Error");
        }
      })
      .then((data) => {
        setLoading(false);
        toastr.success(
          "Withrawal request sent successfully. It may take upto 10 minutes to complete, please wait patiently.",
          "Success"
        );
        console.log(data);
      })
      .catch((err) => {
        toastr.error(err, "Error");
      });
  }
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumbs */}
          <Breadcrumbs title="Withdraw" breadcrumbItem="Withdraw Page" />
          <Row>
            <Col>
              <Card>
                <CardBody>
                  <CardTitle>Withdraw Your Money to Bank Account - </CardTitle>
                  <Form onSubmit={handleSubmit}>
                    <EditorContext.Provider
                      value={[
                        editorState,
                        setEditorState,
                        formFieldData,
                        props.edit,
                      ]}
                    >
                      <RenderForm fieldData={formFieldData} />
                    </EditorContext.Provider>
                    <div className="d-flex flex-wrap gap-2">
                      <button
                        type="submit"
                        className="btn btn-primary w-md"
                        disabled={loading}
                      >
                        {loading ? (
                          <i className="bx bx-loader bx-spin font-size-16 align-middle me-2"></i>
                        ) : null}
                        Send Request
                      </button>
                    </div>
                  </Form>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default Withdraw;
