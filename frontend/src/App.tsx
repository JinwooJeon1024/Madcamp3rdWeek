import React from 'react';
import logo from './logo.svg';
import './App.css';
import { StartEditButton } from './components/StartEditButton';

function App() {
  const startEdit = () => {
    console.log("edit 시작");
  };
  return (
    <div className="App">
      <header className="App-header">
      </header>
      <body className="App-body">
        <h1>How was your day?</h1>
        <StartEditButton label="edit" />
      </body>
    </div>
  );
}

export default App;
