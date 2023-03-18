const pool = require('../../config/database')


module.exports = {
    create : (data , callBack)=> {
        pool.query("INSERT INTO `clients` (`id`, `nom`, `prenom`, `email`, `telephone`, `passe`, `etat`,`dateInscription`, `codeActivation`) VALUES (?,?,?,?,?,?,?,?,?)",
        [null,
        data.nom,
        data.prenom,
        data.email,
        data.telephone,
        data.passe,
        data.etat,
        data.dateInscription,
        data.codeActivation
    ],
    (err,results,fields)=>{
        if(err){
            return  callBack(err)
        }
        return callBack(null,results)
    })
    },
    /*create : (data , callBack)=> {
        console.log(data.telephone)
        pool.query("SELECT `telephone` FROM clients WHERE telephone = ?",
        [data.telephone],
        (err,results,fields)=>{
            console.log(results)
        if(!results){
            console.log("tel exist")
            return callBack(null,err)
        }else{
        console.log("tel never existed")
        pool.query("INSERT INTO `clients` (`id`, `nom`, `prenom`, `email`, `telephone`, `passe`, `etat`,`date inscription`, `codeActivation`) VALUES (?,?,?,?,?,?,?,?,?)",
            [null,
            data.nom,
            data.prenom,
            data.email,
            data.telephone,
            data.passe,
            data.etat,
            data.date,
            data.codeActivation
        ],)
        console.log("hello there")
        return callBack(null,results)}
       
    })
}
       ,*/
    confirmAccount : (data, callback)=>{
        pool.query("UPDATE `clients` SET `etat`= 'oui' WHERE email = ?",
        [
            data.email
        ],
        (err,results,fields)=>{
            if(err) callback(err)
            return callback(null, results)
        }
        )
    },
    getCodeByEmail : (email,callback)=>{
        pool.query('SELECT codeActivation FROM `clients` WHERE email = ?',
        [email],
        (err,results,fields)=>{
            if(err) callback(err)
            return callback(null,results[0])
        }
        )
    },
    resetPassword : (data, callback)=>{
        pool.query('UPDATE `clients` SET `passe`=? WHERE email = ?',
        [
            data.passe,
            data.email
        ],
        (err,results,fields)=>{
            if(err) callback(err)
            return callback(null, results[0])
        }
        )
    },
    getClients : callBack => {
        pool.query(
            'select * from clients',
            [],
            (err,results,fields) =>{
                if(err){
                    return callBack(err)
                }
                return callBack(null,results)
            }
        )
    },
    TelephoneExist : (telephone , callback)=>{
        pool.query('SELECT * FROM clients WHERE telephone = ?',
        [telephone],
        (err,results,fields)=>{
            if(err) callback(err)
            return callback(null,results)
        }
        )
    },
    emailExist : (email,callback)=>{
        pool.query('SELECT * FROM clients WHERE email = ?',
        [email],
        (err,results,fields)=>{
            if(err) callback(err)
            return callback(null,results)
        }
        )
    },
    getClientByTelephone:(telephone,callBack)=>{
        pool.query('SELECT * FROM `clients` WHERE telephone = ? ',
        [telephone],
        (err,results,fields)=>{
            if(err){
                callBack(err)
            }
            return callBack(null,results[0])
        })
    },
    updateClient : (data, callBack)=>{
        pool.query('UPDATE `clients` set nom = ?, prenom = ?, email=?, telephone=? WHERE id=?',
        [
            data.nom,
            data.prenom,
            data.email,
            data.telephone,
            data.id
        ],
        (err,results,fields)=>{
            if(err){
                return callBack(err)
            }
            return callBack(null,results[0])
        }
        )
    },
    deleteClient : (data,callBack)=>{
        pool.query('DELETE FROM clients WHERE id = ?',
        [data.id],
        (err,results,fields)=>{
            if(err){
                return callBack(err)
            }
            return callBack(null,results[0])
        }
        
        )
    },

}