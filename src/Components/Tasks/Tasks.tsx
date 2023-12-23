/** @format */

import { useContext, useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

import { useLocation } from "react-router-dom";
import TaskHeader from "./TaskHeader";
import { InputAdornment, TextField, CircularProgress } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import TasksTable from "./TasksTable";
import axios from "axios";
import { AuthContext } from "../../Context/AuthContext";
import Loading from "../Loading/Loading";
import nodata from "../../assets/images/nodata.png";
import Pagination from "@mui/material/Pagination";
// import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import ModalComponent from "./ModalComponent";

export default function Tasks() {
  const [pageName, setPageName] = useState();
  const [tasksList, setTasksList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [pageCount, setPageCount] = useState(1);
  const [pagePagination, setPagePagination] = useState(1);
  const [show, setShow] = useState("Closed");
  const handleClose = () => setShow("Closed");

  const { requestHeaders, BaseUrl } = useContext(AuthContext);
  {
    /* location  */
  }
  const location = useLocation();
  const { pathname } = location;
  {
    /*select */
  }
  const [selectTasks, setSelectTasks] = useState("");

  const handleChange = (event: SelectChangeEvent) => {
    setSelectTasks(event.target.value as string);
  };
  const getCurrentPage = () => {
    const currentPage: string = pathname.split("/").slice(2).join("/");
    return setPageName(currentPage);
  };
  {
    /* show Modal */
  }
  const showAddModal = () => {
    setShow("modal-add");
  };
  {
    /* task manager */
  }
  const getTasks = (pageNo) => {
    setIsLoading(true);
    axios
      .get(`${BaseUrl}/Task?`, {
        headers: requestHeaders,
        params: { pageSize: 5, pageNumber: pageNo },
      })
      .then((response: any) => {
        setTasksList(response.data.data);
        setIsLoading(false);
        setPageCount(response.data.totalNumberOfPages);
        setPagePagination(pageNo);
        // console.log(response.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getCurrentPage();
    getTasks(pagePagination);
  }, []);
  const handleChangePagination = (event, page) => {
    getTasks(page);
  };
  return (
    <>
      <TaskHeader
        pageName={pageName}
        addBtn={"Add New Task"}
        showAddModal={showAddModal}
      />
      <div className="add-item ">
        <ModalComponent handleClose={handleClose} show={show} />
      </div>
      <Container className="bg-light   " fluid>
        <Row className="ms-auto bg-white  justify-content-center align-items-center rounded">
          <Col className=" mx-3" md={6}>
            <TextField
              size="small"
              type="search"
              placeholder="Search here"
              // onChange={getNameValue}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <span className=" me-2">
                      <SearchIcon fontSize="small" color="action" />
                    </span>
                  </InputAdornment>
                ),
              }}
              fullWidth
            />
          </Col>
          <Col className=" " md={2}>
            <Box sx={{ minWidth: 120 }}>
              <FormControl fullWidth size="small">
                <InputLabel id="demo-simple-select-label">Filter</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={selectTasks}
                  label="Filter"
                  onChange={handleChange}
                >
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </Col>
        </Row>
        <Row className="tasks-table  mx-3 mb-3" style={{ minHeight: "50rem" }}>
          {!isLoading ? (
            tasksList.length > 0 ? (
              <>
                <TasksTable tasksList={tasksList} />
                <div className=" my-3 m-auto by-dark pagination ">
                  <Pagination
                    count={pageCount}
                    color="success"
                    onChange={handleChangePagination}
                    page={pagePagination}
                  />
                </div>
              </>
            ) : (
              <div className="text-center">
                <img src={nodata} alt="NO data image" />
                <p className="fw-bold fs-4">No Data</p>
              </div>
            )
          ) : (
            <Loading />
          )}
        </Row>
      </Container>
    </>
  );
}
