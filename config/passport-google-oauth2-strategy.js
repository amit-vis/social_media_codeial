const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const User = require('../models/user');


// tell passport to use a new strategy for google login
passport.use(new googleStrategy({
        clientID: "626612680844-gflggpi5nrn001s3g286v2aqqfh761nl.apps.googleusercontent.com",
        clientSecret: "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",
        callbackURL: "http://localhost:8000/users/auth/google/callback",
    },

    async function(accessToken, refreshToken, profile, done){
        // find a user
        // User.findOne({email: profile.emails[0].value}).exec(function(err, user){
        //     if (err){console.log('error in google strategy-passport', err); return;}
        //     console.log(accessToken, refreshToken);
        //     console.log(profile);

        //     if (user){
        //         // if found, set this user as req.user
        //         return done(null, user);
        //     }else{
        //         // if not found, create the user and set it as req.user
        //         User.create({
        //             name: profile.displayName,
        //             email: profile.emails[0].value,
        //             password: crypto.randomBytes(20).toString('hex')
        //         }, function(err, user){
        //             if (err){console.log('error in creating user google strategy-passport', err); return;}

        //             return done(null, user);
        //         });
        //     }

        // });
        try{
            // find a user
            const user = await User.findOne({email: profile.emails[0].value});
            if(user){
                // if found , set this user as req.user
                return done(null, user);
            }
            // if not found, create the user and set it as req.user
            else{
                const newUser = new User({
                    name: profile.displayName,
                    email: profile.emails[0].value,
                    password: crypto.randomBytes(20).toString('hex')
                });

                await newUser.save();
                return done(null, newUser);
            }

        }catch(err){
            console.log('error in google strategy password', err);
            return;
        }
    }


));


module.exports = passport;
