// here we exports the post from models

const Post = require('../models/post');
const Comment = require('../models/comment');

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

module.exports.destroy = async function(req, res) {
  try {
    const post = await Post.findById(req.params.id);
    if (post.user == req.user.id) {
      await post.deleteOne();
      await Comment.deleteMany({post: req.params.id});
      return res.redirect('/');
    } else {
      return res.redirect('back');
    }
  } catch (err) {
    console.error(err);
    return res.status(500).send('Internal Server Error');
  }
}

