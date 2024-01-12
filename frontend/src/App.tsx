import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import HomePage from './pages/HomePage';
import EditPage from './pages/EditPage';
import PreviewPage from './pages/PreviewPage';
import LoginPage from './pages/LoginPage';

const App = () => {
  return (

    <div className="App">
      {/* 기타 앱의 구성 요소 */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />}/>
        <Route path="/edit" element={<EditPage />} />
        <Route path="/edit/preview" element={<PreviewPage />} />
      </Routes>
    </div>

  );
};

export default App;
