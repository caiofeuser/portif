import React, { useContext } from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import Latbar from './Latbar'
import AccountMenu from './AccountMenu';
import { Paper } from '@mui/material';

function Header() {

  const headerItems = {
    display: 'flex', 
    alignItems: 'center'
  }

  return (
    <Paper className="header" style={{ background: '#007982', paddingBottom: '5px' }} square>
      <ul style={{ padding: '0', display: 'flex', justifyContent: 'space-between', textAlign: 'center', marginTop: "8px", marginBottom: "8px" }} >
        <li style={headerItems}>
          <Latbar />
        </li>
        <Link to="/">
          <img src="embraco.svg" height={'45'}></img>
        </Link>
        <li style={headerItems}>
          <div style={{ display: 'flex' }}>
            <div >
              <AccountMenu />
            </div>
          </div>
        </li>
      </ul>
    </Paper>
  );
};

export default Header;
