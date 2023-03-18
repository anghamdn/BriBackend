require('dotenv').config()
const express = require('express')
var cors = require("cors")
const app = express()
const PORT = process.env.PORT || 3000
const clientRouter = require('./api/clients/client.router')
const prestataireRouter = require('./api/prestataires/prestataire.router')
const prestationRouter = require('./api/prestations/prestation.router')
const realisationRouter = require('./api/realisations/realisation.router')
const resetPassword = require('./utils/email.router')


app.use(express.json())
app.use(cors())
app.use('/api/clients',clientRouter)
app.use('/api/prestataires',prestataireRouter)
app.use('/api/prestations',prestationRouter)
app.use('/api/realisations',realisationRouter)
app.use('/api/auth',resetPassword)












app.listen(PORT, ()=>{
    console.log('Server up and running on PORT : ' +PORT)
})
