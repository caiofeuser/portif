import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import { shadows } from '@mui/system';



export default function Footer() {
  const [year, setYear] = useState(2023);

  useEffect(() => {
    setYear(new Date().getFullYear())
  })

  const wrapper = {
    background: '#007982',
    display: 'flex',
    justifyContent: 'center',
    marginTop: '4rem',  
  }

  const imgWrapper = { 
    display:'flex', 
    justifyContent:'space-evenly',
    alignItems:'center',
    margin:'1rem 0 0rem 0'
    
    }

  return (
    <Paper square style={wrapper} >
      <div>
        <div style={imgWrapper}>
          <a href='/'>
            <img src='embraco.svg' width={75} />
          </a>
          <a href='https://neo.certi.org.br/'>
            <img src='logoNeoWhite.svg' width={35} />
          </a>
        </div>
        <Typography variant="body2" style={{color:'#83BEC2' }} align="center" mt={1} mb={1}>
          © Embraco Nidec - NEO Empresarial - {year == 2023 ? year : `2023 - ${year}`}
        </Typography>
      </div>
    </Paper>
  );
}


