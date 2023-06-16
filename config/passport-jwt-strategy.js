const passport = require('passport');
const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;

const User = require('../models/user');
const env = require('./environment');

let opts = {
    secretOrKey: env.secret_key,
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken()
};


passport.use(new JWTStrategy(opts, async function (jwtPayLoad, done) {

    // User.findById(jwtPayLoad._id, function(err, user){
    //     if (err){console.log('Error in finding user from JWT'); return;}

    //     if (user){
    //         return done(null, user);
    //     }else{
    //         return done(null, false);
    //     }
    // })
    try {
        const user = await User.findById(jwtPayLoad._id);
        console.log("here is user", user)
        if (user) {
            return done(null, user);
        } else {
            return done(null, false)
        }

    } catch (error) {
        console.log('Error in finding user from JWT', error);
    }

}));

module.exports = passport;
