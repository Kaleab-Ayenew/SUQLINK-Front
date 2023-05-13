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
  const [editorState, setEditorState, formFieldData] = editorData;
  const renderedComps = fieldData.map((item, index) => {
    if (item.type === "text") {
      return <TextField key={index} {...item} />;
    } else if (item.type === "number") {
      return <NumberField key={index} {...item} />;
    } else if (item.type === "checkbox") {
      return <CheckBoxField key={index} {...item} />;
    } else if (item.type === "decimal") {
      return <DecimalField key={index} {...item} />;
    } else if (item.type === "select") {
      return <SelectField key={index} {...item} />;
    } else if (item.type === "textarea") {
      return (
        <TextAreaField
          key={index}
          {...item}
          editorState={editorState}
          setEditorState={setEditorState}
          formFieldData={formFieldData}
        />
      );
    } else if (item.type === "file") {
      return <FileField key={index} {...item} />;
    }
  });
  return renderedComps;
}
