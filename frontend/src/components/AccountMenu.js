import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import LoginIcon from '@mui/icons-material/Login';
import { Divider, Typography } from '@mui/material';


export default function Account() {

  let { user, logoutUser } = useContext(AuthContext);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <React.Fragment>
      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
        <Tooltip title="Account settings">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
            <Avatar sx={{ border: '1.5rem', width: 32, height: 32, color: '#007982', background: '#EEF6F6' }}>
              {user !== null ? user.username[0].toUpperCase() : null}
            </Avatar>
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        {user !== null ?
          (
            <div>
              <Typography style={{ margin: '0.5rem 0rem 0.5rem 1rem' }}>
                Hello, <span style={{ fontWeight:'bold' }}>{user.username}</span>!
              </Typography>
              <div style={{ display:'flex', justifyContent:'center' }}>
                <Divider style={{ width: '85%' }}></Divider>
              </div>
              <MenuItem component={Link} to="/register">
                <ListItemIcon>
                  <PersonAdd fontSize="small" />
                </ListItemIcon>
                Add another account
              </MenuItem>
              {/* <MenuItem>
                <ListItemIcon>
                  <Settings fontSize="small" />
                </ListItemIcon>
                Settings
              </MenuItem> */}
              <MenuItem onClick={logoutUser}>
                <ListItemIcon>
                  <Logout fontSize="small" />
                </ListItemIcon>
                Logout
              </MenuItem>
            </div>
          ) : (
            <div>
              <MenuItem component={Link} to="/login">
                <ListItemIcon>
                  <LoginIcon fontSize="small" />
                </ListItemIcon>
                Login
              </MenuItem>
              <MenuItem component={Link} to="/register">
                <ListItemIcon>
                  <PersonAdd fontSize="small" />
                </ListItemIcon>
                Register
              </MenuItem>
            </div>
          )}
      </Menu>
    </React.Fragment>
  )
}

