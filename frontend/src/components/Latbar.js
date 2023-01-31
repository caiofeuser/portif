import * as React from "react";
import Box from "@mui/material/Box";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from '@mui/icons-material/Menu';
import Plus from '@mui/icons-material/Add';
import Clock from '@mui/icons-material/AccessTime';
import Check from '@mui/icons-material/Check';
import { useNavigate } from "react-router-dom";
import LogoutIcon from '@mui/icons-material/Logout';
import AuthContext from '../context/AuthContext';
import { useContext, useEffect, useState } from "react";
import LoginIcon from '@mui/icons-material/Login';
import HomeIcon from '@mui/icons-material/Home';

export default function LatBar() {
  const [state, setState] = React.useState(false);
  const [isLogged, setIsLogged] = useState(false);
  let navigate = useNavigate();
  let { user, logoutUser } = useContext(AuthContext);

  const toggleDrawer = (anchor, open) => (event) => {
    if (event && event.type === "keydown" && (event.key === "Tab" || event.key === "Shift")) {
      return;
    }
    setState({ ...state, [anchor]: open });
  };

  useEffect(() => {
    handleUser()
  }, [user])

  const handleUser = () => {
    if (user) {
      setIsLogged(true)

    } else {
      setIsLogged(false)
    }
  }

  const menuItemsTop = [
    { name: 'Home', icon: <HomeIcon />, route: '/' },
    { name: 'Request', icon: <Plus />, route: '/forms' },
    { name: 'History', icon: <Clock />, route: '/history' },
    { name: 'Approval', icon: <Check />, route: '/approval' }
  ]

  const boxStyle = {
    width: 250,
    paddingTop: '1rem',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    borderLeft: '0.25rem solid #007982',
    height: '100vh'
  }

  const list = (anchor) => (
    <Box
      style={boxStyle}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {menuItemsTop.map((item, index) => (
          <ListItem key={index} disablePadding>
            <ListItemButton onClick={() => navigate(`${item.route}`)}>
              <ListItemIcon>
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      {isLogged ?
        <ListItem disablePadding style={{ marginBottom:'0.5rem'}}>
          <ListItemButton onClick={logoutUser}>
            <ListItemIcon>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText primary='Logout' />
          </ListItemButton>
        </ListItem>
        :
        <ListItem disablePadding style={{ marginBottom:'0.5rem'}}>
          <ListItemButton
          onClick={navigate('/login')}
          >
            <ListItemIcon>
              <LoginIcon />
            </ListItemIcon>
            <ListItemText primary='Login' />
          </ListItemButton>
        </ListItem>
      }
    </Box>
  );

  return (
    <div>
      {["left"].map((anchor) => (
        <React.Fragment>
          <Button onClick={toggleDrawer(anchor, true)}>
            <MenuIcon style={{ color: 'white', width: '2rem', height: '2rem' }} />
          </Button>
          <SwipeableDrawer
            anchor="left"
            open={state[anchor]}
            onClose={toggleDrawer("left", false)}
            onOpen={toggleDrawer("left", true)}
          >
            {list(anchor)}
          </SwipeableDrawer>
        </React.Fragment>
      ))}
    </div>
  );
}
