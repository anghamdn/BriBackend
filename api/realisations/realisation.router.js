const {create,getById,getTotalPrixById,deleteR,getAll,getSpecific,getByTelTerminee,PrestationTerminee} = require('./realisation.controller')
const router = require('express').Router()


router.post('/',create)
router.get('/all',getAll)
router.get('/',getSpecific)
//router.get('/:telephone',getById)
//router.put('/terminee/:id',PrestationTerminee)
router.get('/terminee/:telephone',getByTelTerminee)
router.get('/:id',getTotalPrixById)
router.delete('/',deleteR)

module.exports = router