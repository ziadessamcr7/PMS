/** @format */

import { Form, Row, Col, Button, FloatingLabel } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import noData from "../../assets/images/nodata.png";
import { useForm } from "react-hook-form";

const DeleteModal = ({ show, handleClose, handleDelete }) => {
  const {
    handleSubmit,
    formState: { errors },
  } = useForm();
  return (
    <Modal
      show={show === "modal-Delete"}
      onHide={handleClose}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>Delete Task</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit(handleDelete)}>
        <Modal.Body>
          <div className="text-center">
            <img src={noData} alt="Delete Category" />
            <p className="fs-2 fw-bold">Delete This Task</p>
            <p className="text-muted ">
              are you sure you want to delete this item ? if you are sure just
              click on delete it
            </p>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-danger" onClick={handleDelete}>
            Delete This Item
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default DeleteModal;
