/** @format */

import React from "react";
import { Table } from "react-bootstrap";

const TableComponent = ({ tasksList }) => {
  console.log(tasksList);
  return (
    <Table bordered hover responsive="sm">
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
            <td></td>
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
  );
};

export default TableComponent;
