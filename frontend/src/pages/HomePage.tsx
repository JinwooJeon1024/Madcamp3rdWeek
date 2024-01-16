import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import './HomePage.css'


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
    <main className="Home_container">
      <div className="Left">
        <img className="Home_logo" src={process.env.PUBLIC_URL + "/name.png"} alt="CANVAS"/>
      </div>
      <div className="Right">
        <div className="Line"></div>
        <button className="Login_container" onClick={startLogin}>login</button>
        <button className="Signup_container" onClick={startSignUp}>sign up</button>
        <img className="Vas" src={process.env.PUBLIC_URL + "/vas.png"} alt="Visual Adaptive Simple"/>
      </div>
    </main>
  );
};

export default HomePage;
