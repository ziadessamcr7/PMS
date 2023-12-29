/** @format */

import { useContext, useEffect, useState } from "react";
import { Container, Row } from "react-bootstrap";

import axios from "axios";
import { AuthContext } from "../../Context/AuthContext";
import DeleteModal from "../../Shared/DeleteModal/DeleteModal";
import EditModal from "../../Shared/EditModal/EditModal";
import LoadingSpinnerTables from "../../Shared/LoadingSpinner/LoadingSpinnerTables";
import PagePaginationComponent from "../../Shared/PagePagination/PagePaginationComponent";
import ViewModal from "../../Shared/ViewModal/ViewModal";
import HeaderComponent from "./HeaderComponent";
import ModalComponent from "./ModalComponent";
import TableComponent from "./TableComponent";
import noData from "../../assets/images/nodata.png";
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
      <ViewModal show={show} handleClose={handleClose} itemId={itemId} />
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
      <section className="bg-light tables ">
        <Container style={{ height: "65vh" }}>
          <Row className="mt-3">Search</Row>

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
    </>
  );
}
