const {createClient,getClients,updateClient,deleteClient,login, getClientByTelephone,TelephoneExist,getCodeByEmail,resetPassword,emailExist,confirmAccount} = require('./client.controller')
const router = require("express").Router()
const {checkToken} = require("../../auth/token_validation")


router.post('/',createClient)
router.get('/:telephone',checkToken,getClientByTelephone)
router.get('/telephone/:telephone',TelephoneExist)
router.get('/',getClients)
router.put('/',checkToken,updateClient)
router.delete('/',checkToken,deleteClient)
router.put('/confirmAccount',confirmAccount)
router.get('/email/:email',emailExist)
router.get('/code/:email',getCodeByEmail)
router.get('/telephone/:telephone',TelephoneExist)
router.put('/resetPassword',resetPassword)
router.post('/login',login)





module.exports = router