const User = require("../../models/User")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const {UserInputError} = require("apollo-server")
const {validatorsRegisterInput,validateLoginInput} = require("../../util/validators")
require("dotenv");

function generateToken(user){
  return jwt.sign({
        id: user.id,
        email:user.email,
        username:user.username,
        },process.env.SECRET,{expiresIn:'1h'});
}


module.exports = {
    Mutation:{
        async login(_,{username,password}){
            const {errors, valid} = validateLoginInput(username, password)
            if(!valid){
                throw new UserInputError("Errors",{errors})  
             }
            const user = await User.findOne({username})
            if(!user){
                errors.general = 'User not found';
                throw new UserInputError("user not found!",{errors})
            }
             const match = await bcrypt.compare(password, user.password)
            
             if(!match){
                errors.general = 'Wrong credentials!';
                throw new UserInputError("Wrong credentials!",{errors})
             }
             
             const token = generateToken(user);
             return {...user._doc, id: user._id,token}
        },
        
        async register(_,
            {registerInput:{
                username,
                email,
                password,
                confirmPassword
            },
            
          
        },context,info){
       
        const {errors, valid} = validatorsRegisterInput(username,email,password,confirmPassword)
        if(!valid){
            throw new UserInputError('Errors',{errors});
        }   
        
        const user = await User.findOne({username})
           if(user){
             throw new UserInputError("User name is already taken",{
                 errors:{
                     username:'This username is already taken'
                 }
             })
           }
      

            password = await bcrypt.hash(password, 12);
            
            const newUser = new User({
                email,
                username,
                password,
                confirmPassword,
                createdAt:new Date().toISOString()
            });

            const res = await newUser.save();
            const token = generateToken(res)
               
                return {...res._doc, id: res._id,token}
        }

        

       }

}