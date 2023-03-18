const {verify } = require("jsonwebtoken")

module.exports = {
    checkToken :(req,res,next)=>{
        let token = req.get("Authorisation")
        console.log(token)
        if(token){
            token = token.slice(7)
            
            verify(token,"qwe1234",(err,decoded)=>{
                if(err){
                    res.json({
                        success : 0,
                        message : 'invalid token'
                    })
                }else{
                    next()
                }
            })
        }else{
            res.json({
                success : 0,
                message : 'access denied! unautorized user'
            })
        }
    }
}