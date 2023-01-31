
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Close from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';


export default function AlertMessage(props) {
  return (
    <div style={{ marginTop: '1.5rem' }}>
      <Alert severity={props.type}
        action={
          <IconButton aria-label="close" align='end' color="inherit" size="small"
            onClick={() => { props.setOpenAlert(false) }}>
            <Close fontSize="inherit" />
          </IconButton>
        }
      >
        <AlertTitle >{props.title}</AlertTitle>
        {props.text}  — <strong>{props.highlight}</strong>

      </Alert>
    </div>
  );
}