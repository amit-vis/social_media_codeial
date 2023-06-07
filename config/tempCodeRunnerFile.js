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