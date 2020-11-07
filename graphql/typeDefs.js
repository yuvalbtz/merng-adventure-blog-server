const gql = require("graphql-tag");


module.exports = gql`
 type Post{
     id:ID!
     body:String!
     title:String!
     createdAt:String!
     username:String!
     comments:[Comment]!
     likes:[Like]!
     likeCount:Int!
     commentCount:Int!
     imagePost:String
    }

type Comment{
    id:ID!
    createdAt:String!
    username:String!
    body:String!
}   

type Like{
    id:ID!
    createdAt:String!
    username:String!
}


 input RegisterInput{
     username:String!
     email:String!
     password:String!
     confirmPassword:String!
}

type User{
    id:ID!
    email:String!
    token:String!
    username:String!
    createdAt:String!
}

 type Query{
     getPosts:[Post!]!
     getPost(postId:ID!):Post
 }

 type Mutation{
    register(registerInput:RegisterInput):User!
    login(username:String!, password:String!):User!
    createPost(title:String!, body:String!, imagePost:String!):Post!      
    deletePost(postId:ID!):String!
    createComment(postId:ID!, body:String!):Post!
    deleteComment(postId:ID!, commentId:ID!):Post!
    likePost(postId:ID!):Post!
} `


    