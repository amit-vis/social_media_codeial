//call the express and for setup the server
const express = require('express');
const cookieParser = require('cookie-parser');
const port = 8000;
const expressLayout = require('express-ejs-layouts');
const db = require('./config/mongoose');
//used for session cookie
const session = require('express-session');
const app = express();
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const MongoStore = require('connect-mongo');
const mongoose = require('mongoose');
const sassMiddleware = require('node-sass-middleware');

app.use(sassMiddleware({
    src: './assets/scss',
    dest: './assets/css',
    debug: true,
    outputStyle: 'extended',
    prefix: '/css'
}));

app.use(express.urlencoded());

app.use(cookieParser());

//we have setup out static files

app.use(express.static('./assets'))

// Here we have call the express layouts

app.use(expressLayout);

//extract style and scripts from the sub pages into the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

//Setup the view engine

app.set('view engine', 'ejs');
app.set('views', './views');

// mongo store is used to store the session cookie in the db
app.use(session({
    name: 'codeial',
    //TODO change the secret brfore deployment in production mode
    secret: 'blahsomething',
    //if the identity not establish then donot want to store extra data in session cookie
    saveUninitialized: false,
    //when identity is established or some sort of data present in sesion cookie then do not want rewrite the session data when its not change
    resave: false,
    cookie: {
        maxAge: 1000 * 60 * 100,
    },
     //mongo store use to store the session cookie in the db
    store: MongoStore.create(
        {
        mongoUrl: "mongodb://0.0.0.0:27017/codeial",
        autoRemove: 'disabled'
       },
       function(err){
        console.log(err || 'connect mongodb_setup ok');
       }
    ),
})
);

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

//use express router
app.use('/', require('./routes'));


//call the app for run our server on port
app.listen(port, (err)=>{
    if (err){
        console.log(`Error in running the server: ${err}`);
    }
    console.log(`Server is running successfully on the port: ${port}`);
});