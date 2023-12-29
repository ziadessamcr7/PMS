/** @format */

import React, { useState } from "react";
import { ButtonGroup, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import SplitButton from "react-bootstrap/SplitButton";

const TableComponent = ({ tasksList, showDelete, showView, showEdit }) => {
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
                <DropdownButton
                  as={ButtonGroup}
                  id={`dropdown-button-drop-end`}
                  drop={"start"}
                  variant=""
                  title={` `}
                >
                  {/* <Dropdown.Item eventKey="1" onClick={() => showView(row.id)}>
                    <i className="fa-regular fa-eye text-success"></i>
                    <span className="text-capitalize mx-2">View</span>
                  </Dropdown.Item> */}
                  <Dropdown.Item onClick={() => showEdit(row)}>
                    <i className="fas fa-edit text-success" />
                    <span className="text-capitalize mx-2">edit</span>
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => showDelete(row.id)}>
                    <i
                      className="fa fa-trash text-success"
                      aria-hidden="true"
                    />
                    <span className="text-capitalize mx-2">Delete</span>
                  </Dropdown.Item>
                  {/* <Dropdown.Divider /> */}
                </DropdownButton>
              </td>
              {/* <td>
                <Dropdown>
                  <Dropdown.Toggle drop="start" variant=""></Dropdown.Toggle>
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
              </td> */}
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
