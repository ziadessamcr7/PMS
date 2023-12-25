/** @format */

import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Form, Row, Col, Button, FloatingLabel } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../Context/AuthContext";

const ModalComponent = ({ handleClose, show, getTasks, clearInputFields }) => {
  const { requestHeaders, baseUrl } = useContext(AuthContext);

  const [usersList, setUsersList] = useState([]);
  const [projectsList, setProjectsList] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

  clearInputFields(setValue);

  const getUserList = () => {
    setIsLoading(true);
    axios
      .get(
        `http://upskilling-egypt.com:3003/api/v1/Users/?pageSize=10&pageNumber=1`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("userTkn")}`,
          },
        }
      )
      .then((response: any) => {
        setUsersList(
          response?.data?.data.filter((element) => {
            return element !== undefined;
          })
        );
      })
      .catch((err: any) => {
        setIsLoading(false);
        // toast.error(err.response.data.message);
      });
  };
  const getProjectList = () => {
    setIsLoading(true);
    axios
      .get(
        `http://upskilling-egypt.com:3003/api/v1/Project/manager?pageSize=10&pageNumber=1 `,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("userTkn")}`,
          },
        }
      )
      .then((response: any) => {
        setProjectsList(response?.data?.data);
      })
      .catch((error: any) => {
        setIsLoading(false);
        console.log(error.response.data.message);
        // toast.error(err.response.data.message);
      });
  };
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const addPostTasks = (data) => {
    axios
      .post(`http://upskilling-egypt.com:3003/api/v1/Task`, data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("userTkn")}`,
        },
      })
      .then((response) => {
        console.log(response);
        getTasks();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getUserList();
    getProjectList();
  }, []);
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
        <Form onSubmit={handleSubmit(addPostTasks)}>
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
                    {...register("description", { required: true })}
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
                    {...register("employeeId", {
                      required: true,
                      valueAsNumber: true,
                    })}
                  >
                    <option value={1}>select User</option>

                    {usersList.map((data, index) => (
                      <option key={index} value={data?.id}>
                        {data?.userName}
                      </option>
                    ))}
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
                    {projectsList.map((data, index) => (
                      <option key={index} value={data.id}>
                        {data?.title}
                      </option>
                    ))}
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
    </>
  );
};

export default ModalComponent;
