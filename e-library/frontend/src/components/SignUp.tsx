import React, { useState } from 'react';
import { signup } from '../services/authService';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import '../styles/Auth.css';

const Signup: React.FC = () => {
  const [name, setName] = useState(''); // 👈 new state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSignup = async () => {
    if (!name || !email || !password || !confirmPassword) {
      // 👈 validate name too
      setError('Please fill in all fields');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      await signup(name, email, password); // 👈 pass name to service
      setError('');
      toast.success('Signup successful! Please login.');
      navigate('/');
    } catch (err: unknown) {
      const msg =
        (err as any)?.response?.data?.error ||
        'Signup failed, please try again';
      setError(msg);
      toast.error(msg);
    }
  };

  return (
    <div className="auth-container">
      <h2>Signup</h2>
      <input
        type="text"
        placeholder="Username"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <input
        type="password"
        placeholder="Confirm Password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />

      {error && <p className="error-text">{error}</p>}

      <button onClick={handleSignup}>Signup</button>
    </div>
  );
};

export default Signup;
