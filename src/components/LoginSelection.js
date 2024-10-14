import React from 'react';
import { Link } from 'react-router-dom';
import './LoginSelection.css';

function LoginSelection() {
  return (
    <div className="login-container">
      <h2>Login Selection</h2>
      <p>Select your login type:</p>
      <div className="login-buttons">
        <Link to="/manager-login">
          <button>Manager Login</button>
        </Link>
        <Link to="/employee-login">
          <button>Employee Login</button>
        </Link>
      </div>
    </div>
  );
}

export default LoginSelection;
