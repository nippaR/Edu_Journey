import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Badge from '@mui/material/Badge';
import axios from 'axios';
import ProfileIcon from './ProfileIcon';

function Header() {
  const [unreadCount, setUnreadCount] = useState(0);
  const location = useLocation();

  useEffect(() => {
    const loadUnreadCount = async () => {
      try {
        // 1) Fetch all notifications
        const res = await axios.get(
          'http://localhost:8081/api/notifications',
          { withCredentials: true }
        );
        // 2) Count only those where read===false
        const unread = res.data.filter(n => !n.read).length;
        setUnreadCount(unread);
      } catch (err) {
        console.error('Failed to load notifications:', err);
      }
    };

    loadUnreadCount();
  }, [location]);  // re-run on every route change

  const headerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1rem',
    backgroundColor: '#ffffff',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    color:'#048bf1'
  };
  const navStyle = { display: 'flex', alignItems: 'center', fontSize: '1rem' };
  const linkStyle = {
    margin: '0 1rem',
    display: 'flex',
    alignItems: 'center',
    textDecoration: 'none',
    color: '#0248ac',
    fontFamiliy:'poppins',
    fontWieght:'semi-bold'
  };

  const notifIconStyle = { fontSize: '28px', cursor: 'pointer' };

  return (
    <header style={headerStyle}>
      <h1>Edu Journey</h1>
      <nav style={navStyle}>
        <Link to="/home" style={linkStyle}>Home</Link>

        <Link to="/post" style={linkStyle}>Posts</Link>
        <Link to="/jobdash" style={linkStyle}>Jobs</Link>
        <Link to="/coursedash" style={linkStyle}>Courses</Link>

        <Link to="/notifications" style={linkStyle} title="Notifications">
          <Badge
            badgeContent={unreadCount}      // only unread (new) notifications
            color="error"
            overlap="circular"
            showZero={false}
          >
            <NotificationsIcon style={notifIconStyle} />
          </Badge>
        </Link>

        <ProfileIcon />
      </nav>
    </header>
  );
}

export default Header;