/** @format */

import { useContext, useEffect, useState } from "react";
import { Container, Row, InputGroup } from "react-bootstrap";
import { Button, Col, FloatingLabel, Form } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";

import axios from "axios";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../Context/AuthContext";
import DeleteModal from "../../Shared/DeleteModal/DeleteModal";
import LoadingSpinnerTables from "../../Shared/LoadingSpinner/LoadingSpinnerTables";
import PagePaginationComponent from "../../Shared/PagePagination/PagePaginationComponent";
import ViewModal from "../../Shared/ViewModal/ViewModal";
import noData from "../../assets/images/nodata.png";
import HeaderComponent from "./HeaderComponent";
import ModalComponent from "./ModalComponent";
import TableComponent from "./TableComponent";

import { toast } from "react-toastify";
import TaskTodoBoard from "./TaskTodoBoard";

export default function Tasks() {
  const [pageName, setPageName] = useState();
  const [tasksList, setTasksList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [pageCount, setPageCount] = useState(1);
  const [pagePagination, setPagePagination] = useState(1);
  const [itemId, setItemId] = useState(0);
  const [searchData, setSearchData] = useState();
  const [show, setShow] = useState("Closed");
  const handleClose = () => setShow("Closed");
  const [usersList, setUsersList] = useState([]);
  const [projectsList, setProjectsList] = useState([]);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const { requestHeaders, BaseUrl, userRoll } = useContext(AuthContext);

  {
    /*select */
  }
  // const [selectTasks, setSelectTasks] = useState("");

  // const handleChange = (event: SelectChangeEvent) => {
  //   setSelectTasks(event.target.value as string);
  // };
  // const getCurrentPage = () => {
  //   const currentPage: string = pathname.split("/").slice(2).join("/");
  //   return setPageName(currentPage);
  // };
  {
    /* show Modal */
  }
  const showAddModal = () => {
    setShow("modal-add");
  };
  const showDelete = (id: number) => {
    setItemId(id);
    setShow("modal-Delete");
  };
  const showView = (id: number) => {
    setItemId(id);
    setShow("modal-view");
  };
  const showEdit = (data: any) => {
    setShow("modal-edit");
    setItemId(data?.id);
    setValue("title", data.title);
    setValue("description", data.description);
    setValue("employeeId", data?.employee.id);
    setValue("projectId", data?.project.id);
  };
  const getUserList = () => {
    setIsLoading(true);
    axios
      .get(
        `http://upskilling-egypt.com:3003/api/v1/Users/?pageSize=10&pageNumber=1`,
        {
          headers: requestHeaders,
        }
      )
      .then((response: any) => {
        setUsersList(
          response?.data?.data.filter((element: any) => {
            return element !== undefined;
          })
        );
      })
      .catch((error: any) => {
        setIsLoading(false);
        toast.error(error.response.data.message);
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
  const getTasks = (pageNo: number) => {
    setIsLoading(true);
    axios
      .get(`${BaseUrl}/Task/${userRoll === "Manager" ? "Manager" : ""}`, {
        headers: requestHeaders,
        params: { pageSize: 5, pageNumber: pageNo },
      })
      .then((response) => {
        // console.log(response.data.data);
        setTasksList(response.data.data);
        setIsLoading(false);
        setPageCount(response.data.totalNumberOfPages);
        setPagePagination(pageNo);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  {
    /*Delete */
  }
  const handleDelete = () => {
    axios
      .delete(`http://upskilling-egypt.com:3003/api/v1/Task/${itemId}`, {
        headers: requestHeaders,
      })
      .then((response) => {
        getTasks();
        handleClose();
        getUserList();
      })
      .catch((error) => console.log(error));
  };
  {
    /*view */
  }
  {
    /*Edit */
  }
  const editTask = (data) => {
    setIsLoading(true);
    axios
      .put(`http://upskilling-egypt.com:3003/api/v1/Task/${itemId}`, data, {
        headers: requestHeaders,
      })
      .then((response: any) => {
        // console.log(response);
        getTasks();
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    getTasks(pagePagination);
    getUserList();
    getProjectList();
  }, [pagePagination]);
  {
    /*search */
  }
  const searchValue = (e: any) => {
    setSearchData(e.target.value);
    // getTasks(searchData)
  };
  const FilterByRole = (e: any) => {
    console.log(e.target.value);
  };

  return (
    <>
      <DeleteModal
        show={show}
        handleClose={handleClose}
        handleDelete={handleDelete}
      />
      {/* <EditModal show={show} handleClose={handleClose} showEdit={showEdit} /> */}
      <div>
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
                {/* <Col>
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
                </Col> */}
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
      </div>
      <ViewModal show={show} handleClose={handleClose} itemId={itemId} />

      <ModalComponent
        getUserList={getUserList}
        getProjectList={getProjectList}
        usersList={usersList}
        projectsList={projectsList}
        handleClose={handleClose}
        show={show}
        getTasks={getTasks}
      />
      <Container fluid>
        <HeaderComponent
          showAddModal={showAddModal}
          pageBtn={"+ Add New Task"}
          userRoll={userRoll}
        />
      </Container>
      {userRoll === "Manager" ? (
        <section className="bg-light tables ">
          <Container style={{ height: "65vh" }}>
            <Row className="search-recipes d-flex align-items-center bg-light my-4 rounded-3">
              <Col md={4}>
                <div className="">
                  <InputGroup className="mb-3 my-3  ">
                    <Form.Control
                      placeholder="search "
                      aria-label="Username"
                      aria-describedby="basic-addon1"
                      className="rounded-pill p-2"
                      onChange={searchValue}
                    />
                  </InputGroup>
                </div>
              </Col>
              <Col md={1}>
                <div className="">
                  <select
                    onChange={FilterByRole}
                    className="form-select ms-1 rounded-5 p-2 text-center"
                  >
                    <option value="2" selected>
                      Filter
                    </option>
                    <option value="1">Manager</option>
                    <option value="2">Employee</option>
                  </select>
                </div>
              </Col>
            </Row>
            {!isLoading ? (
              tasksList.length >= 0 ? (
                <>
                  <Row className="text-center ">
                    <TableComponent
                      tasksList={tasksList}
                      showDelete={showDelete}
                      showView={showView}
                      showEdit={showEdit}
                    />
                    <PagePaginationComponent
                      pageCount={pageCount}
                      pagePagination={pagePagination}
                      getTasks={getTasks}
                    />
                  </Row>
                </>
              ) : (
                <div className="text-center ">
                  <img
                    src={noData}
                    alt="nodata found to display tasks data"
                    className=""
                  />
                  <p className="text-muted fw-bold fs-4">No Data Found</p>
                </div>
              )
            ) : (
              <LoadingSpinnerTables />
            )}
          </Container>
        </section>
      ) : (
        <TaskTodoBoard />
      )}
    </>
  );
}
