import React, { useState, useEffect } from "react";
import { NavLink } from 'react-router-dom'
import Leaverequest from '../screens/Requestform'
import './Navbar.css'
import Leavestatus from '../screens/Leavestatus'
import LeaveHistory from '../screens/LeaveHistory'
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';


const Dashboard = ({ setAuth }) => {

  const [name, setName] = useState("");

  const getProfile = async () => {
    try {
      const res = await fetch("http://localhost:5000/dashboard", {
        method: "POST",
        headers: { token: localStorage.token }
      });

      const parseData = await res.json();
      setName(parseData.user_name);
    } catch (err) {
      console.error(err.message);
    }
  };

  const logout = async e => {
    e.preventDefault();
    try {
      localStorage.removeItem("token");
      setAuth(false);

    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getProfile();
  }, []);


  const [value, setValue] = React.useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);};
  return (

    <div>


      <header>
        <nav className="navbar navbar-expand-lg navbar-dark nav-color">
          <NavLink className="navbar-brand" to="/dashboard">
           
          </NavLink>
          <img src="" className="logo md-1" alt="SRMIST" />

          <h2>Welcome {name}</h2>
          
          <ul className="navbar-nav ms-auto">
            <li className="nav-link">
              <NavLink href="">
                <i className="fa-solid fa-user"></i>
              </NavLink  >
              <div className="flex-box">
                <span className="reg">Register Number(Student)</span>
                <button onClick={e => logout(e)} className="btn btn-primary">
            Logout
          </button>
              </div>
            </li>
          </ul>
        </nav>
        <h3 className="head"> Leave Application</h3>
        <div className="nithin">

        </div>
        <div className="nav-item">
         
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <TabList onChange={handleChange} aria-label="lab API tabs example">
                <Tab className="nav-link" label="Leave Request" value="1" />
                <Tab className="nav-link" label="Leave Status" value="2" />
                <Tab className="nav-link" label="Leave History" value="3" />
              </TabList>
            </Box>
            <TabPanel value="1"><Leaverequest/></TabPanel>
            <TabPanel value="2"><Leavestatus/></TabPanel>
            <TabPanel value="3"><LeaveHistory/></TabPanel>
          </TabContext>




        </div>

      </header>





    </div>
  );
};

export default Dashboard;
