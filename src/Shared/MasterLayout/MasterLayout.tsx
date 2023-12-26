/** @format */

import React from "react";
import SideBar from "../SideBar/SideBar";
import NavBar from "../Navbar/NavBar";
import { Outlet } from "react-router-dom";

export default function MasterLayout() {
  return (
    <>
      <NavBar />
      <div className="d-flex px-0">
        <div
          className=""
          style={{
            backgroundColor: "rgb(27 69 53 / 93%)",
            borderRadius: "0rem 2.625rem 0rem 0rem",
          }}
        >
          <SideBar />
        </div>
        <div className="w-100">
          <div className=""></div>
          <div className="content-container">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
}
