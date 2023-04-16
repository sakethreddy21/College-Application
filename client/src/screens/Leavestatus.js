import React ,{useState, useEffect} from 'react'

import './leavestatus.css'

export default function LeaveStatus() {
  const [leaves, setLeaves] = useState([]);
  const [name, setName] = useState("");
  const [regnum, setRegnum] = useState("");
  //delete the leaves funtion

  async function deleteleave(id){
    try {
      const res= await fetch(`http://localhost:5001/leaves/${id}`,{
        method:"DELETE"
      });

      setLeaves(leaves.filter(data=>data.leave_id!==id));
    } catch (err) {
      console.err(err.message);
    }
  }
  
  const getProfile = async () => {
    try {
      const res = await fetch("http://localhost:5000/dashboard", {
        method: "POST",
        headers: { token: localStorage.token }
      });

      const parseData = await res.json();
      setName(parseData.user_name);
      setRegnum(parseData.regnum)
    } catch (err) {
      console.error(err.message);
    }
  };
  







  useEffect(() => {
    const getLeave = async () => {
      try {
        const res = await fetch(`http://localhost:5001/leave/${regnum}`);
        const leavearray = await res.json();
        console.log(leavearray);
        setLeaves(leavearray);
      } catch (err) {
        console.error(err.message);
      }
    };
    getLeave();
    getProfile();
  }, [regnum])
  

  return (
    <div>
    

      <body>
      
      <header>

      

      <div className="tabl table-responsive">

          <div className="row">

           
            <div className="col search">
              <input type="search " placeholder="  Search..."/>
              <span><i className="fa-solid fa-magnifying-glass"> </i></span>
            </div>

          </div>

          <table className="table table-striped table-hover">
            <thead className="table-info table align-middle">
              <tr>
                
                <th scope="col">leave_id</th>
                <th scope="col">Place of visit</th>
                <th scope="col">Reason</th>
                <th scope="col">Leave Type</th>
                <th scope="col">From</th>
                <th scope="col">To</th>
                <th scope="col">Status</th>
                <th scope="col">Remarks</th>
                <th scope="col">Edit</th>
                <th scope="col">Delete</th>
             
              </tr>
            </thead>
            <tbody>
            {
          leaves.map(data => (
            <tr key={data.leave_id}>
              <td>{data.leave_id}</td>
              <td>{data.visitingplace}</td>
              <td>{data.reason}</td>
              <td>{data.leavetype}</td>
              <td>{data.fromdate}</td>
              <td>{data.todate}</td>
              <td>{data.status}</td>
              <td>{}</td>
              
              <td>Edit</td>
              <td><button type='button' className="btn btn-danger" onClick={()=>deleteleave(data.leave_id)}>Delete</button></td>


            </tr>
          ))
        }
              
            </tbody>
          </table>
        </div>
        </header>
        </body>
    </div>
  )
}
