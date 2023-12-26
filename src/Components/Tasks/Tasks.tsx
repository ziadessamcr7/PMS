/** @format */

import { useContext, useEffect, useState } from "react";
import { Container, Row } from "react-bootstrap";

import HeaderComponent from "./HeaderComponent";
import TableComponent from "./TableComponent";
import axios from "axios";
import { AuthContext } from "../../Context/AuthContext";

export default function Tasks() {
  const [pageName, setPageName] = useState();
  const [tasksList, setTasksList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [pageCount, setPageCount] = useState(1);
  const [pagePagination, setPagePagination] = useState(1);
  const [show, setShow] = useState("Closed");
  const handleClose = () => setShow("Closed");

  const { requestHeaders, BaseUrl, userRoll } = useContext(AuthContext);
  console.log(userRoll);
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
        // setTasksList(response.data.data);
        // setIsLoading(false);
        // setPageCount(response.data.totalNumberOfPages);
        // setPagePagination(pageNo);
        // console.log(response.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    // getTasks(pagePagination);
    getTasks(2);
  }, []);
  // const handleChangePagination = (event, page) => {
  //   getTasks(page);
  // };
  return (
    <>
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
        </Container>
      </section>
    </>
  );
}
