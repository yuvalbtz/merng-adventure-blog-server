const {ApolloServer} = require("apollo-server")
const mongoose = require("mongoose")
const typeDefs = require("./graphql/typeDefs")
const resolvers = require("./graphql/resolvers")
require("dotenv");

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context:({req}) => ({req})
    
})

const PORT = process.env.PORT || 4000


mongoose
.connect('mongodb+srv://' + encodeURIComponent(`${process.env.USERNAME}:${process.env.PASS}`) +`@cluster0.btjvx.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`)
  .then(() => {
    return server.listen({port:PORT})
    .then(res =>{
     console.log(`server is running at ${res.url}`);
    })
  })
 .catch(err => {
    console.log(err);
  });






