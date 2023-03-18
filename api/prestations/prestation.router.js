const {createPrestation,getPrestationsTerminees,getPrestationsEnCours,updatePrestation,deletePrestation,endPrestation, getPrestationByTelephone,getPrice,getClientPrestationsTerminees,getClientPrestationsEnCours,getPrestatairePrestationsTerminees,getPrestatairePrestationsEnCours} = require('./prestation.controller')
const router = require("express").Router()

router.post('/',createPrestation)
router.get('/admin/encours',getPrestationsEnCours)
router.get('/prestationsTerminees',getClientPrestationsTerminees)
router.get('/prestationsEncours',getClientPrestationsEnCours)
router.get('/clients/prestationsTerminees/:id',getClientPrestationsTerminees)
router.get('/clients/prestationsEncours/:id',getClientPrestationsEnCours)

router.get('/prestataires/prestationsTerminees/:telephone',getPrestatairePrestationsTerminees)
router.get('/prestataires/prestationsEncours/:telephone',getPrestatairePrestationsEnCours)

router.get('/admin/',getPrestationsTerminees)
router.get('/:telephone',getPrestationByTelephone)
router.get('/price/:telephone',getPrice)
router.put('/',updatePrestation)
router.delete('/',deletePrestation)
router.put('/:id',endPrestation)

module.exports = router

