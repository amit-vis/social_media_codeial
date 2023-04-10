const Post = require('../models/post');

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
        const post = await Post.find({}).populate('user');
        res.render('home',{
            title: 'Codeial | Home',
            post
        })
    } catch(err){
        console.log('error', err)
    }
}
