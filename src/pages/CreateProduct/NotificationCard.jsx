import React, { useState } from "react";
import {
  Button,
  Card,
  CardBody,
  CardTitle,
  Col,
  Container,
  Label,
  Row,
} from "reactstrap";
import toastr from "toastr";
import "toastr/build/toastr.min.css";

function NotificationCard(props) {
  toastr.options = {
    closeButton: true,
    debug: true,
    progressBar: true,
    preventDuplicates: true,
    newestOnTop: true,
    timeOut: 100,
    extendedTimeOut: 100,
  };
  function showNot() {
    toastr.success(props.message, props.title);
  }
  return (
    <div>
      <Button onClick={showNot}>Some Nice Button</Button>
    </div>
  );
}

export default NotificationCard;
