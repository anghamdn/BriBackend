const router = require("express").Router()
const {createPrestataire,getPrestataires,getPrestataireByTelephone,updatePrestataire,deletePrestataire,login,TelephoneExist,emailExist,resetPassword,getCodeByEmail,confirmAccount} = require('./prestataire.controller')
const {checkToken} = require("../../auth/token_validation")

router.get('/',getPrestataires)
router.get('/admin',getPrestataires)

router.get('/:telephone',getPrestataireByTelephone)
router.get('/code/:email',getCodeByEmail)
router.post('/',createPrestataire)
router.put('/confirmAccount',confirmAccount)
router.get('/telephone/:telephone',TelephoneExist)
router.get('/email/:email',emailExist)
router.patch('/update',checkToken,updatePrestataire)
router.patch('/resetPassword',resetPassword)
router.delete('/',checkToken,deletePrestataire)
router.post('/login',login)

module.exports = router