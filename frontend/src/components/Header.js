import React from 'react';
import { Link } from 'react-router-dom';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { Box, IconButton, Stack, Typography } from '@mui/material';
import ProfileIconStyle from './ProfileIcon';

function Header() {
  return (
    <header>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '1rem 2rem',
          backgroundColor: '#fff',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        }}
      >
        {/* Left side: Logo/Title */}

        <Link to="/home" style={{ textDecoration: 'none' }}>
        <Typography
          variant="h4"
          sx={{
            color: '#0f69d9',
            fontWeight: 'semi-bold',
            fontFamily: 'Poppins',
          }}
        >
          Edu Journey
        </Typography>
        </Link>

        {/* Right side: Navigation */}
        <Stack direction="row" spacing={3} alignItems="center">
          <Link to="/post" style={navLinkStyle}>Posts</Link>
          <Link to="/jobdash" style={navLinkStyle}>Jobs</Link>
          <Link to="/coursedash" style={navLinkStyle}>Courses</Link>

          <Link to="/notifications">
            <IconButton>
              <NotificationsIcon />
            </IconButton>
          </Link>

          <ProfileIconStyle />

        </Stack>
      </Box>
    </header>
  );
}

// Inline style for links
const navLinkStyle = {
  textDecoration: 'none',
  color: '#4a148c',
  fontFamily: 'Poppins',
  fontSize: '1.1rem',
};

export default Header;
