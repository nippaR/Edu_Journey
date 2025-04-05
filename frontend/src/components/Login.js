import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();

  // For traditional login
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  
  // For showing messages (success/error)
  const [message, setMessage] = useState('');

  // Handler for username/password login form submission
  const handleFormLogin = (e) => {
    e.preventDefault();
    fetch('http://localhost:8081/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      // Using JSON.stringify to send JSON body
      body: JSON.stringify({ username, password }),
      credentials: 'include'  // Include cookies if using session-based authentication
    })
      .then((response) => {
        if (!response.ok) {
          return response.text().then(text => { throw new Error(text); });
        }
        return response.json();
      })
      .then(data => {
        setMessage('Login successful!');
        navigate('/');  // Navigate to the home page after successful login
      })
      .catch((err) => setMessage('Error: ' + err.message));
  };

  // Handler for Google OAuth2 login
  const handleGoogleLogin = () => {
    window.location.href = 'http://localhost:8081/oauth2/authorization/google';
  };

  // Inline styles for a modern login form
  const containerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
  };

  const formWrapperStyle = {
    backgroundColor: '#fff',
    padding: '2rem',
    borderRadius: '8px',
    width: '320px',
    boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  };

  const titleStyle = {
    marginBottom: '1.5rem',
    color: '#333'
  };

  const inputStyle = {
    width: '100%',
    padding: '0.75rem',
    marginBottom: '1rem',
    border: '1px solid #ccc',
    borderRadius: '4px'
  };

  const buttonStyle = {
    width: '100%',
    padding: '0.75rem',
    margin: '0.5rem 0',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer'
  };

  const loginButtonStyle = {
    ...buttonStyle,
    backgroundColor: '#5A67D8',
    color: '#fff'
  };

  const googleButtonStyle = {
    ...buttonStyle,
    backgroundColor: '#DB4437',
    color: '#fff'
  };

  const registerStyle = {
    marginTop: '1rem',
    color: '#555',
    fontSize: '0.9rem'
  };

  return (
    <div style={containerStyle}>
      <div style={formWrapperStyle}>
        <h2 style={titleStyle}>Login</h2>
        
        {/* Username/Password Form */}
        <form onSubmit={handleFormLogin} style={{ width: '100%' }}>
          <input
            style={inputStyle}
            type="text"
            placeholder="Email ID or Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            style={inputStyle}
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" style={loginButtonStyle}>
            Login with Username/Password
          </button>
        </form>
        
        <hr style={{ width: '100%', margin: '1rem 0' }} />
        
        {/* Google Login Button */}
        <button onClick={handleGoogleLogin} style={googleButtonStyle}>
          Login with Google
        </button>

        {/* Forgot Password and Register Links */}
        <div style={registerStyle}>
          <a href="#forgot-password" style={{ marginRight: '1rem' }}>Forgot Password?</a>
          <a href="/signup">Register</a>
        </div>

        {message && <p style={{ marginTop: '1rem', color: 'red' }}>{message}</p>}
      </div>
    </div>
  );
}

export default Login;
