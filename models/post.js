const {model, Schema} = require("mongoose")
// mongo-db post structure

const postSchema = new Schema({
    body: String,
    title:String,
    createdAt:String,
    username:String,
    imagePost:String,
    comments:[
         {
             body:String,
             username:String,
             createdAt:String
         }
 
    ],
    likes:[
        {
            username:String,
            createdAt:String
        }
    ],
    user:{
        type:Schema.Types.ObjectId,
        ref:'users'
    }
})


module.exports = model('Post', postSchema)