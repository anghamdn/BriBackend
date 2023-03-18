const pool = require('../../config/database')


module.exports = {
    createPrestation : (data,callback)=>{
        pool.query('INSERT INTO `prestation`(`id`, `idClient`, `categorie`, `service`, `dateRealisation`, `prix`, `estimation`, `etat`, `telephoneClient`, `jobbers`, `adresseClient`, `communClient`, `dechets`, `tondeuse`, `camion`) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)',
        [
            null,
            data.idClient,
            data.categorie,
            data.service,
            data.dateRealisation,
            data.prix,
            data.estimation,
            data.etat,
            data.telephoneClient,
            data.jobbers,
            data.adresseClient,
            data.communClient,
            data.dechets,
            data.tondeuse,
            data.camion
        ],
        (err,results,fields)=>{
            if(err) callback(err)
            return callback(null,results)
        }
        )
    },
    getPrestationTerminees : callback =>{
        pool.query("SELECT concat(p.nom,' ',p.prenom) as prestataire, p.service,prix,pr.adresseClient as adresse,pr.dateRealisation as date, pr.telephoneClient as telephone FROM `prestation` as pr, `realisation` as r, `prestataires` as p where r.idPrestation = pr.id and r.idPrestataire= p.id and pr.etat ='Terminee'",
        [],
        (err,results,fields)=>{
            if(err) callback(err)
            return callback(null,results)
        }
        )
    },
    getPrestationEnCours : callback =>{
        pool.query("SELECT concat(p.nom,' ',p.prenom) as prestataire, p.service,prix,pr.adresseClient as adresse,pr.dateRealisation as date, pr.telephoneClient as telephone  FROM `prestation` as pr, `realisation` as r, `prestataires` as p where r.idPrestation = pr.id and r.idPrestataire= p.id and pr.etat ='En cours'",
        [],
        (err,results,fields)=>{
            if(err) callback(err)
            return callback(null,results)
        }
        )
    },
    getClientPrestationsTerminees : (id,callback) =>{
        pool.query("SELECT pr.dateRealisation, pr.etat,pr.prix,pr.service,pr.categorie FROM `prestation` as pr, `realisation` as r, `prestataires` as p where r.idPrestation = pr.id and r.idPrestataire= p.id and pr.etat ='Terminee' and pr.idClient = ?",
        [id],
        (err,results,fields)=>{
            if(err) callback(err)
            return callback(null,results)
        }
        )
    },
    getClientPrestationsEnCours : (id,callback) =>{
        pool.query("SELECT pr.dateRealisation, pr.etat,pr.estimation,pr.service,pr.categorie FROM `prestation` as pr where pr.etat ='En cours' and pr.idClient = ?",
        [id],
        (err,results,fields)=>{
            if(err) callback(err)
            return callback(null,results)
        }
        )
    },
    getPrestatairePrestationsTerminees : (telephone,callback) =>{
        pool.query("SELECT p.id ,p.etat, p.service, p.categorie,p.telephoneClient,p.dateRealisation,p.prix FROM `realisation` as r,`prestation` as p, `prestataires` as pr WHERE p.id =r.idPrestation and r.idPrestataire = pr.id and p.etat = 'Terminée' and pr.telephone = ?",
        [telephone],
        (err,results,fields)=>{
            if(err) callback(err)
            return callback(null,results)
        }
        )
    },
    getPrestatairePrestationsEnCours : (telephone,callback) =>{
        pool.query("SELECT p.id, concat(p.adresseClient,' ',p.communClient) as adresse,p.service,p.categorie,p.telephoneClient,p.prix FROM `realisation` as r,`prestation` as p, `prestataires` as pr WHERE p.id =r.idPrestation and p.etat = 'En cours' and r.idPrestataire = pr.id and pr.telephone = ?",
        [telephone],
        (err,results,fields)=>{
            if(err) callback(err)
            return callback(null,results)
        }
        )
    },
    getPrestationByTelephone : (telephone,callback) =>{
        pool.query("SELECT p.id, concat(c.nom,' ',c.prenom) as clientName, `categorie`, `service`, `dateRealisation`, `prix`, p.etat, `telephoneClient`, `jobbers`,concat(p.adresseClient,' ',p.communClient) as clientAdress, `dechets`, `tondeuse`, `camion` FROM `prestation` as p , `clients` as c WHERE p.idClient = c.id and p.telephoneClient = ?",
        [telephone],
        (err,results,fields)=>{
            if(err) callback(err)
            return callback(null,results)
        }
        )
    },
    updatePrestation : (data,callback)=>{
        pool.query('UPDATE `prestation` SET `idClient`=?,`categorie`=?,`service`=?,`dateRealisation`=?,`prix`=?,`etat`=?,`telephoneClient`=?,`jobbers`=?,`adresseClient`=?,`communClient`=? WHERE id= ?',
        [
            data.idClient,
            data.categorie,
            data.service,
            data.dateRealisation,
            data.prix,
            data.etat,
            data.telephoneClient,
            data.jobbers,
            data.adresseClient,
            data.communClient,
            data.id
        ],
        (err,results,fields)=>{
            if(err) callback(err)
            return callback(null,results[0])
        }
        )
    },
    deletePrestation :(data,callback)=>{
        pool.query('DELETE FROM `prestation` WHERE id = ?',
        [data.id],
        (err,results,fields)=>{
            if(err) callback(err)
            return callback(null,results[0])
        }
        )
    },
    endPrestation : (data, callback)=>{
        pool.query('UPDATE `prestation` SET `etat`=Terminée and `prix`=? WHERE id = ?',
        [
            data.prix,
            data.id
        ],
        (err,results,fields)=>{
            if(err) callback(err)
            return callback(null,results[0])
        }
        )
    },
    
    getTotalPrixById:(telephone,callBack)=>{
        pool.query("SELECT SUM(p.prix) as prix FROM `realisation` as r,`prestation` as p, prestataires as pr WHERE p.id =r.idPrestation and p.etat = 'Terminée' and r.idPrestataire = pr.id and pr.telephone = ?",
        [telephone],
        (err,results,fields)=>{
            if(err){
                callBack(err)
            }
            return callBack(null,results[0])
        })
    },
}