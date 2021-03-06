const {ApolloServer} = require("apollo-server")
const mongoose = require("mongoose")

const {username, dbName, password} = require("./credentials.json")

const typeDefs = require("./graphql/typeDefs")
const resolvers = require("./graphql/resolvers/index")







const server = new ApolloServer({
  introspection: true, 
   typeDefs,
    resolvers,
    context:({req}) => ({req})
    
})




mongoose
.connect('mongodb+srv://' + encodeURIComponent(`${username}:${password}`) +`@cluster0.btjvx.mongodb.net/${dbName}?retryWrites=true&w=majority`)
  .then(() => {
    return server.listen({port: process.env.PORT || 4000})
    .then(res =>{
     console.log(`server is running at ${res.url}`);
    })
  })
 .catch(err => {
    console.log(err);
  });






