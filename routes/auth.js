const router = require("express").Router()
const mysql = require('mysql')


const pool = mysql.createPool({
    host            : process.env.DB_HOST,
    user            : process.env.DB_USER,
    password        : process.env.DB_PASSWORD,
    database        : process.env.DB_NAME,
    port            : 3000
})


router.get("/allauth",(req,res)=>{
    res.send("hey ")
})
//register
router.post('/registre',(requete,response)=>{
   // response.send("hey post methode")



    pool.getConnection((err,connection)=> {
        console.log("all work1")
        if(err) throw err
        console.log(`conneted as id ${connection.threadId}`)
        const params = requete.body
        console.log("all work2")
        var sql = "INSERT INTO `clients` (`id`, `nom`, `prenom`, `nomUtilisateur`, `telephone`, `passe`, `etat`) VALUES (?,?,?,?,?,?,?)"
        console.log("all work3")
        /*connection.query(sql, [null,params.nom,params.prenom,params.nomUtilisateur,params.telephone,params.passe,params.etat],(err,rows)=>{
            connection.release()
            if(!err){
                response.send(`client ${params.nom} ajoutée avec succes`,{rows})
            }else{
                console.log(err)
            }
        })*/
        console.log("all work4")
    })

})

module.exports = router