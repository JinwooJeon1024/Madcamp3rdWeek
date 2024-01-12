import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import EditPage from './components/EditPage';
import PreviewPage from './components/PreviewPage';
import { ClickCountProvider } from './components/clickCountContext';

const App = () => {
  return (
    <ClickCountProvider>
      <div className="App">
        {/* 기타 앱의 구성 요소 */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/edit" element={<EditPage />} />
          <Route path="/edit/preview" element={<PreviewPage />} />
        </Routes>
      </div>
    </ClickCountProvider>
  );
};

export default App;
