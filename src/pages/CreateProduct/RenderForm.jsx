import React from "react";
import {
  TextField,
  NumberField,
  CheckBoxField,
  FileField,
  TextAreaField,
  DecimalField,
  SelectField,
} from "./FormFieldComps";

import { EditorContext } from ".";

export default function RenderForm(props) {
  const fieldData = props.fieldData;
  const editorData = React.useContext(EditorContext);
  const [editorState, setEditorState, formFieldData, isEdit] = editorData;
  const renderedComps = fieldData.map((item, index) => {
    const prs = isEdit ? { ...item, not_required: true } : item;
    if (isEdit) {
      console.log("You are editing stuff bro.");
    }
    console.log("Look at the item", prs);
    if (item.type === "text") {
      return <TextField key={index} {...prs} />;
    } else if (item.type === "number") {
      return <NumberField key={index} {...prs} />;
    } else if (item.type === "checkbox") {
      return <CheckBoxField key={index} {...prs} />;
    } else if (item.type === "decimal") {
      return <DecimalField key={index} {...prs} />;
    } else if (item.type === "select") {
      return <SelectField key={index} {...prs} />;
    } else if (item.type === "textarea") {
      return (
        <TextAreaField
          key={index}
          {...prs}
          editorState={editorState}
          setEditorState={setEditorState}
          formFieldData={formFieldData}
        />
      );
    } else if (item.type === "file") {
      return <FileField key={index} {...prs} />;
    }
  });
  return renderedComps;
}
