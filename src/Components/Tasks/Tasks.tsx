/** @format */

import { useContext, useEffect, useState } from "react";
import { Container, Row } from "react-bootstrap";

import axios from "axios";
import Modal from "react-bootstrap/Modal";
import { AuthContext } from "../../Context/AuthContext";
import DeleteModal from "../../Shared/DeleteModal/DeleteModal";
import PagePaginationComponent from "../../Shared/PagePagination/PagePaginationComponent";
import HeaderComponent from "./HeaderComponent";
import ModalComponent from "./ModalComponent";
import TableComponent from "./TableComponent";
import EditModal from "../../Shared/EditModal/EditModal";
import ViewModal from "../../Shared/ViewModal/ViewModal";

export default function Tasks() {
  const [pageName, setPageName] = useState();
  const [tasksList, setTasksList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [pageCount, setPageCount] = useState(1);
  const [pagePagination, setPagePagination] = useState(1);
  const [itemId, setItemId] = useState(0);

  const [show, setShow] = useState("Closed");
  const handleClose = () => setShow("Closed");

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
  const showEdit = (id: number) => {
    setItemId(id);

    setShow("modal-edit");
  };
  const getTasks = (pageNo: number) => {
    setIsLoading(true);
    axios
      .get(`${BaseUrl}/Task/${userRoll === "Manager" ? "Manager" : ""}`, {
        headers: requestHeaders,
        params: { pageSize: 5, pageNumber: pageNo },
      })
      .then((response) => {
        setTasksList(response.data.data);
        console.log(response);
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
      })
      .catch((error) => console.log(error));
  };
  {
    /*view */
  }
  {
    /*Edit */
  }

  useEffect(() => {
    getTasks(pagePagination);
  }, [pagePagination]);

  return (
    <>
      <DeleteModal
        show={show}
        handleClose={handleClose}
        handleDelete={handleDelete}
      />
      <EditModal show={show} handleClose={handleClose} />
      <ViewModal show={show} handleClose={handleClose} />
      <ModalComponent
        handleClose={handleClose}
        show={show}
        getTasks={getTasks}
      />
      <Container fluid>
        <HeaderComponent
          showAddModal={showAddModal}
          pageBtn={"+ Add New Task"}
        />
      </Container>
      <section className="bg-light">
        <Container style={{ height: "65vh" }}>
          <Row className="mt-3">Search</Row>
          <Row>
            <TableComponent
              tasksList={tasksList}
              showDelete={showDelete}
              showView={showView}
              showEdit={showEdit}
            />
          </Row>
          <Row>
            <PagePaginationComponent
              pageCount={pageCount}
              pagePagination={pagePagination}
              getTasks={getTasks}
            />
          </Row>
        </Container>
      </section>
    </>
  );
}
