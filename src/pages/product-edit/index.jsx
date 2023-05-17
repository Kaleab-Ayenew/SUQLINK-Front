import React from "react";
import Breadcrumbs from "../../components/Common/Breadcrumb";
import withRouter from "../../components/Common/withRouter";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Card,
  CardBody,
  CardTitle,
  Col,
  Container,
  Form,
  Input,
  Label,
  Row,
} from "reactstrap";

import Select from "react-select";
import Dropzone from "react-dropzone";
import { template } from "lodash";
import NotificationCard from "./NotificationCard";

// My Custom Components
import RenderForm from "./RenderForm";
import { formFields } from "./formFields";
import { socialConfirmFields } from "./formFields";

import DeleteModal from "./DeleteModal";
import { CORE_BACKEND_URL } from "../../helpers/url_helper";

export const EditorContext = React.createContext();

import toastr from "toastr";
import "toastr/build/toastr.min.css";

import "./style/index.css";

const AKalish = (props) => {
  document.title = `${
    props.edit ? "Edit" : "Add"
  } Products | Balck Storm Admin Dashboard`;
  const navigate = useNavigate();
  const [editProductData, setEditProductData] = React.useState({});
  const [editorState, setEditorState] = React.useState({ desc: "" });
  const [formFieldData, setFormFieldData] = React.useState(formFields);
  const [showDelete, setShowDelete] = React.useState(false);
  const [deleteMsg, setDeleteMsg] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [errorState, setErrorState] = React.useState();

  toastr.options.timeOut = 10000;
  toastr.options.closeButton = true;

  function deleteButtonClick() {
    setDeleteMsg(
      `Are you sure you want to delete product:\n ${editProductData.title}`
    );
    setShowDelete(true);
  }

  function handleProductDelete(e) {
    const slug = editProductData.slug;
    fetch(`${CORE_BACKEND_URL}/ecom_full/static/products/${slug}/`, {
      method: "DELETE",
      headers: {
        Authorization: `Token ${
          JSON.parse(localStorage.getItem("authUser")).token
        }`,
      },
    })
      .then((rsp) => {
        if (rsp.status === 204) {
          console.log(`Product ${editProductData.title} has been deleted.`);
          setShowDelete(false);
          setFormFieldData(formFields);
          toastr.success(
            "Product has been deleted succesfully.",
            "Notification"
          );
          navigate("/product-list");
        }
      })
      .catch((err) => console.error(err));
  }

  function handleSubmit(e) {
    e.preventDefault();
    let f = new FormData(e.target);
    for (const [name, value] of Object.entries(editorState)) {
      f.append(name, value);
    }
    var object = {};
    f.forEach((value, key) => (object[key] = value));
    var json = JSON.stringify(object);
    console.log(json);
    setLoading(true);
    fetch(`${CORE_BACKEND_URL}/ecom_full/static/products/new/`, {
      method: "POST",
      body: f,
      headers: {
        Authorization: `Token ${
          JSON.parse(localStorage.getItem("authUser")).token
        }`,
      },
    })
      .then((rsp) => {
        if (rsp.ok) {
          setLoading(false);
          toastr.success(
            "Product has been created successfully",
            "Notification"
          );
          setEditorState({ desc: "" });
          e.target.reset();
          return rsp.json();
        } else {
          setLoading(false);
          rsp.json().then((data) => {
            const errMsg = [];
            Object.keys(data).forEach((k) => errMsg.push(`${k}:\n${data[k]}`));
            const errTxt = errMsg.join("\n *** \n");
            toastr.error(errTxt, "Error");
          });
        }
      })
      .then((data) => {
        console.log(data, "This is the rsp data");
      })
      .catch((err) => {
        console.error(err);
        toastr.error(err.message, "Error");
        setLoading(false);
      });
  }

  function handleEditSubmit(e) {
    e.preventDefault();
    let f = new FormData(e.target);
    for (const [name, value] of Object.entries(editorState)) {
      f.append(name, value);
    }
    var object = {};
    f.forEach((value, key) => (object[key] = value));
    var json = JSON.stringify(object);
    console.log(json);

    const slug = props.router.params.slug;
    setLoading(true);
    fetch(`${CORE_BACKEND_URL}/ecom_full/static/products/${slug}/`, {
      method: "PUT",
      body: f,
      headers: {
        Authorization: `Token ${
          JSON.parse(localStorage.getItem("authUser")).token
        }`,
      },
    })
      .then((rsp) => {
        if (rsp.ok) {
          return rsp.json();
        } else {
          setLoading(false);
          rsp.json().then((data) => {
            const errMsg = [];
            Object.keys(data).forEach((k) => errMsg.push(`${k}:\n${data[k]}`));
            const errTxt = errMsg.join("\n *** \n");
            toastr.error(errTxt, "Error");
          });
        }
      })
      .then((data) => {
        setEditProductData(data);
        console.log(data);
        setLoading(false);
        toastr.success(
          "Product information has been updated successfully!",
          "Notification"
        );
      });
  }

  React.useLayoutEffect(() => {
    if (props.edit === true) {
      const productSlug = props.router.params.slug;
      fetch(`${CORE_BACKEND_URL}/ecom_full/static/products/${productSlug}/`, {
        method: "GET",
        headers: {
          Authorization: `Token ${
            JSON.parse(localStorage.getItem("authUser")).token
          }`,
        },
      })
        .then((rsp) => rsp.json())
        .then((data) => {
          console.log(data);
          setFormFieldData((old) => {
            setEditProductData(data);
            const newVal = old.map((item) => {
              console.log(item);
              return { ...item, default: data[item.name] };
            });
            return newVal;
          });
        });
    } else {
      setFormFieldData(formFields);
      console.log("The Form Should be Clean now");
    }
  }, []);

  return (
    <>
      <div className="page-content">
        <Container fluid={true}>
          <Breadcrumbs
            title={`${props.edit ? "Edit" : "Add"} Products`}
            breadcrumbItem={"Product Manager"}
          />
          <Row>
            <Col>
              <Card>
                <CardBody>
                  <CardTitle className="h4">
                    {!props.edit
                      ? "Create a new Product for Your Store"
                      : `Edit ${editProductData.title}`}
                  </CardTitle>
                  <p className="card-title-desc">
                    {!props.edit
                      ? "You can add your products with this form"
                      : `You are editing product: ${editProductData.title}`}
                  </p>
                  <Form onSubmit={props.edit ? handleEditSubmit : handleSubmit}>
                    <EditorContext.Provider
                      value={[editorState, setEditorState, formFieldData]}
                    >
                      <RenderForm fieldData={formFieldData} />
                      {props.edit ? (
                        ""
                      ) : (
                        <RenderForm fieldData={socialConfirmFields} />
                      )}
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
                        {props.edit ? "Save" : "Submit"}
                      </button>
                      {props.edit && (
                        <button
                          onClick={deleteButtonClick}
                          type="button"
                          className="btn btn-danger  w-sm"
                        >
                          Delete
                        </button>
                      )}
                    </div>
                  </Form>
                </CardBody>
              </Card>
            </Col>
          </Row>

          <DeleteModal
            onCloseClick={() => {
              setShowDelete(false);
            }}
            onDeleteClick={handleProductDelete}
            show={showDelete}
            message={deleteMsg}
          />
        </Container>
      </div>
    </>
  );
};

export default withRouter(AKalish);
