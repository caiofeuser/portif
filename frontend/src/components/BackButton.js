import { Button, Fab, IconButton } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
export default function BackButton() {
  let navigate = useNavigate();

  const fabStyle = {
    position: 'absolute',
    margin: '1rem 0rem 0rem 1rem',
    background: 'white',
  }

  const iconStyle = {
    color: '#83bec2',
  }

  return(
    <Fab style={fabStyle} size="small"  onClick={() => {navigate('/'); console.log('backbutton')}} >
      <ArrowBackIosNewIcon style={iconStyle} fontSize='small'/>
    </Fab>
  );
}