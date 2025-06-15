import * as React from 'react';
import Box from '@mui/material/Box';
import { IconButton, Grid } from '@mui/material';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook

const settings = ['Profile', 'Logout'];

function ProfileIcon() {
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const navigate = useNavigate(); // Initialize useNavigate hook

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleMenuItemClick = (setting) => {
        handleCloseUserMenu();
        switch (setting) {
            case 'Profile':
                navigate('/profile'); // Navigate to the Profile page
                break;
            case 'Logout':
                navigate('/'); // Navigate to the Logout page
                break;
            default:
                break;
        }
    };

    return (
        <Grid>
            <Box>
                <Tooltip title="Open settings">
                    <IconButton onClick={handleOpenUserMenu}>
                        <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                    </IconButton>
                </Tooltip>
                <Menu
                    id="menu-appbar"
                    anchorEl={anchorElUser}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    keepMounted
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    open={Boolean(anchorElUser)}
                    onClose={handleCloseUserMenu}
                >
                    {settings.map((setting) => (
                        <MenuItem key={setting} onClick={() => handleMenuItemClick(setting)}>
                            <Typography sx={{ textAlign: 'center' }}>{setting}</Typography>
                        </MenuItem>
                    ))}
                </Menu>
            </Box>
        </Grid>
    );
}

export default ProfileIcon;