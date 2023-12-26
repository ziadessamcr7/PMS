/** @format */

import { useContext, useEffect, useState } from "react";
import { Container, Row } from "react-bootstrap";

import axios from "axios";
import Pagination from "react-bootstrap/Pagination";
import { AuthContext } from "../../Context/AuthContext";
import HeaderComponent from "./HeaderComponent";
import ModalComponent from "./ModalComponent";
import TableComponent from "./TableComponent";

let active = 1;
let items = [];
for (let number = 1; number <= 5; number++) {
  items.push(
    <Pagination.Item key={number} active={number === active}>
      {number}
    </Pagination.Item>
  );
}
export default function Tasks() {
  const [pageName, setPageName] = useState();
  const [tasksList, setTasksList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [pageCount, setPageCount] = useState(1);
  const [pagePagination, setPagePagination] = useState(1);
  const [show, setShow] = useState("Closed");
  const handleClose = () => setShow("Closed");

  const { requestHeaders, BaseUrl, userRoll } = useContext(AuthContext);

  let active = 2;
  let items = [];
  for (let number = 1; number <= 5; number++) {
    items.push(
      <Pagination.Item key={number} active={number === active}>
        {number}
      </Pagination.Item>
    );
  }
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
      .get(`${BaseUrl}/Task/${userRoll === "Manager" ? "Manager" : ""}?`, {
        headers: requestHeaders,
        params: { pageSize: 5, pageNumber: pageNo },
      })
      .then((response: any) => {
        setTasksList(response.data.data);
        setIsLoading(false);
        // setPageCount(response.data.totalNumberOfPages);
        // setPagePagination(pageNo);
        console.log(response.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getTasks(1);
  }, []);
  // const handleChangePagination = (event, page) => {
  //   getTasks(page);
  // };
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
            <Pagination bg={"success"} size="sm">
              {items}
            </Pagination>
          </Row>
        </Container>
      </section>
    </>
  );
}
