import React from 'react';
import { useNavigate } from 'react-router-dom';

const PreviewPage = () => {
  const navigate = useNavigate();

  const handleSave = () => {
    // 여기에 사용자 설정 저장 로직 추가
  };

  const handleCancel = () => {
    navigate('/edit');
  };

  return (
    <div>
      <h1>Preview Settings</h1>
      <button onClick={handleSave}>Save</button>
      <button onClick={handleCancel}>Cancel</button>
      {/* 여기에 미리보기 화면 로직 추가 */}
    </div>
  );
};

export default PreviewPage;
