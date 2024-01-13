import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DndProvider, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import TextWidget from '../widgets/TextWidget';

const HomePage = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const [, dropRef] = useDrop({
      accept: "widget",
      drop: (item, monitor) => {
        const delta = monitor.getClientOffset();
        if (delta) {
          // 드롭된 위치로 TextWidget의 위치를 업데이트
          setPosition({ x: delta.x, y: delta.y });
        }
      },
    });

  const navigate = useNavigate();

  const startEdit = () => {
    navigate('/edit');
  };
  const startLogin = () => {
    navigate('/login');
  };
  const startSignUp = () => {
    navigate('/signup');
  };

  return (
      <DndProvider backend={HTML5Backend}>
      <main className="App-body" ref={dropRef}>
          <h1>How was your day?</h1>
          <TextWidget position={position} />
          <button onClick={startEdit}>Edit</button>
          <br />
          <button onClick={startLogin}>Login</button>
          <br />
          <button onClick={startSignUp}>SignUp</button>
        </main>
    </DndProvider>
  );
};

export default HomePage;