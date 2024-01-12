// 다른 임포트들
import React from 'react';
import { useNavigate } from 'react-router-dom';
import TextWidget from '../widgets/TextWidget'; // TextWidget 임포트

const HomePage = () => {
  console.log("Homepage is rendering");
  const navigate = useNavigate();

  const startEdit = () => {
    navigate('/edit');
  };
  const startLogin = () => {
    navigate('/login');
  };
  const startSignUp =()=>{
    navigate('signup');
  };

  return (
    <main className="App-body">
      <h1>How was your day?</h1>
      <TextWidget />
      <button onClick={startEdit}>Edit</button>
      <br/>
      <button onClick={startLogin}>Login</button>
      <br/>
      <button onClick={startSignUp}>SignUp</button>
    </main>
  );
};

export default HomePage;
