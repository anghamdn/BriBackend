const { text } = require('body-parser')
const nodemailer = require('nodemailer')


let transporter = nodemailer.createTransport({
    //host : "localhost",
    service : /*process.env.SERVICE*/ 'hotmail',
    port : 587,
    secure : false,
    auth : {
        user : /*process.env.USER*/"denna-angham@hotmail.com",
        pass : /*process.env.PASS "bricolup2023@*/ "123denna"
    }
})
module.exports = { 
    ResetPassword : async(email,subject,text) =>{
    try{
        await transporter.sendMail({
            from : "denna-angham@hotmail.com",
            to : email,
            subject : subject,
            text : text
        })

        console.log('email send successfully')
    }catch(error){
        console.log(error,"email not sent") 
    }
    },
    resetPassword : async(data,callback)=>{
        
        try{
            await transporter.sendMail({
                from : "denna-angham@hotmail.com",
                to : data.email,
                subject : "Réinitialiser votre mot de passe",
                html : 
                `
                <p>Assalamu alaykum,</p>
                <p>Nous avons reçu une demande de réinitialisation de votre mot de passe</p>
                <p>Votre code de recuperation est : ${data.codeReset}</p>`
            })
    
            console.log('email send successfully')
        }catch(error){
            console.log(error,"email not sent") 
        } 
    },
    confirmationEmail : async(data,callback)=>{
        try{
            await transporter.sendMail({
                from : "denna-angham@hotmail.com",
                to : data.email,
                subject : "Confirmer votre compte",
                html : `<h1>Email de configuration<h1>
                <h2>Assalamu alaykum</h2>
                <p>Votre code de confirmation est : ${data.codeActivation}</p>`
            })
    
            console.log('email send successfully')
        }catch(error){
            console.log(error,"email not sent") 
        } 
    }
}