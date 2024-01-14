import { useNavigate } from "react-router-dom";
import React, { ReactElement, useEffect } from "react";

const HomePage = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const storedToken = localStorage.getItem('userToken');
    if(storedToken){
      navigate("/main");
    }
  }, []);
  const startLogin = () => {
    navigate("/login");
  };
  const startSignUp = () => {
    navigate("/signup");
  };

  return (
    <main className="todo">
      <br />
      <button onClick={startLogin}>Login</button>
      <br />
      <button onClick={startSignUp}>SignUp</button>
    </main>
  );
};

export default HomePage;
