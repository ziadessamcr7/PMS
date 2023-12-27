/** @format */

import React from "react";
import { Pagination } from "react-bootstrap";

const PagePaginationComponent = ({ pageCount, pagePagination, getTasks }) => {
  const handleChangePagination = (page: number) => {
    getTasks(page);
  };
  const paginationItems = [];
  for (let number = 1; number <= pageCount; number++) {
    paginationItems.push(
      <Pagination.Item
        key={number}
        active={number === pagePagination}
        onClick={() => handleChangePagination(number)}
      >
        {number}
      </Pagination.Item>
    );
  }
  return <Pagination size="sm">{paginationItems}</Pagination>;
};

export default PagePaginationComponent;
