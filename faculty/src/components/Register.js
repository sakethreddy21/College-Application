import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";


const Register=({setAuth})=> {

  const [email, setemail]= useState("")
  const [password, setpassword]= useState("")
  const [name, setname]= useState("")
   
  const onSubmitForm = async e => {
    e.preventDefault();
    try {
      const body = { email, password, name };
      const response = await fetch(
        "http://localhost:5002/auth/register",
        {
          method: "POST",
          headers: {
            "Content-type": "application/json"
          },
          body: JSON.stringify(body)
        }
      );
      const parseRes = await response.json();

      if (parseRes.jwtToken) {
        localStorage.setItem("token", parseRes.jwtToken);
        setAuth(true);
       
      } else {
        setAuth(false);
        
      }
    } catch (err) {
      console.error(err.message);
    }
  };



  return (
    <Fragment>
<h1 className="text-center">Register</h1>
<form  method="post" onSubmit={onSubmitForm}>
 

  <div className="container">
    

  <input type="email" placeholder="Enter email" className="form-control my-3" required value={email} onChange={e => setemail(e.target.value)}/>
    <input type="password" placeholder="Enter Password" className="form-control my-3" required value={password} onChange={e => setpassword(e.target.value)}/>
    <input type="text" placeholder="Enter Username" className="form-control my-3" name="name" required value={name} onChange={e => setname(e.target.value)}/>
    <button className="btn btn-success btn-block" type="submit">Submit</button>
    
  </div>
</form>
<Link to="/login">login</Link>
    </Fragment>
  )
}

export default Register;
