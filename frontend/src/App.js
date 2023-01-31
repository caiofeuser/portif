import React, { useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PrivateRoute from './utils/PrivateRoute';
import { AuthProvider } from './context/AuthContext';
import Exemple from './pages/Exemple';
import Login from './pages/Login';
import Register from './pages/Register';
import Request from './pages/Request';
import Forms from './pages/Forms';
import Approval from './pages/Approval';
import History from './pages/History'
import Footer from './components/Footer';

function App() {

  const wrapper = {
    display: 'flex',
    flexGrow: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
  }

  return (
    <>
      <div style={wrapper}>
        <Router>
          <div style={{ width: 'auto'}}>
            <link
              rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
            <AuthProvider>
              <Routes>
                <Route element={<Login />} path="/login" />
                <Route element={<Register />} path="/register" />
                <Route path="/approval" element={<PrivateRoute Component={Approval} />} />
                <Route path="/history" element={<PrivateRoute Component={History} />} />
                <Route path="/forms" element={<Forms />} />
                <Route path="/" element={<Request />} />
              </Routes>
            </AuthProvider>
          </div>
        </Router>
      </div>
    </>
  );
}

export default App;
