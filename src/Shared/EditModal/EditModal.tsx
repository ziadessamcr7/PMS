/** @format */

import React from "react";
import { Form, Row, Col, Button, FloatingLabel } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";

const EditModal = ({ show, handleClose }) => {
  return (
    <Modal
      show={show === "modal-edit"}
      onHide={handleClose}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>edit Task</Modal.Title>
      </Modal.Header>
    </Modal>
  );
};

export default EditModal;
