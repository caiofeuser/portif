import { useState, useContext } from 'react';
import AuthContext from '../context/AuthContext';
import BackButton from '../components/BackButton';
import { Paper } from '@mui/material';
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField';
import AccountCircle from '@mui/icons-material/AccountCircle';
import LockIcon from '@mui/icons-material/Lock';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Footer from '../components/Footer';

const theme = createTheme({
  palette: {
    primary: {
      main: '#007982'
    },
    secondary: {
      main: '#11cb5f',
    },
  },
});

function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const { registerUser } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    registerUser(username, password, password2);
  };


  const button = {
    color: 'white',
    margin: '3rem 0 1rem 0',
    padding: '0.5rem 0 0.5rem 0',
    width: '30%',
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
    <>
      <BackButton />
      <div style={{ height:'100vh' }}>
      <ThemeProvider theme={theme} >
        <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
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
                <TextField
                  label="Password" variant="standard"
                  onChange={e => setPassword(e.target.value)}
                  type="password"
                  inputProps={fixingPadding}
                />
              </div>
              <div
                style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'center', marginTop: '2rem' }}>
                <LockIcon sx={{ color: '#007982', mr: 1, my: 0.5 }} />
                <TextField
                  label="Confirm your password" variant="standard"
                  onChange={e => setPassword2(e.target.value)}
                  type='password'
                  inputProps={fixingPadding}
                  helperText={password2 !== password ? 'Passwords do not match' : ''}
                />
              </div>
              <Button onClick={handleSubmit} style={button} color="primary" variant='contained'>
                Register
              </Button>
            </div>
          </Paper>
        </div>
      </ThemeProvider>
      </div>
      <Footer />
    </>
  );
}

export default Register;
