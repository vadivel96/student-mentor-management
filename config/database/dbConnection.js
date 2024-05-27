const dotenv=require('dotenv').config();
const pg=require('pg');
const {Client}=pg;

const pgClient=new Client({
    user:process.env.DB_USER,
    password:process.env.DB_PASSWORD,
    host:process.env.DB_HOST,
    port:process.env.DB_PORT,
    database:process.env.DB_NAME
})

pgClient
  .connect()
  .then(() => {
    console.log("Connected to PostgreSQL database");
    // Perform database operations here
    pgClient.query("SELECT NOW()", (err, res) => {
      if (err) {
        console.error("Error executing query:", err);
      } else {
        console.log("Result:", res.rows[0]);
      }
    });
  })
  .catch((err) => {
    console.error("Error connecting to PostgreSQL database:", err);
  });

  module.exports = { pgClient };