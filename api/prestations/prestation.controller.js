
const {createPrestation,getPrestationByTelephone,updatePrestation,deletePrestation,endPrestation,getTotalPrixById,getPrestationTerminees,getPrestationEnCours,getClientPrestationsEnCours,getClientPrestationsTerminees,getPrestatairePrestationsTerminees,getPrestatairePrestationsEnCours} = require('./prestation.service')



module.exports = {
    createPrestation :(req,res)=>{
        const body = req.body
        console.log(body)
        createPrestation(body,(err,results)=>{
            if(err){
                res.json({
                    success : 0,
                    message : "database con err"
                })
            }else{
                res.json({
                    success : 1,
                    data : results
                })
            }
        })
    },
    getPrestationsTerminees : (req,res)=>{
        getPrestationTerminees((err,results)=>{
            if(err) throw err
            res.status(200).json(results)
        })
    },
    getPrestationsEnCours : (req,res)=>{
        getPrestationEnCours((err,results)=>{
            if(err) throw err
            res.status(200).json(results)
        })
    },
    getClientPrestationsTerminees : (req,res)=>{
        const id = req.params.id;
        getClientPrestationsTerminees(id,(err,results)=>{
            if(err) throw err
            res.json(results)
        })
    },
    getClientPrestationsEnCours : (req,res)=>{
        const id = req.params.id;
        getClientPrestationsEnCours(id,(err,results)=>{
            if(err) throw err
            res.json(results)
        })
    },
    getPrestatairePrestationsTerminees : (req,res)=>{
        const telephone = req.params.telephone;
        getPrestatairePrestationsTerminees(telephone,(err,results)=>{
            if(err) throw err
            res.json(results)
        })
    },
    getPrestatairePrestationsEnCours : (req,res)=>{
        const telephone = req.params.telephone;
        getPrestatairePrestationsEnCours(telephone,(err,results)=>{
            if(err) throw err
            res.json(results)
        })
    },
    getPrestationByTelephone : (req,res)=>{
        const telephone = req.params.telephone
        console.log(telephone)
        getPrestationByTelephone(telephone,(err,results)=>{
            if(err)throw err
             res.json(results)
        })
    },
    getPrice : (req,res)=>{
        const telephone = req.params.telephone
        getTotalPrixById(telephone,(err,results)=>{
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
    updatePrestation: (req,res)=>{
        const body = req.body 
        updatePrestation(body,(err,results)=>{
            if(err) throw err
            return res.json({
                success : 1,
                message : "update successfully",
                data : results
            })
        })
    },
    deletePrestation : (req,res)=>{
        const body = req.body
        deletePrestation(body,(err,results)=>{
            if(err) throw err
            return res.json({
                success : 1,
                message : "delete successfully"
            })
        })
    },
    endPrestation : (req,res)=>{
        const body = req.body
        endPrestation(body,(err,results)=>{
            if(err)throw err
            return res.json({
                success : 1,
                data : results
            })
        })
    }
}

