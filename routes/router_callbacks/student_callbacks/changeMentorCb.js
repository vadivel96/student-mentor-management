const { pgClient } = require("../../../config/database/dbConnection");
const { tableChecking } = require("../../../config/database/dbValidations/tableChecking")


async function changeMentorCallback(req,res,next){
    const tableExists=await tableChecking('students');
    const oldMentorId=req.params.oldMentorId;
    const newMentorId=req.params.newMentorId;
   

    if(tableExists){
        const updateStudent=await pgClient.query(`UPDATE students SET mentor_id='${newMentorId}' WHERE mentor_id='${oldMentorId}'  `);
        updateStudent.rowCount > 0
            ? res.status(200).send({ message:'successfully changed to new mentor ' })
            : res.status(404).send(`cannot update with the given Id...!!`); 
        }
    else{
        console.log('No table with name students exists ..!!!');
        res.status(404).send(`No table with name students exists ..!!!`);
    } 
    return
}

module.exports={changeMentorCallback}