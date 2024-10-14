import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ManagerLogin.css';

function ManagerLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();
  const handleLogin = async () => {
    try {
      console.log(username, password);
      if (username === 'manager1' && password === 'adminpass123') {
        console.log('done');
        navigate('/manager-dashboard');
      } else {
        alert('Invalid manager credentials');
      }
    } catch (error) {
      console.error('Error logging in', error);
    }
  };

  return (
    <div className="manager-login-container">
      <h2>Manager Login</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}

export default ManagerLogin;
