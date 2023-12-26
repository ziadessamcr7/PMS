/** @format */

import { useEffect, useState } from "react";
import { Col, Row, Button } from "react-bootstrap";
import { useLocation } from "react-router-dom";

const TaskHeader = ({ showAddModal, pageBtn }) => {
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
    <Row className="p-4">
      <Col>
        <h2 className="text-capitalize">{pageName}</h2>
      </Col>
      <Col className="text-end">
        <Button
          variant="warning"
          size="lg"
          className="text-white "
          onClick={showAddModal}
        >
          {pageBtn}
        </Button>
      </Col>
    </Row>
  );
};

export default TaskHeader;
