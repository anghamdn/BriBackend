const pool = require('../../config/database')


module.exports = {
    create : (data, callback)=>{
        pool.query('INSERT INTO `realisation`(`id`, `idPrestation`, `idPrestataire`, `prixPrestataire`, `supprimer`) VALUES (?,?,?,?,?)',
        [
            null,
            data.idPrestation,
            data.idPrestataire,
            data.prixPrestataire,
            data.supprimer
        ],
        (err,results,fields)=>{
            if(err) callback(err)
            return callback(null,results)
        }
        )
    },
    deleteR : (id, callback)=>{
        pool.query('UPDATE `realisation` SET `supprimer` = 1 WHERE id = ?',
        [id],
        (err,results,fields)=>{
            if(err) callback(err)
            return callback(null,results)
        }
        )
    },
    getAll : callback => {
        pool.query("SELECT pr.categorie,pr.service,concat(c.nom,' ',c.prenom) as client,concat(p.nom,' ',p.prenom) as prestataire, concat(pr.adresseClient,pr.communClient) adresse,pr.prix FROM `realisation` as r,`prestataires` as p,`clients` as c,`prestation` as pr WHERE idPrestation = p.id AND idPrestation = pr.id AND pr.idClient = c.id",
        [],
        (err,results,fields)=>{
            if(err) callback(err)
            return callback(null,results)
        }
        )
    },
    getSpecific : callback => {
        pool.query("SELECT pr.categorie,pr.service,concat(c.nom,' ',c.prenom) as client,concat(p.nom,' ',p.prenom) as prestataire, concat(pr.adresseClient,pr.communClient) adresse,pr.prix FROM `realisation` as r,`prestataires` as p,`clients` as c,`prestation` as pr WHERE idPrestation = p.id AND idPrestation = pr.id AND pr.idClient = c.id and r.supprimer = 0",
        [],
        (err,results,fields)=>{
            if(err) callback(err)
            return callback(null,results)
        }
        )
    },
    // pretataire prestations en cours
    getById : (telephone,callback)=>{
        pool.query("SELECT p.id, concat(p.adresseClient,' ',p.communClient) as adresse,p.service,p.categorie,p.telephoneClient,p.prix FROM `realisation` as r,`prestation` as p, `prestataires` as pr WHERE p.id =r.idPrestation and p.etat = 'En cours' and r.idPrestataire = pr.id and pr.telephone = ?",
        [telephone],
        (err,results,fields)=>{
            if(err) callback(err)
            return callback(null,results)
        }
        )
    },
    // prestataire presttions terminees
    getByTelTerminee : (telephone,callback)=>{
        pool.query("SELECT p.id ,p.etat, p.service, p.categorie,p.telephoneClient,p.dateRealisation,p.prix FROM `realisation` as r,`prestation` as p, `prestataires` as pr WHERE p.id =r.idPrestation and r.idPrestataire = pr.id and p.etat = 'Terminée' and pr.telephone = ?",
        [telephone],
        (err,results,fields)=>{
            if(err) callback(err)
            return callback(null,results)
        }
        )
    },
    PrestationTerminee : (id,callback)=>{
        pool.query("UPDATE `prestation` SET `etat`='Terminée' WHERE id = ?",
        [id],
        (err,results,fields)=>{
            if(err) callback(err)
            return callback(null,results[0])
        }
        )
    },
    getTotalPrixById : (id,callback)=>{
        pool.query('SELECT SUM(prixPrestataire) FROM `realisation` WHERE id =?',
        [id],
        (err,results,fields)=>{
            if(err) callback(err)
            return callback(null,results)
        }
        )
    }
}