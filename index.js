const {ApolloServer} = require("apollo-server")
const mongoose = require("mongoose")

const {username, dbName, password} = require("./credentials.json")

const typeDefs = require("./graphql/typeDefs")
const resolvers = require("./graphql/resolvers")


const server = new ApolloServer({
    typeDefs,
    resolvers,
    context:({req}) => ({req})
    
})

const PORT = process.env.PORT || 4000


mongoose
.connect('mongodb+srv://' + encodeURIComponent(`${username}:${password}`) +`@cluster0.btjvx.mongodb.net/${dbName}?retryWrites=true&w=majority`)
  .then(() => {
    return server.listen({port:PORT})
    .then(res =>{
     console.log(`server is running at ${res.url}`);
    })
  })
 .catch(err => {
    console.log(err);
  });






