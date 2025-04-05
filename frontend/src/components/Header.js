import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
  const headerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1rem',
    backgroundColor: '#f5f5f5'
  };

  const navStyle = {
    fontSize: '1rem'
  };

  const profileIconStyle = {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    cursor: 'pointer'
  };

  return (
    <header style={headerStyle}>
      <h1>Edu Journey</h1>
      <nav style={navStyle}>
        <Link to="/">Home</Link> |{' '}
        <Link to="/signup">Signup</Link> |{' '}
        <Link to="/login">Login</Link> |{' '}
        <Link to="/profile">
          <img 
            src="https://via.placeholder.com/40" 
            alt="Profile" 
            style={profileIconStyle} 
          />
        </Link>
      </nav>
    </header>
  );
}

export default Header;
