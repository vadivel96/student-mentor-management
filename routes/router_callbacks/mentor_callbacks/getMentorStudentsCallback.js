const { pgClient } = require("../../../config/database/dbConnection");
const { tableChecking } = require("../../../config/database/dbValidations/tableChecking")


async function getMentorStudentsCallback(req,res,next){
    const tableExists=await tableChecking('mentors');
    const mentorId=req.params.mentorId;
    if(tableExists){
        const result = await pgClient.query(`SELECT * FROM students WHERE mentor_id='${mentorId}'   `);
      result.rowCount > 0
        ? res.status(200).send({ data: result.rows })
        : res.status(404).send(`No students assigned for this mentor ..!!`); 
    }
    else{
        console.log('No table with name mentors exists ..!!!');
        res.status(404).send(`No table with name mentors exists ..!!!`)
    }
    return
}

module.exports={getMentorStudentsCallback}