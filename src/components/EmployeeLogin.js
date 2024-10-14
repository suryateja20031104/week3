import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './EmployeeLogin.css';

function EmployeeLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      console.log(username, password);
      if (username === 'employee1' && password === 'pass123') {
        console.log('done');
        navigate('/employee-dashboard');
      } else {
        alert('Invalid employee credentials');
      }
    } catch (error) {
      console.error('Error logging in', error);
    }
  };

  return (
    <div className="employee-login-container">
      <h2>Employee Login</h2>
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

export default EmployeeLogin;
