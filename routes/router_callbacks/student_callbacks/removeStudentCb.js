const { pgClient } = require("../../../config/database/dbConnection");
const { tableChecking } = require("../../../config/database/dbValidations/tableChecking")


async function removeStudentCallback(req,res,next){
    const tableExists=await tableChecking('students');
    const studentId=req.params.studentId;
    if(tableExists){
        const result = await pgClient.query(`UPDATE students SET  is_deleted=true WHERE id='${studentId}'  `);
      result.rowCount > 0
        ? res.status(200).send(`deleted successfully`)
        : res.status(404).send(`No Records for students present to delete..!!`); 
    }
    else{
        console.log('No table with name students exists ..!!!');
        res.status(404).send(`No table with name students exists ..!!!`)
    }
    return
}
module.exports={removeStudentCallback}