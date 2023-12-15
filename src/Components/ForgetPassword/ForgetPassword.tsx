/** @format */

import { useState, useContext } from "react";
import { AuthContext } from "../../Context/AuthContext";
import { Form, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Button, Col, Container, Row } from "react-bootstrap";
import logo from "../../assets/images/PMS 3.png";
import Loading from "../Loading/Loading";
import axios from "axios";

const ForgetPassword = () => {
  let { BaseUrl, saveUserData, requestHeaders }: any = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  }: any = useForm();
  const forgetPasswordForm = (data) => {
    setIsLoading(true);
    axios
      .post(
        `http://upskilling-egypt.com:3003/api/v1/Users/Reset/Request`,
        data,
        { headers: requestHeaders }
      )
      .then((response) => {
        navigate("/reset-password");
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
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
              <Form onSubmit={handleSubmit(forgetPasswordForm)}>
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

                <div className="my-3">
                  <Button className="form-button btn rounded-5" type="submit">
                    {isLoading ? (
                      <Loading />
                    ) : (
                      <span className="fw-bold">Login</span>
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
};

export default ForgetPassword;
