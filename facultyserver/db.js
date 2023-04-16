const Pool =require("pg").Pool

const pool = new Pool({
  user:"postgres",
  password:"saketh@21",
  host:"localhost",
  port:5432,
  database:"loginpage"
});

module.exports= pool;