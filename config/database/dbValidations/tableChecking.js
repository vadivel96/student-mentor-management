const {pgClient}=require('../dbConnection')


 async function tableChecking(tableName){
    const tableCheckQuery = `
    SELECT EXISTS (
      SELECT 1 
      FROM information_schema.tables 
      WHERE table_schema = 'public' 
      AND table_name =$1
    );
  `;
  
  const tableCheckResult = await pgClient.query(tableCheckQuery,[tableName]);
  const tableExists = tableCheckResult.rows[0].exists;
  return tableExists
}

module.exports={tableChecking}