const { pgClient } = require("../../../config/database/dbConnection");
const { tableChecking } = require("../../../config/database/dbValidations/tableChecking");


async function assignMentorToStudentCallback(req,res,next){
 
    const tableExists=await tableChecking('students');
    const studentId=req.params.studentId;
    if(tableExists){
        const mentorQuery=await pgClient.query(`SELECT * FROM mentors WHERE mentors.email='${req.body.mentorEmail}' `);
        const mentorId=mentorQuery.rows[0].id;
        const updateStudent=await pgClient.query(`UPDATE students SET mentor_id='${mentorId}' WHERE id='${studentId}' `);

        updateStudent.rowCount > 0
            ? res.status(200).send({ message:'successfully student is assigned with mentor' })
            : res.status(404).send(`cannot find the student with the student id...!!`); 
        return
        }
    else{
        console.log('No table with name students exists ..!!!');
        res.status(404).send(`No table with name students exists ..!!!`)
        return
    }
}
module.exports={assignMentorToStudentCallback}