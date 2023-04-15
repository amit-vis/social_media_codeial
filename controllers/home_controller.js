const Post = require('../models/post');
const User = require('../models/user');

//setup the cotroller function.
module.exports.home = async function(req,res){

    // Post.find({})
    // .then(post=>{
    //     return res.render('home', {
    //         title: 'Codeial | Home',
    //         post: post
    //     })
    // })
    try{
        const post = await Post.find({})
        .populate('user')
        .populate({
            path: 'comments',
            populate: {
                path: 'user'
            }
        })
        const user = await User.find({})
            res.render('home',{
                title: 'Codeial | Home',
                post,
                all_users: user
            })
    } catch(err){
        console.log('error', err)
    }
}
