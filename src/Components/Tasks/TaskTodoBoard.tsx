/** @format */

import { Container, Row, Col } from "react-bootstrap";
import style from "./Tasks.module.css";
const TaskTodoBoard = () => {
  return (
    <section className={`bg-light ${style.boardSection}`}>
      <Container className="py-4">
        <Row className={`${style.taskBox} `}>
          <Col>
            <h4 className="text-center text-white">ToDo</h4>
            <ul className={`list-group my-3`}>
              <li
                className={`list-group-item bg-warning p-3 rounded fw-bold fs-5`}
              >
                login Ui
              </li>
              <li
                className={`list-group-item bg-warning p-3 rounded my-3 fw-bold fs-5`}
              >
                login Ui
              </li>
            </ul>
          </Col>
          <Col className="mx-5">
            <h4>inprogress</h4>
          </Col>
          <Col>
            <h4>Done</h4>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default TaskTodoBoard;
