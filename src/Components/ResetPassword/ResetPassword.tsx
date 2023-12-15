/** @format */

import React from "react";

import { useState, useContext } from "react";
import { AuthContext } from "../../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Form, Button, Col, Container, Row } from "react-bootstrap";
import logo from "../../assets/images/PMS 3.png";
import Loading from "../Loading/Loading";
import axios from "axios";
import PasswordInput from "../../Shared/PasswordInput/PasswordInput";
import { toast } from "react-toastify";

export default function ResetPassword() {
  let { BaseUrl, saveUserData, requestHeaders }: any = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  }: any = useForm();
  const resetPasswordForm = (data) => {
    setIsLoading(true);
    axios
      .post("http://upskilling-egypt.com:3003/api/v1/Users/Reset", data)
      .then((response) => {
        toast.success("reset Password success", {
          autoClose: 2000,
        });
        navigate("/login");
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        toast.error("Failed to reset password. Please try again.");
      });
  };
  return (
    <div className="main-screen">
      <Container fluid>
        <Row className=" justify-content-center align-items-center vh-100">
          <Col className="col-md-6">
            <div className="text-center">
              <img
                src={logo}
                style={{ width: "30%" }}
                alt="image of logo brand"
              />
            </div>
            <div className="from-bg p-5 rounded-3">
              <span className="text-white">welcome to PMS</span>
              <h2 className="p-0 m-0" style={{ color: "rgb(227 156 26)" }}>
                Forget Password
              </h2>
              <span className="login-underline"></span>
              <Form onSubmit={handleSubmit(resetPasswordForm)}>
                <label
                  htmlFor="mail"
                  className="fw-bold"
                  style={{ color: "rgb(227 156 26)" }}
                >
                  Email
                </label>
                <input
                  className="form-input"
                  type="email"
                  placeholder="Enter your e-mail"
                  id="mail"
                  {...register("email", {
                    required: "email required",
                    pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                  })}
                />
                {errors.email && errors.email.type === "required" && (
                  <span className="text-danger d-block">Email is required</span>
                )}
                {errors.email && errors.email.type === "pattern" && (
                  <span className="text-danger d-block">
                    Enter a valid email
                  </span>
                )}
                <div>
                  <PasswordInput
                    register={register}
                    label={"OPT Verification"}
                    placeholder={"Enter Verification"}
                    value={"seed"}
                  />
                  {errors.seed && errors.seed?.type === "required" && (
                    <span className="text-danger">the OTP is required </span>
                  )}
                </div>
                <div>
                  <PasswordInput
                    register={register}
                    label={" Password"}
                    placeholder={"Enter Your password"}
                    value={"password"}
                  />
                  {errors.password && errors.password?.type === "required" && (
                    <span className="text-danger">
                      the password is required{" "}
                    </span>
                  )}
                </div>
                <div>
                  <PasswordInput
                    register={register}
                    label={"confirm Password"}
                    placeholder={"Enter confirm Password"}
                    value={"confirmPassword"}
                  />
                  {errors.confirmPassword &&
                    errors.confirmPassword?.type === "required" && (
                      <span className="text-danger">
                        the confirm Password is required{" "}
                      </span>
                    )}
                </div>
                <div className="my-3">
                  <Button className="form-button btn rounded-5" type="submit">
                    {isLoading ? (
                      <Loading />
                    ) : (
                      <span className="fw-bold">save</span>
                    )}
                  </Button>
                </div>
              </Form>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
