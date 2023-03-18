const {create,getPrestataires,getPrestataireByTelephone,updatePrestataire,deletePrestataire,TelephoneExist,emailExist,resetPassword,confirmAccount,getCodeByEmail} = require('./prestataire.service')
const {sign}= require('jsonwebtoken')
const {genSaltSync,hashSync,compareSync} = require('bcrypt')

module.exports = {
    createPrestataire : (req,res)=>{
        const body = req.body
        const salt = genSaltSync(10)
        console.log(req.body)
        body.passe = hashSync(body.passe,salt)
        create(body,(err,results)=>{
            if(err){
                console.log(err)
                res.json({
                    success : 0,
                    message : "database con err"
                })
            }else{
                res.status(200).json({
                    success : 1,
                    data : results
                })
            }
        })
    },
    resetPassword : (req,res)=>{
        const body = req.body
        const salt = genSaltSync(10)
        console.log(req.body)
        body.passe = hashSync(body.passe,salt)
        resetPassword(body,(err,results)=>{
            if(err){
                console.log(err)
                res.json({
                    success : 0,
                    message : "database con err"
                })
            }else{
                res.status(200).json({
                    success : 1,
                    data : results
                })
            }
        })
    },
    getCodeByEmail : (req,res)=>{
        const email = req.params.email
        getCodeByEmail(email,(err,results)=>{
            
            if(err){
                console.log(err)
                res.json({
                    success : 0,
                    message : "database con err"
                })
            }else{
                
                res.json(results)
                
            }
        })
        
    },
    getPrestataireByTelephone : (req,res)=>{
        const telephone = req.params.telephone
        getPrestataireByTelephone(telephone,(err,results)=>{
            if(err)throw err
            return res.status(200).json(results)
        })
    },
    getPrestataires : (req,res)=>{
        getPrestataires((err,results)=>{
            if(err) return 
            return res.status(200).json(results)
        })
    },
    login : (req,res)=>{
        const body = req.body 
        console.log(body)
        getPrestataireByTelephone (body.telephone,(err,results)=>{
            
            if(err){console.log(err)} 
            else if (!results) {
                return res.status(401).json("Aucune utilisateur trouvé");
            }const result = compareSync(body.passe, results.passe);
            if(!result){
                res.status(401).json("Mot de passe incorrecte")
            }
            else if (result) {
                results.passe = undefined;
                const jsontoken = sign({ result: results }, "qwe1234", {
                  expiresIn: 86400
                });
                return res.json({
                  success: 1,
                  message: "login successfully",
                  token: jsontoken
                });
              } else {
                return res.status(401).json("Numéro telephone incorrect");
              }
        })
    },
    updatePrestataire : (req,res)=>{
        const body = req.body
        console.log(body)
        updatePrestataire(body,(err,results)=>{
            if(err){
                console.log(err)
                return
            }
            return res.json("update successfully")
           
        })
    },
    confirmAccount : (req,res)=>{
        const body = req.body
        console.log(body)
        confirmAccount(body,(err,results)=>{
            if(err){
                console.log(err)
                return
            }
            return res.json("update successfully")
           
        })
    },
    TelephoneExist : (req,res)=>{
        const telephone = req.params.telephone
        TelephoneExist(telephone,(err,results)=>{
            if(err)console.log(err)
            if(results.length> 0){
                res.json("exist")
            }else{
                res.json("not exist")
            }
        })
    },
    emailExist : (req,res)=>{
        const email = req.params.email
        emailExist(email,(err,results)=>{
            if(err)console.log(err)
            if(results.length> 0){
                res.json("exist")
            }else{
                res.json("not exist")
            }
            
        })
    },
    deletePrestataire : (req,res)=>{
        const body = req.body
        deletePrestataire (body, (err,results)=>{
            if(err){ console.log(err)  }
            return res.json({
                success : 1,
                message : "delete successfully"
            })
        })
    }
}