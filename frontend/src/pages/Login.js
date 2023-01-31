import { useContext } from 'react';
import AuthContext from '../context/AuthContext';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import React from 'react';
import { Paper } from '@mui/material';
import TextField from '@mui/material/TextField';
import AccountCircle from '@mui/icons-material/AccountCircle';
import LockIcon from '@mui/icons-material/Lock';
import BackButton from '../components/BackButton';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';

function Login() {
  const { loginUser } = useContext(AuthContext);
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');

  const handleSubmit = (e) => {
    username.length > 0 && loginUser(username, password);
  }

  const button = {
    color: 'white',
    background: '#38a1a9',
    margin: '3rem 0 1rem 0',
    padding: '0.5rem 0 0.5rem 0',
    width: '30%',
    '&:hover': {
      background: '#007982',
    }
  }

  const paper = {
    background: 'white',
    padding: '3rem',
    marginTop: '8rem',
    width: '40%',
  }

  const wrapper = {
    display: 'flex',
    flexDirection: 'column',
    marginTop: '3rem',
    alignItems: 'center',
    justifyContent: 'center',
  }

  const linkRequest = {
    textDecoration: 'none',
    color: 'white',
    background: '#38a1a9',
    padding: '0.5rem ',
    borderRadius: '0.5rem',
    marginLeft: '0.5rem',
    '&:hover': {
      background: '#007982',
    }
  }

  const fixingPadding = {
    style: {
      padding: 5
    }
  }

  return (
    <div>
      <div style={{ height: '100vh' }}>
        <BackButton />
        <div style={{ display: 'flex', justifyContent: 'center', width: '100%', }}>
          <Paper style={paper}>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <img src='embraco_black.svg' width='100' />
            </div>
            <div style={wrapper}>
              <div
                style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}>
                <AccountCircle sx={{ color: '#007982', mr: 1, my: 0.5 }} />
                <TextField
                  label="Username" variant="standard"
                  onChange={e => setUsername(e.target.value)}
                  inputProps={fixingPadding}
                />
              </div>
              <div
                style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'center', marginTop: '2rem' }}>
                <LockIcon sx={{ color: '#007982', mr: 1, my: 0.5 }} />
                <TextField label="Password" variant="standard"
                  type="password" onChange={e => setPassword(e.target.value)}
                  inputProps={fixingPadding}
                />
              </div>
              <Button
                onClick={() => handleSubmit()}
                sx={button}>
                Login
              </Button>
              <Typography align='center' mt={3}>
                Don't have a user and wanna make a request?
                <Link to="/" style={linkRequest}> Click here!</Link>
              </Typography>
            </div>
          </Paper>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Login;
