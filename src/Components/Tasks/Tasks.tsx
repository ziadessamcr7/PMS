/** @format */

import { useEffect, useState } from "react";
import TaskHeader from "./TaskHeader";
import { Container } from "react-bootstrap";

export default function Tasks() {
  // const [tasksList, setTasksList] = useState([]);
  // const [isLoading, setIsLoading] = useState(false);
  // const [pageCount, setPageCount] = useState(1);
  // const [pagePagination, setPagePagination] = useState<number>(1);
  const [show, setShow] = useState<string>("Closed");
  // const handleClose = () => setShow<string>("Closed");

  const showAddModal = () => {
    setShow("modal-add");
  };

  return (
    <Container fluid>
      <TaskHeader showAddModal={showAddModal} pageBtn={"+ Add New Task"} />
      
    </Container>
  );
}
