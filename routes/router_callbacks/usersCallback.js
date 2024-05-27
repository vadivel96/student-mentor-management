const {
  tableChecking,
} = require("../../config/database/dbValidations/tableChecking");
const { pgClient } = require("../../config/database/dbConnection");


async function usersCallBack(req, res, next) {
  try {
    const tableExists = await tableChecking("students");
    if (tableExists) {
      // If the table exists, query its records
      const result = await pgClient.query(`SELECT * FROM students`);
      result.rowCount > 0
        ? res.status(200).send({ data: result.rows })
        : res.status(404).send(`No Records for students present..!!`);
    } else {
          res.status(404).send(`table not found in the name  students`);
    }
  } catch (err) {
    console.error("Error checking table or querying records:", err);
  }
  return;
}
module.exports = { usersCallBack };
