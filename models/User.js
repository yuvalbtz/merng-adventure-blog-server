const {model, Schema} = require("mongoose")
// mongo-db user structure
const userSchema = new Schema({
      username: String,
      password:String,
      email:String,
      createdAt:String

});



module.exports = model('User', userSchema);







