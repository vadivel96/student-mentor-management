const { pgClient } = require("../../../config/database/dbConnection");
const { tableChecking } = require("../../../config/database/dbValidations/tableChecking")


async function getStudentCallback(req,res,next){
    const tableExists=await tableChecking('students');
    const studentId=req.params.studentId;
    if(tableExists){
        const result = await pgClient.query(`SELECT * FROM students WHERE id='${studentId}'  `);
      result.rowCount > 0
        ? res.status(200).send({ data: result.rows })
        : res.status(404).send(`No Records for students present..!!`); 
    }
    else{
        console.log('No table with name students exists ..!!!');
        res.status(404).send(`No table with name students exists ..!!!`)
    }
    return
}
module.exports={getStudentCallback}