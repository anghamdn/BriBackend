const {create,deleteR,getTotalPrixById,getAll,getSpecific, getById,getByTelTerminee,PrestationTerminee} = require('./realisation.service')


module.exports = {
    create : (req,res)=>{
        const body = req.body 
        create (body , (err,results)=>{
            if(err) throw err
            return res.json({
                success : 1,
                data : results
            })
        })
    },
    deleteR : (req,res)=>{
        const id = req.params.id
        deleteR (id , (err,results)=>{
            if(err) throw err
            return res.json({
                success : 1,
                data : results
            })
        })
    },
    getAll : (req,res)=>{
        getAll ((err,results)=>{
            if(err) throw err
            return res.json( results
            )
        })
    },
    getSpecific : (req,res)=>{
        getSpecific ((err,results)=>{
            if(err) throw err
            return res.json( results
            )
        })
    },
    getById : (req,res)=>{
        const telephone = req.params.telephone
        getById (telephone , (err,results)=>{
            if(err) throw err
            return res.json(results)
        })
    },
    getByTelTerminee : (req,res)=>{
        const telephone = req.params.telephone
        getByTelTerminee (telephone , (err,results)=>{
            if(err) throw err
            return res.json(results)
        })
    },
    PrestationTerminee : (req,res)=>{
        const id = req.params.id
        console.log(id);
        PrestationTerminee (id, (err,results)=>{
            if(err) throw err
            return res.json({
                success : 1,
                message : "update successfully",
                data : results
            })
        })
    },
    getTotalPrixById : (req,res)=>{
        const id = req.params.id
        getTotalPrixById (id , (err,results)=>{
            if(err) throw err
            return res.json({
                success : 1,
                data : results
            })
        })
    },

}