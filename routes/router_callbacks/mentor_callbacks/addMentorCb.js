const { pgClient } = require("../../../config/database/dbConnection");
const {
  tableChecking,
} = require("../../../config/database/dbValidations/tableChecking");

async function addMentorCallback(req, res, next) {
  const mentorDetails = req.body.mentor
     
  const mentorAlreadyExists = await pgClient.query(
    `SELECT * FROM mentors WHERE mentors.email='${mentorDetails.email}' `
  );
  const tableExists = await tableChecking("mentors");

  if (tableExists === false) {
    console.log(`No Records for mentors present..!!`)
    res.status(404).send(`No Records for mentors present..!!`);
    return
  }
  if (mentorAlreadyExists.rowCount > 0) {
    console.log(`mentor with this email already registered..!!`)
    res.status(400).send(`mentor with this email already registered..!!`);
    return
  }
 
  const queryResult = await pgClient.query(
    `INSERT INTO mentors (first_name,last_name,email) VALUES ($1,$2,$3)`,
    [
      mentorDetails.firstName,
      mentorDetails.lastName,
      mentorDetails.email,
     
    ]
  );
  console.log(`queryResult----------->`,queryResult);
  if (queryResult) {
   console.log(queryResult)
  }
  
  res.status(201).send(`successfully created mentor details..!!`)
  return;
}

module.exports = addMentorCallback;
