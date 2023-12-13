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

import DeleteModal from "./DeleteModal";
import { CORE_BACKEND_URL } from "../../helpers/url_helper";

export const EditorContext = React.createContext();

import toastr from "toastr";
import "toastr/build/toastr.min.css";

import "./style/index.css";

const CreateVideo = (props) => {
  document.title = `${
    props.edit ? "Edit" : "Add"
  } Video | Black Storm Admin Dashboard`;
  const navigate = useNavigate();
  const [editProductData, setEditProductData] = React.useState({});
  const [editorState, setEditorState] = React.useState({
    product_description: "",
  });
  const [formFieldData, setFormFieldData] = React.useState(formFields);
  const [showDelete, setShowDelete] = React.useState(false);
  const [deleteMsg, setDeleteMsg] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [errorState, setErrorState] = React.useState();
  const [isEdit, setIsEdit] = React.useState(props.edit);

  toastr.options.timeOut = 10000;
  toastr.options.closeButton = true;

  function deleteButtonClick() {
    setDeleteMsg(
      `Are you sure you want to delete product:\n ${editProductData.video_info.title}`
    );
    setShowDelete(true);
  }

  function handleProductDelete(e) {
    const videoId = editProductData.platform_id;
    fetch(`${CORE_BACKEND_URL}/suqlink/yvideos/s/videos/${videoId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Token ${
          JSON.parse(localStorage.getItem("authUser")).token
        }`,
      },
    })
      .then((rsp) => {
        if (rsp.status === 204) {
          console.log(
            `Video ${editProductData.video_info.title} has been deleted.`
          );
          setShowDelete(false);
          setFormFieldData(formFields);
          toastr.success("Video has been deleted succesfully.", "Notification");
          navigate("/youtube");
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

    setLoading(true);
    fetch(`${CORE_BACKEND_URL}/suqlink/yvideos/create/`, {
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
          toastr.success("Video has been created successfully", "Notification");
          e.target.reset();
          return rsp.json();
        } else {
          setLoading(false);
          rsp.json().then((data) => {
            const errMsg = [];
            Object.keys(data).forEach((k) => errMsg.push(`${k}:\n${data[k]}`));
            errMsg.forEach((errTxt) => {
              toastr.error(errTxt, "Error");
            });
          });
        }
      })
      .then((data) => {
        navigate("/dashboard");
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
    // f.forEach((value, key) => (object[key] = value));
    f.forEach((value, key) => {
      if (value.type === "application/octet-stream" && value.size === 0) {
        f.delete(key);
      }
    });
    var json = JSON.stringify(object);

    const videoId = props.router.params.video_id;
    setLoading(true);
    fetch(`${CORE_BACKEND_URL}/suqlink/yvideos/s/videos/${videoId}`, {
      method: "PATCH",
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
            errMsg.forEach((errTxt) => {
              toastr.error(errTxt, "Error");
            });
          });
        }
      })
      .then((data) => {
        setEditProductData(data);

        setLoading(false);
        toastr.success(
          "Video information has been updated successfully!",
          "Notification"
        );
      });
  }

  React.useLayoutEffect(() => {
    document.addEventListener("wheel", function (event) {
      if (document.activeElement.type === "number") {
        document.activeElement.blur();
      }
    });
    if (props.edit === true) {
      const productId = props.router.params.video_id;
      fetch(`${CORE_BACKEND_URL}/suqlink/yvideos/s/videos/${productId}`, {
        method: "GET",
        headers: {
          Authorization: `Token ${
            JSON.parse(localStorage.getItem("authUser")).token
          }`,
        },
      })
        .then((rsp) => rsp.json())
        .then((data) => {
          data.video_id = `https://youtube.com/watch?v=${data.video_id}`;
          setFormFieldData((old) => {
            setEditProductData(data);
            const newVal = old.map((item) => {
              return { ...item, default: data[item.name] };
            });
            return newVal;
          });
        });
    } else {
      setFormFieldData(formFields);
    }
  }, []);

  return (
    <>
      <div className="page-content">
        <Container fluid={true}>
          <Breadcrumbs
            title={`${props.edit ? "Edit" : "Add"} Videos`}
            breadcrumbItem={"Video Manager"}
          />
          <Row>
            <Col>
              <Card>
                <CardBody>
                  <CardTitle className="h4">
                    {!props.edit
                      ? "Create a new Video"
                      : `Edit "${editProductData?.video_info?.title}"`}
                  </CardTitle>
                  <p className="card-title-desc">
                    {!props.edit
                      ? "You can add your videos with this form"
                      : `You are editing video: ${editProductData?.video_info?.title}`}
                  </p>
                  <Form onSubmit={props.edit ? handleEditSubmit : handleSubmit}>
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

export default withRouter(CreateVideo);
