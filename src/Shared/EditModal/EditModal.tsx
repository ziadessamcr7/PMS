/** @format */

import axios from "axios";
import { useContext, useState } from "react";
import Modal from "react-bootstrap/Modal";
import { AuthContext } from "../../Context/AuthContext";
import { Form, Row, Col, Button, FloatingLabel } from "react-bootstrap";
import { useForm } from "react-hook-form";

const EditModal = ({ show, handleClose, itemId }) => {
  const [isLoading, setIsLoading] = useState(false);
  const { requestHeaders } = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  console.log(itemId);

  const editTask = () => {
    setIsLoading(true);
    axios
      .put(`http://upskilling-egypt.com:3003/api/v1/Task/${itemId}`, {
        headers: requestHeaders,
      })
      .then((response: any) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <Modal
      show={show === "modal-edit"}
      onHide={handleClose}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>Edit Task</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit(editTask)}>
        <Modal.Body>
          <Row className="g-2 flex-colum">
            <h3></h3>
            <Col md={12}>
              <Form.Label htmlFor="inputTitle" className="text-capitalize ">
                title
              </Form.Label>

              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Control
                  size="lg"
                  type="text"
                  placeholder="Title"
                  {...register("title", { required: true })}
                />

                {errors.title && errors.title?.type === "required" && (
                  <span className="text-danger">this is required </span>
                )}
              </Form.Group>
            </Col>
            <Col md={12}>
              <Form.Label
                htmlFor="inputDescription"
                className="text-capitalize "
              >
                Description
              </Form.Label>

              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Control
                  as="textarea"
                  size="lg"
                  type="text"
                  placeholder="Description"
                  // {...register("description", { required: true })}
                />

                {errors.description &&
                  errors.description?.type === "required" && (
                    <span className="text-danger">this is required </span>
                  )}
              </Form.Group>
            </Col>
            <Col>
              <FloatingLabel controlId="floatingSelectGrid" label="Users">
                <Form.Select
                  aria-label="Floating label select "
                  // {...register("employeeId", {
                  //   required: true,
                  //   valueAsNumber: true,
                  // })}
                >
                  <option value={1}>select User</option>

                  {/* {usersList.map((data, index) => (
                    <option key={index} value={data?.id}>
                      {data?.userName}
                    </option>
                  ))} */}
                </Form.Select>
              </FloatingLabel>
            </Col>
            <Col>
              <FloatingLabel controlId="floatingSelectGrid" label="Project">
                <Form.Select
                  aria-label="Floating label select"
                  {...register("projectId", { valueAsNumber: true })}
                >
                  <option value={1}>select Project</option>
                  {/* {projectsList.map((data, index) => (
                    <option key={index} value={data.id}>
                      {data?.title}
                    </option>
                  ))} */}
                </Form.Select>
              </FloatingLabel>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer className="justify-content-between">
          <Button variant="outline-dark" size="lg" onClick={handleClose}>
            cancel
          </Button>
          <Button
            variant="success"
            size="lg"
            type="submit"
            onClick={handleClose}
          >
            Save
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default EditModal;
