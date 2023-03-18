const {create,getClientById,getClients,updateClient,deleteClient,getClientByTelephone,TelephoneExist,emailExist,confirmAccount,getCodeByEmail,resetPassword} = require("./client.service")
const {genSaltSync,hashSync,compareSync} = require('bcrypt')
const {sign} = require('jsonwebtoken')

module.exports = {
    createClient : (req,res) =>{
        const body = req.body
        const salt = genSaltSync(10)
        console.log(req.body)
        body.passe = hashSync(body.passe,salt)
        create(body,(err,results)=>{
            console.log(err)
            if (err) {
                return res.status(500).json("telephone exist deja")
            }else{ 
                return res.status(200).json({
                success : 1,
                data : results
            })}
           
        })
    },
    getClientByTelephone : (req,res)=>{
        const telephone = req.params.telephone
        getClientByTelephone(telephone,(err,results)=>{
            if(err) {
                console.log(err)
                return res.status(500).json({
                    success : 0,
                    message : "Database conn error"
                })
            }
            return res.status(200).json(results)
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
                res.json({
                    success : 1,
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
    login: (req, res) => {
        const body = req.body;
        getClientByTelephone(body.telephone, (err, results) => {
          
          if (err) {
            console.log(err);
          }
          else if (!results) {
            return res.status(401).json("Aucune utilisateur trouvé");
          }
          const result = compareSync(body.passe, results.passe);
          if(!result){
            res.status(401).json("Mot de passe incorrecte")
          }
          else if (result) {
            results.passe = undefined;
            const jsontoken = sign({ result: results }, "qwe1234", {
              expiresIn: "1h"
            });
            return res.json({
              success: 1,
              message: "login successfully",
              token: jsontoken
            });
          } else {
            return res.status(401).json("Numéro telephone incorrect");
        }
        });
      },
    getClients : (req,res)=>{
        getClients((err,results)=>{
            if(err){
                console.log(err)
                return 
            }
            return res.status(200).json(results)
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
    updateClient : (req,res)=>{
        const body = req.body
        console.log(body)
        updateClient(body, (err,results)=>{
            if(err){
                console.log(err)
                return
            }
            return res.json({
                success : 1,
                message : "update successfully",
            })
        })
        
    },
    deleteClient : (req,res)=>{
        const data = req.body
        deleteClient(data,(err,results)=>{
            if(err){
                console.log(err)
                return
            }
            
            return res.json({
                success : 1,
                message : "delete successfully"
            })
        })
    }
}


