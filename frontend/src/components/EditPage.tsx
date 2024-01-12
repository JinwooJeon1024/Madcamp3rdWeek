import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useClickCount } from './clickCountContext'; // Context 사용

const EditPage = () => {
  const navigate = useNavigate();
  const { count, incrementCount } = useClickCount();

  const handlePreview = () => {
    navigate('/edit/preview');
  };

  const handleIncrement = () => {
    incrementCount();
  };

  return (
    <div>
      <h1>Edit User Information</h1>
      <button onClick={handlePreview}>Go to Preview</button>
      <button onClick={handleIncrement}>Click Me</button>
      <p>Button clicked: {count} times</p>
      {/* 여기에 사용자 정보 수정 폼 추가 */}
    </div>
  );
};

export default EditPage;
