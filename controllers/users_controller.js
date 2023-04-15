// here we have exports the User
const User = require('../models/user')

// module.exports.profile = (req, res)=>{
//     console.log('hello');
//     // if(req.cookies.user_id){
//         console.log('Hii');
//         User.findById(req.cookies.user_id)
//         .then((user)=>{
//             if(user){
//                 return res.render('user_profile', {
//                     title: 'User Profile',
//                     user: user
//                 })
//             }else{
//                 return res.redirect('/users/sign-in')
//             }
//         })

//     // }else{
//     //     return res.redirect('/users/sign-in')
//     // }
//  }
module.exports.profile = function(req, res){
    console.log('hello')
    User.findById(req.params.id)
    .then(user=>{
        return res.render('user_profile', {
            title: 'User Profile',
            profile_user: user
        });

    })
}

module.exports.update = async function(req, res){
    if(req.user.id == req.params.id){
        const user = await User.findByIdAndUpdate(req.params.id, req.body)
        return res.redirect('back');
    }else{
        return res.status(401).send('Unauthorized')
    }
}

// module.exports.profile = function(req, res){
//         return res.render('user_profile', {
//             title: 'User Profile',
//             user: user
//         })
//     }

//Sign-out page
// module.exports.signOut = (req, res,next)=>{
//     res.clearCookie('user_id')
//     res.redirect('back')
//     next();
// }
//render the sign up page

module.exports.signUp = (req, res)=>{
    if (req.isAuthenticated()){
        return res.redirect('/users/profile')
    }

    return res.render('sign_up_page', {
        title: 'Codeial | User Sign Up'
    });
}

//render the sign in page

module.exports.signIn = (req, res)=>{
    if (req.isAuthenticated()){
        return res.redirect('/users/profile')
    }
    else{
        return res.render('sign_in_page',{
            title: 'Codeial | User Sign In'
        });
    }
}
//get up the signup page

module.exports.create = (req, res) => {
    if (req.body.password !== req.body.confirm_password) {
      return res.redirect('back');
    }
  
    User.findOne({ email: req.body.email })
    .then((user)=>{
        if (!user){
            User.create(req.body)
        }
        else{
            return res.redirect('back')
        }
        // return res.redirect('back')
        return res.redirect('/users/sign-in')
    })
    .catch((err)=>{
        console.log('error in creating user while signinup',err);
        return res.redirect('back');
    })
  };
  

// sign in create a session for the user

// module.exports.createSession = (req,res)=>{
//     // User.findOne({email: req.body.email})
//     // .then((user)=>{
//     //     if(req.body.password != user.password){
//     //         return res.redirect('back');
//     //     }else{
//     //         res.cookie('user_id', user.id);
//     //         return res.redirect('/users/profile');
//     //     }
//     // })
//     // .catch((err)=>{
//     //     console.log('Error in signing the page: ', err);
//     //     return res.redirect('back');
//     // })

//     return res.redirect('/');
// };

module.exports.createSession = function(req, res){
    return res.redirect('/');
}

module.exports.destroySession = function(req, res){
    req.logout(function(){
        // Perform any necessary actions after user has been logged out
        return res.redirect('/');
    });
}

