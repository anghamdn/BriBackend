const {resetPassword,confirmationEmail} = require('../utils/email.controller')
const router = require('express').Router()


router.post('/resetPassword',resetPassword)
router.post('/confirmAccount',confirmationEmail)

module.exports = router