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

  const linkStyle = {
    margin: '0 1rem' // Adjust the margin as needed
  };

  const profileIconStyle = {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    cursor: 'pointer',
    marginRight: '1rem'
  };

  return (
    <header style={headerStyle}>
      <h1>Edu Journey</h1>
      <nav style={navStyle}>
        <Link to="/home" style={linkStyle}>Home</Link>
        <Link to="/profile" style={linkStyle}>
          <img 
            src="https://via.placeholder.com/40" 
            alt="Profile" 
            style={profileIconStyle} 
          />
        </Link>
        <Link to="/jobdash" style={linkStyle}>Jobs</Link>
        <Link to="/coursedash" style={linkStyle}>Courses</Link>
        <Link to="/login" style={linkStyle}>Logout</Link>
      </nav>
    </header>
  );
}

export default Header;