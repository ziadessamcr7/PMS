/** @format */

import { useContext, useEffect, useState } from "react";
import { Container, Row } from "react-bootstrap";

import axios from "axios";
import Pagination from "react-bootstrap/Pagination";
import { AuthContext } from "../../Context/AuthContext";
import HeaderComponent from "./HeaderComponent";
import ModalComponent from "./ModalComponent";
import TableComponent from "./TableComponent";

export default function Tasks() {
  const [pageName, setPageName] = useState();
  const [tasksList, setTasksList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [pageCount, setPageCount] = useState(1);
  const [pagePagination, setPagePagination] = useState(1);
  const [show, setShow] = useState("Closed");
  const handleClose = () => setShow("Closed");

  const { requestHeaders, BaseUrl, userRoll } = useContext(AuthContext);

  {
    /* location  */
  }

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
  const getTasks = (pageNo) => {
    setIsLoading(true);
    axios
      .get(`${BaseUrl}/Task/${userRoll === "Manager" ? "Manager" : ""}`, {
        headers: requestHeaders,
        params: { pageSize: 5, pageNumber: pageNo },
      })
      .then((response) => {
        setTasksList(response.data.data);
        setIsLoading(false);
        setPageCount(response.data.totalNumberOfPages);
        setPagePagination(pageNo);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getTasks(pagePagination);
  }, [pagePagination]);
  const handleChangePagination = (page: number) => {
    getTasks(page);
  };
  const paginationItems = [];
  for (let number = 1; number <= pageCount; number++) {
    paginationItems.push(
      <Pagination.Item
        key={number}
        active={number === pagePagination}
        onClick={() => handleChangePagination(number)}
      >
        {number}
      </Pagination.Item>
    );
  }
  return (
    <>
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
            <TableComponent tasksList={tasksList} />
          </Row>
          <Row>
            <Pagination size="sm">{paginationItems}</Pagination>
          </Row>
        </Container>
      </section>
    </>
  );
}
