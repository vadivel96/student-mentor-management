const { pgClient } = require("../../../config/database/dbConnection");
const {
  tableChecking,
} = require("../../../config/database/dbValidations/tableChecking");

async function addStudentCallback(req, res, next) {
  const studentDetails = req.body.student;
     
  const studentAlreadyExists = await pgClient.query(
    `SELECT * FROM students WHERE students.email='${studentDetails.email}' `
  );
  const tableExists = await tableChecking("students");

  if (tableExists === false) {
    console.log(`No Records for students present..!!`)
    res.status(404).send(`No Records for students present..!!`);
    return;
  }
  if (studentAlreadyExists.rowCount > 0) {
    console.log(`Student with this email already registered..!!`)
    res.status(400).send(`Student with this email already registered..!!`);
    return;
  }
 
  
  const studentHavingMentor = await pgClient.query(
    `SELECT * FROM mentors WHERE mentors.email='${studentDetails.mentorEmail}' `
  );
  console.log(`student having mentor--------------> ${studentHavingMentor}`);
  const queryResult = await pgClient.query(
    `INSERT INTO students (first_name,last_name,email,mentor_id) VALUES ($1,$2,$3,$4)`,
    [
      studentDetails.firstName,
      studentDetails.lastName,
      studentDetails.email,
      studentHavingMentor.rowCount>0?studentHavingMentor.rows[0].id:null,
    ]
  );
  console.log(`queryResult----------->`,queryResult);
  if (queryResult) {
   console.log(queryResult);
  }
  
  res.status(201).send(`successfully created student details..!!`)
  return;
}

module.exports = addStudentCallback;
