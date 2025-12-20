import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { resetPassword } from '../services/authService';
import '../styles/Auth.css';
import { toast } from 'react-toastify';

const ResetPassword: React.FC = () => {
  const { token } = useParams();
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleReset = async () => {
    if (!token) {
      toast('Invalid reset link');
      return;
    }
    try {
      await resetPassword(token, password);
      toast('Password reset successful, please login');
      navigate('/');
    } catch (err: unknown) {
      toast('Error resetting password');
    }
  };

  return (
    <div className="auth-container">
      <h2>Reset Password</h2>
      <input
        type="password"
        placeholder="New Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleReset}>Reset</button>
    </div>
  );
};

export default ResetPassword;
