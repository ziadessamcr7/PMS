import React, { useState, useRef, useContext } from "react";
import {
  useForm,
  toast,
  useNavigate,
  Modal,
} from "../../Utls/index.ts";
import Loading from "../Loading/Loading.tsx";
import axios from "axios";
import { AuthContext } from "../../Context/AuthContext.tsx";


export default function ChangePassword({show,handleClose}) {
  let {url,headers}:any=useContext(AuthContext);


  let {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();
  const [isLoading, setisLoading] = useState(false);
  const navigate = useNavigate();
  const password = useRef({});
  password.current = watch("newPassword", "");

  //api intgration
  function onSubmit(data:object) {
    setisLoading(true);
    axios.put(`${url}Users/ChangePassword`,data,headers)
      .then((result) =>
        //toast && navigate

        {
          setisLoading(false);
          toast(result.data.message);
          navigate("/login");
        }
      )
      .catch((error) =>
        //handel error
        {
          // toast("Invalid password")
          console.log(error);
          
        setisLoading(false);
      }
      );
  }

  return (
    <>
      <Modal className="p-5" show={show} onHide={handleClose}>
      
<div className="p-3">
<div>

<h3>Change Password</h3>
<p className="text-muted">Enter your details below</p>
<form onSubmit={handleSubmit(onSubmit)}>
  <div className="form-group my-3">
    <input
      placeholder="Enter your Old password"
      className="form-control "
      type="password"
      {...register("oldPassword", {
        required: "password is required",
        minLength: "Password must have at least 6 characters",
        maxLength: "Password must have at most 20 characters",
      })}
    />
    {errors.oldPassword && (
      <span className="text-danger ps-1">
        {errors.oldPassword.message}
      </span>
    )}
  </div>
  <div className="form-group my-3">
    <input
      placeholder="Enter your new password"
      className="form-control"
      name="newPassword"
      type="password"
      {...register("newPassword", {
        required: "new password is required",
        minLength: "Password must have at least 6 characters",
        maxLength: "Password must have at most 20 characters",
      })}
    />
    {errors.newPassword && (
      <span className="text-danger ps-1">
        {" "}
        {errors.newPassword.message}{" "}
      </span>
    )}
  </div>
  <div className="form-group my-3">
    <input
      placeholder="Confirm password"
      className="form-control"
      type="password"
      {...register("confirmNewPassword", {
        required: "confirm new password is required",
        validate: (value) =>
          value === password.current ||
          "The passwords do not match",
      })}
    />
    {errors.confirmNewPassword && (
      <span className="text-danger ps-1">
        {errors.confirmNewPassword.message}
      </span>
    )}
    <button className="btn btn-outline-warning my-3 w-100">
      {isLoading?<Loading/>:<span>Change Password</span>}
    </button>
  </div>
</form>
</div>
</div>
        
      </Modal>
    </>
  );
}
