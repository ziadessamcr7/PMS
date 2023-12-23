/** @format */

import { Container, Row, Col, Button } from "react-bootstrap";

const TaskHeader = ({ pageName, addBtn, showAddModal }) => {
  return (
    <Container>
      <Row className="justify-content-between">
        <Col>
          <h2 className="text-capitalize">{pageName}</h2>
        </Col>
        <Col className="text-end">
          <Button
            variant="warning"
            size="lg"
            className="text-white"
            onClick={showAddModal}
          >
            + {addBtn}
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default TaskHeader;
