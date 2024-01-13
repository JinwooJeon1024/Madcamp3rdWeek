import { useNavigate } from 'react-router-dom';
import TextWidget from '../widgets/TextWidget';

const HomePage = () => {
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
    <main className="App-body">
      <h1>How was your day?</h1>
      <TextWidget />
      <button onClick={startEdit}>Edit</button>
      <br />
      <button onClick={startLogin}>Login</button>
      <br />
      <button onClick={startSignUp}>SignUp</button>
    </main>
  );
};

export default HomePage;
