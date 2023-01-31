import Header from "../components/Header";
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button'
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import Zoom from '@mui/material/Zoom';
import { useEffect, useState } from "react";
import React, { useContext } from 'react';
import AuthContext from '../context/AuthContext';
import { useNavigate } from "react-router-dom";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Footer from "../components/Footer";

const theme = createTheme({
  palette: {
    primary: {
      main: '#83bec2'
    },
    secondary: {
      main: '#11cb5f',
    },
  },
});
const wrapper = {
  height: '100vh',
  display: 'flex',
  flexGrow: 1,
  flexDirection: 'column',
  justifyContent: 'space-between',
}


export default function Request() {

  let { user, logoutUser } = useContext(AuthContext);
  let navigate = useNavigate();
  const [isLogged, setIsLogged] = useState(false);
  const [tolltipText, setTooltipText] = useState('You must be logged in to access this page')

  const style = {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 'auto',
    marginTop: '2rem',
    marginBottom: '2rem',
    borderRight: '1px solid #696868',
  }

  const button = {
    width: '60%',
    height: '10rem',
    marginBottom: '5rem',
    marginTop: '5rem',
    padding: '0',
    color: 'white'
  }

  const conditionButton = {
    width: '60%',
    height: '10rem',
    marginBottom: '5rem',
    marginTop: '5rem',
    padding: '0',
    background: isLogged ? '#83bec2' : '#e0e0e0',
    color: 'white'

  }

  useEffect(() => {
    handleUser()
  })

  const handleUser = () => {
    if (user) {
      setIsLogged(true)
      setTooltipText("")

    } else {
      setIsLogged(false)
      setTooltipText("You must be logged in to access this page")
    }
  }

  return (
    <>
      <ThemeProvider theme={theme}>
        <Header />
        <div style={{ display: 'flex', justifyContent: 'center', height: '100vh' }}>
          <Paper style={{ width: '80%', margin: 'auto', marginTop: '5rem', display: 'flex', justifyContent: 'space-between' }}>
            <div style={style}>
              <Button sx={button} variant="contained" disableElevation
                onClick={() => { handleUser(); navigate('/forms') }}>
                <Typography variant="h4" letterSpacing={2}
                >
                  New Request
                </Typography>
              </Button>
            </div>
            <div style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', margin: 'auto', marginTop: '2rem', marginBottom: '2rem', }}>
              <Tooltip
                title={tolltipText}
                TransitionComponent={Zoom}
                arrow>
                <span style={{ width: '100%', height: '9rem', display: 'flex', justifyContent: 'center', alignItems: 'center', margin: 'auto', }}>
                  <Button color='primary' sx={conditionButton}
                    variant="contained"
                    disableElevation
                    disabled={!isLogged}
                    onClick={() => { handleUser(); navigate('/approval'); console.log('entrou') }}>
                    <Typography variant="h4" letterSpacing={2}
                    >
                      Approval
                    </Typography>
                  </Button>
                </span>
              </Tooltip>
            </div>
          </Paper>
        </div>
      </ThemeProvider>
      <Footer />
    </>
  );
}