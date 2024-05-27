const { pgClient } = require("../../../config/database/dbConnection");
const { tableChecking } = require("../../../config/database/dbValidations/tableChecking")


async function allMentorsCallback(req,res,next){
    const tableExists=await tableChecking('mentors');
    if(tableExists){
        const result = await pgClient.query(`SELECT * FROM mentors`);
      result.rowCount > 0
        ? res.status(200).send({ data: result.rows })
        : res.status(404).send(`No Records for mentors present..!!`); 
    }
    else{
        console.log('No table with name mentors exists ..!!!');
        res.status(404).send(`No table with name mentors exists ..!!!`)
    }
    return
}
module.exports={allMentorsCallback}