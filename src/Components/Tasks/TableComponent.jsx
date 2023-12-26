/** @format */

import React from "react";
import { Table } from "react-bootstrap";

const TableComponent = (tasksList: void) => {
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Title</th>
          <th>Statues</th>
          <th>User</th>
          <th>Project</th>
          <th>Date Created</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>1</td>
          <td>Mark</td>
          <td>Otto</td>
          <td>@mdo</td>
        </tr>
      </tbody>
    </Table>
  );
};

export default TableComponent;
