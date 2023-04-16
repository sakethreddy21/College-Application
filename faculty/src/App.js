import React, {Fragment, useState, useEffect} from "react";
import './App.css';

import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import Requestform from './screens/Requestform'
import Leavestatus from './screens/Leavestatus'

import{BrowserRouter as Router,
Routes, Route, Navigate} from "react-router-dom";

function App() {
  const checkAuthenticated = async () => {
    try {
      const res = await fetch("http://localhost:5000/auth/verify", {
        method: "POST",
        headers: { Token: localStorage.token }
      });

      const parseRes = await res.json();

      parseRes === true ? setIsAuthenticated(true) : setIsAuthenticated(false);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    checkAuthenticated();
  }, []);

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const setAuth = boolean => {
    setIsAuthenticated(boolean);
  };
  
  return (
    <Fragment>
      <Router>
        <div className="container">
        
          <Routes>
            <Route
              exact
              path="/login"
              Component={props =>
                !isAuthenticated ? (
                  <Login {...props} setAuth={setAuth} />
                ) : (
                  <Navigate to="/dashboard" />
                )
              }
            />
            <Route
              exact
              path="/register"
              Component={props =>
                !isAuthenticated ? (
                  <Register {...props} setAuth={setAuth} />
                ) : (
                  <Navigate to="/dashboard" />
                )
              }
            />
            <Route
              exact
              path="/dashboard"
              Component={props =>
                isAuthenticated ? (
                  <Dashboard {...props} setAuth={setAuth} />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
            
            <Route
              exact
              path="/leaverequest"
              element={
                isAuthenticated ? (
                 <Requestform />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
            <Route
              exact
              path="/leavestatus"
              element={
                isAuthenticated ? (
                 <Leavestatus />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
           
         
         
          </Routes>
        </div>
      </Router>
    </Fragment>
  );
}

export default App;