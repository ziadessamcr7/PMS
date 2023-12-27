/** @format */

import React, { useState } from "react";
import { Table, Dropdown } from "react-bootstrap";
import { Link } from "react-router-dom";

const TableComponent = ({ tasksList, pageCount, pagePagination, getTasks }) => {
  const [id, setId] = useState(0);

  const [show, setShow] = useState(false);

  const handleShow: (id: number) => void = (id) => {
    setShow(true);
    setId(id);
  };
  return (
    <>
      <Table striped hover responsive="sm">
        <thead>
          <tr>
            <th>Title</th>
            <th>Status</th>
            <th>User</th>
            <th>Project </th>
            <th>Date Created</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {tasksList.map((row) => (
            <tr key={row.id}>
              <td>{row.title}</td>
              <td>{row.status}</td>
              <td>{row?.employee?.userName}</td>

              <td>{row.project.title}</td>
              <td>{row.creationDate}</td>
              <td>
                <Dropdown>
                  <Dropdown.Toggle variant=""></Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item onClick={() => handleShow(row.id)}>
                      <i className="fa-solid fa-pen-fancy"></i> Block
                    </Dropdown.Item>

                    <Link
                      className=" ps-3 pe-5 text-decoration-none text-dark w-100"
                      to={`/dashboard/user-details/${row.id}`}
                    >
                      <i className="fa-regular fa-eye"></i> View
                    </Link>
                  </Dropdown.Menu>
                </Dropdown>
              </td>
            </tr>
          ))}

          {/* {tasksList.map((row) => (
          <tr key={row.id}>
            <td>1</td>
            <td>Mark</td>
            <td>Otto</td>
            <td>@mdo</td>
          </tr>
        ))} */}
        </tbody>
      </Table>
    </>
  );
};

export default TableComponent;
