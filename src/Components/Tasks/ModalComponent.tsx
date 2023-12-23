/** @format */

import React from "react";
import Modal from "react-bootstrap/Modal";

const ModalComponent = ({ handleClose, show }) => {
  return (
    <>
      <Modal
        show={show === "modal-add"}
        onHide={handleClose}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Task</Modal.Title>
        </Modal.Header>
        {/* <Form onSubmit={handleSubmit(addPostTasks)}>
    <Modal.Body>
      <Row className="g-2 flex-colum">
        <Col md={12}>
         
         aaaa
        </Col>
        
  </Form> */}
      </Modal>
    </>
  );
};

export default ModalComponent;
