import Tooltip from "@mui/material/Tooltip";
import TextField from '@mui/material/TextField'
import Zoom from '@mui/material/Zoom';
import { useEffect } from "react";


export default function Fields(props) {

  const fields = [
    {
      label: 'Username',
      title: 'Your SAP username is required to access this page',
      required: true,
      multiline: false,
      onChange: e => props.setUsername(e.target.value),
      verify: props.handleVerify('username',props.username),
      value: props.username

    },
    {
      label: 'Email',
      title: 'Your email is required to send this request',
      required: true,
      multiline: false,
      onChange: e => props.setEmail(e.target.value),
      verify: props.handleVerify('email',props.email),
      value: props.email,
      placeholder: 'jonhdoe@nidec-ga.com' 

    },
    {
      label: 'CR/ISR/Nota',
      title: 'A CR number is required to send this request',
      required: true,
      multiline: false,
      onChange: e => props.setCr(e.target.value),
      verify: props.handleVerify('cr',props.cr),
      value: props.cr,
      placeholder: 'RB7894' 

    },
    {
      label: 'Value',
      title: 'How much does this request cost in R$',
      required: true,
      multiline: false,
      onChange: e => props.setValue(e.target.value),
      verify: props.handleVerify('value',props.value),
      value: props.value,
      placeholder: '1000' 
    },
    {
      label: 'Description',
      title: 'A brief description of the request',
      required: true,
      multiline: true,
      onChange: e => props.setDescription(e.target.value),
      verify: props.handleVerify('description',props.description),
      value: props.description
    }
  ]

  return (
    <>
      {
        fields.map((field, index) => (
          <div key={index} style={{ marginBottom: '1rem', display: 'flex', width: '100%', }}>
            <Tooltip
              title={field.required ? 'Fields marked with * are mandatory' : ''}
              TransitionComponent={Zoom}
              arrow
              placement="right">
              <TextField
                id="outlined-basic"
                label={field.label}
                variant='standard'
                onChange={field.onChange}
                required={field.required}
                helperText={field.title}
                multiline={field.multiline}
                fullWidth
                value={field.value}
                error={field.verify}
                placeholder={field.placeholder}
              />
            </Tooltip>
          </div>
        ))
      }
    </>
  );
}


