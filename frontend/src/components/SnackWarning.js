import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import IconButton from '@mui/material/IconButton';
import { useState } from 'react';

export default function SnackWarning(props) {
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    console.log(props.openSnack)
    props.setOpenSnack(false);
  };
  return (
    <>
      {
        props.quantity > 0 ?
          <Snackbar
            open={props.openSnack}
            TransitionComponent={Slide}
            onClose={() => handleClose}
            autoHideDuration={3000}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
          >
            <Alert severity={props.severity} variant='filled' style={{ width: 'auto' }}>
              {props.quantity} {props.quantity > 1 ? 'items' : 'item'} {props.message}
              <IconButton onClick={() => { handleClose() }} size='small' style={{ margin: '0 0 0 0.5rem', padding: '0' }}>
                <CloseIcon fontSize="small" style={{ color: '#FFFFFF' }} />
              </IconButton>
            </Alert>
          </Snackbar>
          : null
      }
    </>
  );
}