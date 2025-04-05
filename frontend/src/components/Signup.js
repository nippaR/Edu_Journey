import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Signup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Check if password and confirm password match
    if (formData.password !== formData.confirmPassword) {
      setMessage("Passwords do not match");
      return;
    }
    // Call your backend signup endpoint
    fetch('http://localhost:8081/api/auth/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: formData.username,
        email: formData.email,
        password: formData.password
      })
    })
      .then(response => {
        if (!response.ok) {
          return response.text().then(text => { throw new Error(text); });
        }
        return response.json();
      })
      .then(data => {
        setMessage("Signup successful! Please login.");
        setTimeout(() => navigate('/login'), 1500);
      })
      .catch(err => {
        setMessage("Error: " + err.message);
      });
  };

  // Inline styles for a modern signup form
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
    width: '360px',
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
    cursor: 'pointer',
    backgroundColor: '#5A67D8',
    color: '#fff'
  };

  const loginLinkStyle = {
    marginTop: '1rem',
    fontSize: '0.9rem',
    color: '#555'
  };

  return (
    <div style={containerStyle}>
      <div style={formWrapperStyle}>
        <h2 style={titleStyle}>Sign Up</h2>
        <form onSubmit={handleSubmit} style={{ width: '100%' }}>
          <input
            style={inputStyle}
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            required
          />
          <input
            style={inputStyle}
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            style={inputStyle}
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <input
            style={inputStyle}
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
          <button type="submit" style={buttonStyle}>
            Sign Up
          </button>
        </form>
        <div style={loginLinkStyle}>
          Already have an account? <a href="/login">Login</a>
        </div>
        {message && <p style={{ marginTop: '1rem', color: 'red' }}>{message}</p>}
      </div>
    </div>
  );
}

export default Signup;
