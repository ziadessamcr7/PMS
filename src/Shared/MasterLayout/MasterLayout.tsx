/** @format */

import React, { useContext } from "react";
import SideBar from "../SideBar/SideBar";
import NavBar from "../Navbar/NavBar";
import { Outlet } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext";

export default function MasterLayout() {
  const { userRoll } = useContext(AuthContext);
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
          <SideBar userRoll={userRoll} />
        </div>
        <div className=" w-100">
          <div className=""></div>
          <div className="content-container">
            <div className="mx-3 w-100">
              <div className=""></div>
              <div className="content-container ">
                <Outlet />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
