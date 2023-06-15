const mongoose = require('mongoose');
const env = require('./environment');

mongoose.connect(`mongodb+srv://amit917480:78nrWRdXWxAGgHi5@cluster0.4ykmlkp.mongodb.net/${env.db}`);
// mongodb+srv://amit200698:VETYFX8ajWwHzWMf@cluster0.8guugkn.mongodb.net/

const db = mongoose.connection;

db.on('error', console.error.bind(console, "Error connecting to MongoDB"));


db.once('open', function(){
    console.log('Connected to Database :: MongoDB');
});


module.exports = db;