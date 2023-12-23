/** @format */

import { useEffect, useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { useLocation } from "react-router-dom";

export default function Tasks() {
  const [pageName, setPageName] = useState();
  const location = useLocation();
  const { pathname } = location;

  const getCurrentPage = () => {
    const currentPage = pathname.split("/").slice(2).join("/");
    return setPageName(currentPage);
  };
  useEffect(() => {
    getCurrentPage();
  }, []);
  return (
    <Container>
      <Row className="justify-content-between">
        <Col>
          <h2 className="text-capitalize">{pageName}</h2>
        </Col>
        <Col className="text-end">
          <Button variant="warning" size="lg" className="text-white ">
            + Add New Task
          </Button>
        </Col>
      </Row>
    </Container>
  );
}
