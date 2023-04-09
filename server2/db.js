const Pool = require("pg").Pool;

const pool= new Pool({
  user: "postgres",
  password:"saketh@21",
  host: "localhost",
  database:"authleave",
  port: 5432
});

module.exports= pool;