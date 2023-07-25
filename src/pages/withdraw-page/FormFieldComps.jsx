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

import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import React from "react";

export function TextField(props) {
  const defaultValue =
    typeof props.default === "object"
      ? JSON.stringify(props.default)
      : props.default;

  return (
    <div className="mb-3">
      <Label htmlFor={props.id}>{props.title}</Label>
      <Input
        type="text"
        className="form-control"
        id={props.id}
        placeholder={props.placeholder}
        name={props.name}
        defaultValue={defaultValue}
        required={!props.not_required}
      />
    </div>
  );
}

export function NumberField(props) {
  return (
    <div className="mb-3">
      <Label htmlFor={props.id}>{props.title}</Label>
      <Input
        type="number"
        className="form-control"
        id={props.id}
        defaultValue={props.default}
        name={props.name}
        required={!props.not_required}
        min={`${props.min}`}
      />
    </div>
  );
}

export function DecimalField(props) {
  return (
    <div className="mb-3">
      <Label htmlFor={props.id}>{props.title}</Label>
      <Input
        type="number"
        className="form-control"
        id={props.id}
        defaultValue={props.default}
        name={props.name}
        step={`${props.step}`}
        required={!props.not_required}
        min={`${props.min}`}
      />
    </div>
  );
}

export function CheckBoxField(props) {
  return (
    <div className="mb-3">
      <div className="form-check">
        <Input
          type="checkbox"
          className="form-check-Input"
          id={props.id}
          name={props.name}
          defaultChecked={props.default}
        />
        <Label className="form-check-Label" htmlFor={props.id}>
          {props.title}
        </Label>
      </div>
    </div>
  );
}

export function FileField(props) {
  return (
    <div className="mb-3">
      <Label htmlFor={props.id}>{props.title}</Label>
      <Input
        type="file"
        className="form-control"
        id={props.id}
        name={props.name}
        required={!props.not_required}
        accept={props.accept}
      />
    </div>
  );
}

export function TextAreaField(props) {
  const editorState = props.editorState;
  const setEditorState = props.setEditorState;
  const formFieldData = props.formFieldData;

  React.useLayoutEffect(() => {
    console.log(formFieldData, "This is formFieldData");
    if (props.default) {
      console.log("From CKEditor,", props.default);
      setEditorState((old) => ({ ...old, [props.name]: props.default }));
    }
  }, [formFieldData]);
  return (
    <div className="mb-3">
      <Label>{props.title}</Label>
      <CKEditor
        editor={ClassicEditor}
        data={editorState[props.name]}
        onReady={(editor) => {
          // You can store the "editor" and use when it is needed.
        }}
        onChange={(event, editor) => {
          const data = editor.getData();
          console.log(data);
          setEditorState((old) => ({ ...old, [props.name]: data }));
        }}
      />
    </div>
  );
}

export function SelectField(props) {
  return (
    <div className="mb-3">
      <Label htmlFor={props.id}>{props.title}</Label>
      <Input
        type="select"
        className="form-control"
        id={props.id}
        name={props.name}
        required={!props.not_required}
      >
        {props.options.map((item, key) => (
          <option>{item}</option>
        ))}
      </Input>
    </div>
  );
}
