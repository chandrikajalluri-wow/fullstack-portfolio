import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Auth.css';
import '../styles/Home.css';

const Home: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <div className="home-container">
      <div className="home-card">
        <h2>Welcome to the Home Page</h2>
        <p>You are successfully logged in!</p>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
};

export default Home;
