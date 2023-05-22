const mongoose = require('mongoose');

const FreindshipSchema = new mongoose.Schema({
    // the user who sent the request
    from_user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    to_user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }

},{
    timestamps:  true
});

const Friendships = mongoose.model('Friendships', FreindshipSchema);

module.exports = Friendships