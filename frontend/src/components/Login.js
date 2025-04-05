import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();
  
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleFormLogin = (e) => {
    e.preventDefault();
    fetch('http://localhost:8081/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
      credentials: 'include'
    })
      .then(response => {
        if (!response.ok) {
          return response.text().then(text => { throw new Error(text); });
        }
        return response.json();
      })
      .then(data => {
        setMessage('Login successful!');
        // Store the email (or username) for later use in the profile page.
        localStorage.setItem("userEmail", Date.username);
        navigate('/'); // Navigate to home page on success.
      })
      .catch(err => setMessage('Error: ' + err.message));
  };

  // Removed the handleGoogleLogin function since it's no longer needed
  // const handleGoogleLogin = () => {
  //   window.location.href = 'http://localhost:8081/oauth2/authorization/google';
  // };

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

  const titleStyle = { marginBottom: '1.5rem', color: '#333' };
  const inputStyle = { width: '100%', padding: '0.75rem', marginBottom: '1rem', border: '1px solid #ccc', borderRadius: '4px' };
  const buttonStyle = { width: '100%', padding: '0.75rem', margin: '0.5rem 0', border: 'none', borderRadius: '4px', cursor: 'pointer' };
  
  const loginButtonStyle = { ...buttonStyle, backgroundColor: '#5A67D8', color: '#fff' };
  // Removed googleButtonStyle since it's no longer needed
  const registerStyle = { marginTop: '1rem', color: '#555', fontSize: '0.9rem' };

  return (
    <div style={containerStyle}>
      <div style={formWrapperStyle}>
        <h2 style={titleStyle}>Login</h2>
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
          <button type="submit" style={loginButtonStyle}>Login with Username/Password</button>
        </form>
        {/* Removed the Google login section */}
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
