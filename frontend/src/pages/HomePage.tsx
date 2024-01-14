import { useNavigate } from 'react-router-dom';
import React, { ReactElement } from 'react';

interface HomePageProps {
  widgets: ReactElement[];
}

const HomePage: React.FC<HomePageProps> = ({ widgets }) => {
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
      {widgets.map((Widget, index) => (
        <React.Fragment key={index}>
          {Widget}
        </React.Fragment>
      ))}
      <button onClick={startEdit}>Edit</button>
      <br />
      <button onClick={startLogin}>Login</button>
      <br />
      <button onClick={startSignUp}>SignUp</button>
    </main>
  );
};

export default HomePage;
