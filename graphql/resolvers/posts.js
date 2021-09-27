const Post = require("../../models/Post")
const checkAuth = require("../../util/check-auth")
const {AuthenticationError, UserInputError} = require("apollo-server")
module.exports = {
    Query:{
        async getPosts(){
          try{
           const posts = await Post.find().sort({createdAt:-1})
           return posts;

         }catch(err){
            throw new Error(err)
          }
        },
        async getPost(_,{postId}){
            try{
                const post = await Post.findById(postId)
               if(post){
                   return post
               }else{
                   throw new Error('Post not found!')
               }
            }catch(err){
                throw new Error(err)
            }
        },
        
        
        
    },

    Mutation:{
        async createPost(_,{title,body, imagePost},context){
                const user = checkAuth(context)
            
            try {
                if(title.trim() === '') throw new UserInputError('Post title must not be empty!')
            
                if(body.trim() === '') throw new UserInputError('Post body must not be empty!')
            
                if(imagePost.trim() === '') throw new UserInputError('Post image must not be empty!')
           
         
                const newPost = new Post({imagePost,title, body,user:user.id,username:user.username,createdAt:new Date().toISOString()})
                const post = await newPost.save() 
                 return post;
            } catch (error) {
                throw new Error(error)  
            }
        },
        
        async updatePost(_,{postId, title, body, imagePost},context){
                 const user = checkAuth(context)

            try{
                const post = await Post.findById(postId);
                if(user.username === post.username){
                    post.title = title 
                    post.body = body
                    post.imagePost = imagePost
                    
                    const updatedPost = await post.save()
                    
                    
                    return updatedPost;  
                }else{
                    throw new AuthenticationError('Action is not allowed!')
                }
            }catch(err){
                throw new Error(err)
            }
        },
        
        
        async deletePost(_,{postId},context){
            const user = checkAuth(context)

            try{
                const post = await Post.findById(postId);
                if(user.username === post.username){
                    await post.delete();
                    return 'Post deleted successfully!';  
                }else{
                    throw new AuthenticationError('Action is not allowed!')
                }
            }catch(err){
                throw new Error(err)
            }
        }
    }
}