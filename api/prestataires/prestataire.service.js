const pool = require("../../config/database")


module.exports = {
    create : (data , callback)=>{
        
        pool.query('INSERT INTO `prestataires`(`id`, `nom`, `prenom`, `telephone`, `email`, `commune`, `service`, `passe`, `etat`, `dateInscription`, `codeActivation`)  VALUES (?,?,?,?,?,?,?,?,?,?,?)',
        [
            null,
            data.nom,
            data.prenom,
            data.telephone,
            data.email,
            data.commune,
            data.service,
            data.passe,
            data.etat,
            data.date,
            data.codeActivation
        ],
        (err,results,fields)=>{
            if(err) callback(err)
            return callback(null,results)
        }
        )
    },
    getPrestataires : callback =>{
        pool.query('SELECT * FROM `prestataires`',
        [],
        (err,results,fields)=>{
            if(err)callback(err)
            return callback(null,results)
        }
        )
    },
    resetPassword : (data, callback)=>{
        pool.query('UPDATE `prestataires` SET `passe`=? WHERE email = ?',
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
    confirmAccount : (data, callback)=>{
        pool.query("UPDATE `prestataires` SET `etat`= 'oui' WHERE email = ?",
        [
            data.email
        ],
        (err,results,fields)=>{
            if(err) callback(err)
            return callback(null, results)
        }
        )
    },
    getPrestataireByTelephone : (telephone,callback)=>{
        pool.query('SELECT * FROM `prestataires` WHERE telephone = ?',
        [telephone],
        (err,results,fields)=>{
            if(err) callback(err)
            return callback(null,results[0])
        }
        )
    },
    getCodeByEmail : (email,callback)=>{
        pool.query('SELECT codeActivation FROM `prestataires` WHERE email = ?',
        [email],
        (err,results,fields)=>{
            if(err) callback(err)
            return callback(null,results[0])
        }
        )
    },
    updatePrestataire : (data,callback)=>{
        pool.query('UPDATE `prestataires` SET `nom`=?,`prenom`=?,`telephone`=?,`email`=?,`commune`=?,`service`=? WHERE id = ?',
        [
            data.nom,
            data.prenom,
            data.telephone,
            data.email,
            data.commune,
            data.passe,
            data.service,
            data.id
        ],
        (err,results,fields)=>{
            if(err) callback(err)
            return callback(err,results[0])
        }
        )
    },
    TelephoneExist : (telephone , callback)=>{
        pool.query('SELECT * FROM `prestataires` WHERE telephone = ?',
        [telephone],
        (err,results,fields)=>{
            if(err) callback(err)
            return callback(null,results)
        }
        )
    },
    emailExist : (email , callback)=>{
        pool.query('SELECT * FROM `prestataires` WHERE email = ?',
        [email],
        (err,results,fields)=>{
            if(err) callback(err)
            return callback(null,results)
        }
        )
    },
    deletePrestataire : (data,callback)=>{
        pool.query('DELETE FROM `prestataires` WHERE id = ?',
        [data.id],
        (err,results,fields)=>{
            if(err) callback(err)
            return callback(err,results[0])
        }
        )
    }
}