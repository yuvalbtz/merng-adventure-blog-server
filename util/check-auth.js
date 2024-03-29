const {AuthenticationError} = require("apollo-server")
const jwt = require("jsonwebtoken")
require("dotenv").config()

module.exports = (context) => {

const authHeader = context.req.headers.authorization;

if(authHeader){
   
    const token = authHeader.split('Bearer ')[1]
   
    if(token){
        try{
          
            const user = jwt.verify(token,process.env.SECRET);
            return user;
        }catch(err){
            throw new AuthenticationError('Invalid/Expired token')
        }
    }
    throw new Error('Authentication token must be bearer')
}

throw new Error('Authorization header must be provided')

}