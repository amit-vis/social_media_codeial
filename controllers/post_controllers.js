// here we exports the post from models

const Post = require('../models/post');

module.exports.create = async (req,res)=>{
    try{
        console.log(req.body, req.user)
        const {content} = req.body;
        const {_id} = req.user;
        const post = await Post.create({content, user:_id});
        if (post){
            return res.redirect('back');
        }
    }
    catch(err){
        console.log('error in creating a post', err);
    }
}