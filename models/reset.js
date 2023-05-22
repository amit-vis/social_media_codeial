const mongoose = require('mongoose');

const resetSchema = new mongoose.Schema({
    email:{
        type: String,
        required: true
    },
    isverfied:{
        type: Boolean,
        default: true
    },
    acessToken:{
        type: String
    }
},{
    timestamps: true
});

const Reset = mongoose.model('Reset', resetSchema);
module.exports = Reset