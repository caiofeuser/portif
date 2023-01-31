import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { useContext, useEffect, useState } from 'react';
import Button from '@mui/material/Button'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import useAxios from '../utils/useAxios';
import axios from 'axios';
import AuthContext from '../context/AuthContext';
import AlertMessage from './AlertMessage';
import Collapse from '@mui/material/Collapse';
import Fields from './Fields';


const theme = createTheme({
  palette: {
    primary: {
      main: '#007982',
    },
    secondary: {
      main: '#197001',
    },
  },
});

export default function FieldsForms() {
  const [username, setUsername] = useState('');
  const [cr, setCr] = useState('');
  const [value, setValue] = useState('');
  const [description, setDescription] = useState('');
  const [email, setEmail] = useState('');
  const api = useAxios();
  const [openAlert, setOpenAlert] = useState(false);
  const { user } = useContext(AuthContext);
  const [type, setType] = useState('');
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [highlight, setHighlight] = useState('');
  const [submit, setSubmit] = useState(false)
  let date = new Date();
  let completeDate = `${date.getFullYear()}-${date.getMonth() + 1 > 9 ? date.getMonth() + 1 : `0${date.getMonth() + 1}`}-${date.getDate()}`

  const buttonStyleCancel = {
    border: '1px solid red',
    marginTop: '1rem',
  }

  const buttonStyleSend = {
    marginTop: '1rem',
    border: '1px solid #007982',
  }

  const paperStyle = {
    margin: '4rem 5rem 2rem 5rem',
    padding: '3rem 5rem 3rem 5rem',
    width: 'auto',
    display: 'flex',
    flexDirection: 'column'
  }

  const handleClearfields = () => {
    setUsername('');
    setEmail('');
    setCr('');
    setValue('');
    setDescription('');
  }

  const handleAxiosResponses = (message) => {
    if (message === 500 || message === 400 || message === 401 || message === 403 || message === 404) {
      setType('error')
      setTitle('Error')
      setText('Your request was not sent')
      setHighlight('try again!')
    }
    else if (message === 200 || message === 201 || message === 202 || message === 203 || message === 204 || message === 205 || message === 206 || message === 207 || message === 208 || message === 226) {
      setType('success')
      setTitle('Success')
      setText("Your request was sent")
      setHighlight('successfully!')
      handleClearfields();
      setSubmit(false);

    }
  }

  const handleSubmit = () => {
    let data =
    {
      "username": username,
      "email": email,
      "cr": cr,
      "value_currency": "BRL",
      "value": value,
      "description": description,
      "date": completeDate,
      "approval": false
    }

    if (user) {
      api.post('/purchaserequest/add/', data)
        .catch(error => {
          handleAxiosResponses(error.request.status)
        }
        )
        .then(resp => {
          handleAxiosResponses(resp?.status)
        })
    } else {
      axios.post('http://localhost:8000/api/purchaserequest/addguest/', data)
        .then(
          resp => {
            handleAxiosResponses(resp.status)

          })
        .catch(error => {
          handleAxiosResponses(error.request.status)
        })
    }
    setOpenAlert(true);
    setSubmit(true);
  }


  const handleVerify = (type, input_value) => {
    if (submit) {
      if (type == 'username') {
        if (input_value == '') {
          return true
        } else {
          return false
        }
      }
      if (type == 'email') {
        if (!input_value.includes('@') || !input_value.includes('.')) {
          return true
        } else {
          return false
        }
      }
      if (type == 'cr') {
        if (input_value == '') {
          return true
        } else {
          return false
        }
      }
      if (type == 'value') {
        if (input_value == '') {
          return true
        } else {
          return false
        }
      }
      if (type == 'description') {
        if (input_value == '') {
          return true
        } else {
          return false
        }
      }
    } 
  }

  return (
    <ThemeProvider theme={theme}>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Paper
          style={paperStyle}>
          <Typography variant='h4' style={{
            margin: '0rem 8rem 0.5rem 8rem',
            marginBottom: '0.5rem'
          }}>
            Request Form
          </Typography>
          <Typography variant='body1' align='center' style={{ marginBottom: '1.5rem' }}>
            Please fill in the fields below to send your request
          </Typography>
          <Fields
            username={username}
            setUsername={setUsername}
            email={email}
            setEmail={setEmail}
            cr={cr}
            setCr={setCr}
            value={value}
            setValue={setValue}
            description={description}
            setDescription={setDescription}
            handleVerify={handleVerify}
          />
          <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
            <Button variant="contained" style={buttonStyleSend} color='primary'
              onClick={() => handleSubmit()}
            >
              Send Request
            </Button>
            <Button variant="outlined" style={buttonStyleCancel} color='error'
              onClick={() => handleClearfields()}
            >
              Cancel
            </Button>
          </div>
          <Collapse in={openAlert}>
            <AlertMessage
              style={{ margin: '1rem' }}
              type={type} title={title}
              text={text} highlight={highlight}
              setOpenAlert={setOpenAlert}
            />
          </Collapse>
        </Paper>
      </div>
    </ThemeProvider>
  );
}