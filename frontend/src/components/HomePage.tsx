import React from 'react';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  console.log("Homepage is rendering");
  const navigate = useNavigate();

  const startEdit = () => {
    navigate('/edit');
  };

  return (
    <main className="App-body">
      <h1>How was your day?</h1>
      <button onClick={startEdit}>Edit</button>
    </main>
  );
};

export default HomePage;
