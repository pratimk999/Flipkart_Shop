import React from "react";
import { Form } from "react-bootstrap";

export default function Input(props) {
  return (
    <Form.Group controlId={props.controlId} style={props.style}>
      {props.label ? <Form.Label>{props.label}</Form.Label> : null}
      <Form.Control
        type={props.type}
        placeholder={props.placeholder}
        value={props.value}
        onChange={props.onChange}
      />
    </Form.Group>
  );
}
