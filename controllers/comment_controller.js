
const Comment = require('../models/comment');
const Post = require('../models/post');

module.exports.create = function(req, res){
    console.log(req.user)
     Post.findById(req.body.post)
     .then(post=>{
        if (post){
            console.log(post)
            Comment.create({
                content: req.body.content,
                post: req.body.post,
                user: req.user._id
            })
            .then(comment=>{
                post.comments.push(comment);
                post.save();
                res.redirect('/');
            })
            .catch(err=>{
                console.log('error',err);
                res.redirect('/');
            })
        }
     })
     .catch(err=>{
        console.log('error',err);
        res.redirect('/');
     })
}