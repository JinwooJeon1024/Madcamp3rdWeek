import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import HomePage from './components/HomePage';
import EditPage from './components/EditPage';
import PreviewPage from './components/PreviewPage';
import LoginPage from './components/LoginPage';
import SignUpPage from './components/SignUpPage';

const App = () => {
  return (

    <div className="App">
      {/* 기타 앱의 구성 요소 */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />}/>
        <Route path="/signup" element={<SignUpPage />}/>
        <Route path="/edit" element={<EditPage />} />
        <Route path="/edit/preview" element={<PreviewPage />} />
      </Routes>
    </div>

  );
};

export default App;
