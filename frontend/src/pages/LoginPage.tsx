import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginSignUp.css";
import "./HomePage.css";
import axios, { AxiosError } from "axios";

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  console.log("loginpage");

  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });
  const [currentStep, setCurrentStep] = useState<"email" | "password">("email");

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      switch (currentStep) {
        case "email":
          handleToPassword();
          break;
        case "password":
          handleToPassword();
          break;
        default:
          break;
      }
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleToPassword = () => {
    setCurrentStep("password");
  };
  const handleToEmail = () => {
    setCurrentStep("email");
  };
  const handleToHome = () => {
    navigate("/");
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/users/login`,
        userData
      );
      localStorage.setItem("userToken", response.data.token);
      navigate("/main");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError;
        if (axiosError.response) {
          console.error("Error submitting form : ", error.response?.data);
        } else {
          console.error("Unexpected error : ", error);
        }
      } else {
        console.error("Non-Axios error : ", error);
      }
    }
  };
  return (
    <div className="Container">
      <div className="Left">
        <img className="Home_logo" src={process.env.PUBLIC_URL + "/name.png"} alt="CANVAS"/>
      </div>
      <div className="Right">
        <form onSubmit={handleSubmit}>
          {currentStep === "email" && (
            <div>
              <h1 className="Question">Enter Your Email</h1>
              <input
                className="Input"
                type="email"
                name="email"
                value={userData.email}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                autoFocus
              />
              <div className="Button_container">
                <button className="Twoside_button" onClick={handleToHome}>
                  back
                </button>
                <button className="Twoside_button" onClick={handleToPassword}>
                  next
                </button>
              </div>
            </div>
          )}
          {currentStep === "password" && (
            <div className="Input_container">
              <h1 className="Question">Enter Your Password</h1>
              <input
                className="Input"
                type="password"
                name="password"
                value={userData.password}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                autoFocus
              />
              <div className="Button_container">
                <button className="Twoside_button" onClick={handleToEmail}>
                  back
                </button>
                <button className="Twoside_button" type="submit">
                  login
                </button>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
