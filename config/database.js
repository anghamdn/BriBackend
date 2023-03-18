const {createPool} = require('mysql')


const pool = createPool({
    host            : process.env.DB_HOST,
    user            : process.env.DB_USER,
    password        : process.env.DB_PASSWORD,
    database        : process.env.DB_NAME,
    port            : process.env.DB_PORT,
    connectionLimit : 100,
    multipleStatements : true
})

pool.getConnection((err,conn)=>{
    if(err) console.log(err)
    console.log("connected successfully")
})

module.exports = pool