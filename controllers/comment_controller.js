
const comment = require('../models/comment');
const Comment = require('../models/comment');
const Post = require('../models/post');

module.exports.create = function(req, res){
    console.log(req.user)
     Post.findById(req.body.post)
     .then(post=>{
        if (post){
            Comment.create({
                content: req.body.content,
                post: req.body.post,
                user: req.user._id
            })
            .then(comment=>{
                post.comments.push(comment);
                post.save()
                .then(()=>{
                    if(req.xhr){
                        return res.status(200).json({
                            data:{
                                comment: comment
                            },
                            message: 'comment created!'
                        });
                    }
                    else{
                        res.redirect('/');
                    }
                })
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

module.exports.destroy = async function(req, res){
    try{
        const comment = await Comment.findById(req.params.id);
        if(comment && comment.user == req.user.id){
            let postId = comment.post;
            await comment.deleteOne();
            await Post.findByIdAndUpdate(postId, {$pull: {comments: req.params.id}});
            return res.redirect('back');
        }else if(comment && comment.post.user == req.user.id){
            let postId = comment.post;
            await comment.deleteOne();
            await Post.findByIdAndUpdate(postId, {$pull: {comments: req.params.id}});
            return res.redirect('back');
        }
        else{
            return res.redirect('back');
        }
    }
    // Comment.findById(req.params.id)
    // .then(comment=>{
    //     if(comment.user == req.user.id){
    //         let postId = comment.post;
    //         comment.deleteOne();
    //         Post.findByIdAndUpdate(postId, {$pull: {comments: req.params.id}})
    //         .then(post=>{
    //             return res.redirect('back');
    //         })
    //     }else{
    //         return res.redirect('back');
    //     }
    // })
    catch(err){
        console.log('error in deleting', err)
    }
}