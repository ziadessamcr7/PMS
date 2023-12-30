/** @format */

import React from "react";
import Spinner from "react-bootstrap/Spinner";
import style from "./LoadingSpinner.module.css";

const LoadingSpinnerTables = () => {
  return (
    <>
      <div className="col-3">
        <div
          className="snippet"
          style={{
            position: "fixed",
            inset: " 50% 0% 0% 50%",
          }}
          data-title="dot-collision"
        >
          <div className="stage">
            <div className={style.dotCollision}></div>
          </div>
        </div>
      </div>
    </>
  );
};
export default LoadingSpinnerTables;
