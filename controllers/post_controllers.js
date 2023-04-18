// here we exports the post from models

const Post = require('../models/post');
const Comment = require('../models/comment');

module.exports.create = async (req,res)=>{
    try{
        const {content} = req.body;
        const {_id} = req.user;
        const post = await Post.create({content, user:_id});
        
        if(req.xhr){
          return res.status(200).json({
            data:{
              post: post
            },
            message: 'Post created!'
          });
        }

        if (post){
          req.flash('success', 'Post published!');
          return res.redirect('back');
        }
    }
    catch(err){
      req.flash('error', err);
      return req.redirect('back');
    }
}

module.exports.destroy = async function(req, res) {
  try {
    const post = await Post.findById(req.params.id);
    if (post.user == req.user.id) {
      await post.deleteOne();
      await Comment.deleteMany({post: req.params.id});
      req.flash('success', 'Post and associated comments deleted!');
      return res.redirect('back');
    } else {
      req.flash('error', 'You cannot delete this post!')
      return res.redirect('back');
    }
  } catch (err) {
    req.flash('error', err);
    return res.redirect('back');
  }
}

