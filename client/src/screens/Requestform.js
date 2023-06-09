import React, {useState,useEffect, Fragment} from "react";
import './Requestform.css';



const Requestform=()=> {


  
  const [stdname, setusername] = useState("");
  const [regNum, setregnum] = useState("");
  const [leaveType, setLeavetype]= useState("")
  const[visitingPlace, setVistingplace]= useState("");
  const [reason, setReason] = useState("");
  const [fromDate, setFromdate] = useState("");
  const [toDate, setTodate] = useState("");

  const getProfile = async () => {
    try {
      const res = await fetch("http://localhost:5000/dashboard", {
        method: "POST",
        headers: { token: localStorage.token, "Content-Type": "application/json" }
      });

      const parseData = await res.json();
      setusername(parseData.user_name);
      setregnum(parseData.regnum)
      
      
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getProfile();
  }, []);
  console.log(stdname,regNum,leaveType,visitingPlace,reason,fromDate,toDate );
  const onSubmitform=async  e=>{
    try {
      const body={stdname,regNum,leaveType,visitingPlace,reason,fromDate,toDate }
      const response = await fetch("http://localhost:5001/leaves", {
        method:"Post",
        headers:{"Content-Type":"application/json"},
        body: JSON.stringify(body)
      });
      console.log(response);
    } catch (err) {
      console.error(err.message)
      
    }
  
  };


  return (
    <Fragment>
    <div>
      <body>
      <div className="bodyofform">
        <form onSubmit={onSubmitform}>
      
          <div className="mb-3">

            
            <label for="input" placeholder="--Select--"  ><span className="name">Leave Type</span>  </label>
            <select id="input" className="form-control" value={leaveType} onChange={e => setLeavetype(e.target.value)}>
              <option value="od"></option>
              <option>OD</option>
              <option>ML</option>
            </select>
          </div>
          <div className="mb-3">
            <label for="text" className="form-label"><span className="name">Visiting place</span></label>
            <input type="text" className="form-control" value={visitingPlace} onChange={e => setVistingplace(e.target.value)}/>
          </div>
          <div className="mb-3">
            <label for="Reason" className="form-label"><span className="name">Reason</span></label>
            <textarea name="Reason" rows="4" cols="50" value={reason} onChange={e => setReason(e.target.value)}></textarea>
          </div>


          <div className="mb-3">
            <label for="date" className="form-label"><span className="name">From Date</span></label>
            <input type="date" className="form-control" value={fromDate} onChange={e => setFromdate(e.target.value)}/>
          </div>
          <div className="mb-3">
            <label for="Time" className="form-label"><span className="name">Time from</span></label>
            <input type="time" className="form-control" />

          </div>
          <div className="mb-3 d">
            <label for="date" className="form-label"><span className="name">To Date</span></label>
            <input type="date" className="form-control" value={toDate} onChange={e => setTodate(e.target.value)}/>

          </div>
          <div className="mb-3">
            <label for="timeto" className="form-label"><span className="name">Time to</span></label>
            <input type="time" className="form-control" />
          </div>
        
          <button type="submit" className="submit">Submit</button>
        </form>
        </div>
      </body>
    </div>
    </Fragment>
  )
}

export default Requestform;

