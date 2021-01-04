import React from "react";
import { Button, Modal } from "react-bootstrap";
function NewModal(props) {
  return (
    <Modal size={props.size} show={props.show} onHide={props.hideModal}>
      <Modal.Header
        closeButton
        style={{
          backgroundColor: "#007bff",
          color: "white",
          padding: "5px 15px",
          fontSize: "14px",
        }}
      >
        <Modal.Title>{props.modalTitle}</Modal.Title>
      </Modal.Header>

      <Modal.Body>{props.children}</Modal.Body>

      {props.visibility === false ? null : (
        <Modal.Footer
          style={{
            padding: "5px 10px",
          }}
        >
          {props.display === "false" ? null : (
            <Button variant="primary" onClick={props.handleClose}>
              {props.buttonLabel}
            </Button>
          )}
          {props.visibility === true
            ? props.buttons &&
              props.buttons.map((btn, index) => {
                return (
                  <Button key={index} variant={btn.color} onClick={btn.onClick}>
                    {btn.label}
                  </Button>
                );
              })
            : null}
        </Modal.Footer>
      )}
    </Modal>
  );
}

export default NewModal;
