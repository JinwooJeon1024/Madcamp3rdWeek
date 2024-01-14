import { useNavigate } from "react-router-dom";
import React, { ReactElement } from "react";

const HomePage = () => {
  const navigate = useNavigate();

  const startLogin = () => {
    navigate("/login");
  };
  const startSignUp = () => {
    navigate("/signup");
  };

  return (
    <main className="App-body">
      <br />
      <button onClick={startLogin}>Login</button>
      <br />
      <button onClick={startSignUp}>SignUp</button>
    </main>
  );
};

export default HomePage;
