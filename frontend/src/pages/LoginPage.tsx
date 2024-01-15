import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginSignUp.css";
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
      console.log(response.data);
      localStorage.setItem("userToken", JSON.stringify(response.data));
      navigate("/main");
      const tempData = {
        type: "exampleType",
        x: 100,
        y: 200,
        width: 5,
        height: 19,
      };
      const authToken = localStorage.getItem("authToken");
      axios
        .post(`${process.env.REACT_APP_API_URL}/widget/create`, tempData, {
          headers: {
            authorization: `Bearer ${authToken}`,
          },
        })
        .then((response2) => {
          // 성공적으로 생성됐을 때의 처리
          console.log(
            "위젯 데이터가 성공적으로 생성되었습니다.",
            response2.data
          );
        })
        .catch((error) => {
          console.error(
            "서버 오류 또는 데이터 생성 실패",
            error.message,
            error.stack
          );
        });
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
    <form onSubmit={handleSubmit}>
      {currentStep === "email" && (
        <div className="Input_container">
          <h1 className="Question">Enter Your Email</h1>
          <input
            className="Input"
            type="email"
            name="email"
            value={userData.email}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
          />
          <div className="Button_container">
            <button className="Twoside_button" onClick={handleToHome}>
              홈으로 돌아가기
            </button>
            <button className="Twoside_button" onClick={handleToPassword}>
              다음으로 이동
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
          />
          <div className="Button_container">
            <button className="Twoside_button" onClick={handleToEmail}>
              이메일로 돌아가기
            </button>
            <button className="Twoside_button" type="submit">
              LOGIN
            </button>
          </div>
        </div>
      )}
    </form>
  );
};

export default LoginPage;
