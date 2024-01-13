import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Routes, Route } from 'react-router-dom';

import HomePage from './pages/HomePage';
import EditPage from './pages/EditPage';
import PreviewPage from './pages/PreviewPage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';

const App = () => {
  return (
    <DndProvider backend={HTML5Backend}>
        <div className="App">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />}/>
            <Route path="/signup" element={<SignUpPage />}/>
            <Route path="/edit" element={<EditPage />} />
            <Route path="/edit/preview" element={<PreviewPage />} />
          </Routes>
        </div>
    </DndProvider>
  );
};

export default App;
