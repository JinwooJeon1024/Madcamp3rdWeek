import { useNavigate } from 'react-router-dom';


const EditPage = () => {
  const navigate = useNavigate();

  const handlePreview = () => {
    navigate('/edit/preview');
  };

  return (
    <div>
      <h1>Edit User Information</h1>
      <button onClick={handlePreview}>Go to Preview</button>
      {/* 여기에 사용자 정보 수정 폼 추가 */}
    </div>
  );
};


export default EditPage;

