/** @format */

import React from "react";
import { Form, Row, Col, Button, FloatingLabel } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
const ViewModal = ({ show, handleClose }) => {
  return (
    <Modal
      show={show === "modal-view"}
      onHide={handleClose}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>view Task</Modal.Title>
      </Modal.Header>
    </Modal>
  );
};

export default ViewModal;
