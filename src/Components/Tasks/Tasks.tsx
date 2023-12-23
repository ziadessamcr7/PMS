/** @format */

import { useEffect, useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import TaskHeader from "./TaskHeader";

export default function Tasks() {
  const [pageName, setPageName] = useState();
  const location = useLocation();
  const { pathname } = location;

  const getCurrentPage = () => {
    const currentPage: string = pathname.split("/").slice(2).join("/");
    return setPageName(currentPage);
  };
  useEffect(() => {
    getCurrentPage();
  }, []);
  return (
    <>
      <TaskHeader pageName={pageName} addBtn={"Add New Task"} />
      <Container className="bg-light" fluid>
        <Row>test</Row>
      </Container>
    </>
  );
}
