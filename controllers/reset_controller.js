const User = require('../models/user')
const Reset = require('../models/reset');
const queue = require('../config/kue');
const crypto = require('crypto');
const { create } = require('connect-mongo');
const resetWorkers = require('../workers/reset_mail_workers');

module.exports.passwordLoad = function (req, res) {
    return res.render('reset', {
        title: 'Reset password'
    });
}

module.exports.passwordReset = async function (req, res) {
    console.log('here i m for', req.body)
    const user = await User.findOne({ email: req.body.email });
    if (user) {
        console.log(user);
        const resetVerify = await Reset.create({
            email: req.body.email,
            isverfied: true,
            acessToken: crypto.randomBytes(20).toString('hex')
        });
        console.log(resetVerify);
        const job = queue.create('reset', resetVerify).save(function (err) {
            if (err) {
                console.log('Error', err);
                return;
            }
            console.log('jon enqueued', job.id)
            return res.redirect('back')
        })

    } else {
        return res.redirect('/users/sign-up');
    }
}

module.exports.recoryMail = async function (req, res) {
    try {
        await Reset.findOne({ acessToken: req.query.acessToken })
        console.log('Token is here2')
        //tdo- add a check here
        res.render('recover', { title: "reset", token: req.query.acessToken });


    } catch (err) {
        console.log('Error', err)

    }
}

module.exports.recoveryPass = async function (req, res) {
    try {
        if (req.body.password !== req.body.confirm_password) {
            console.log('Password does not match');
            return res.redirect('back');
        }
        let resetToken = await Reset.findOne({ acessToken: req.body.token});
        resetToken.isverfied = false;
        resetToken.save();
        console.log('token is here', resetToken)
        let user = await User.findOne({ email: resetToken.email });
        user.password = req.body.password;
        await user.save();
        res.redirect('/users/sign-in');
        console.log('user is here', user)

    } catch (err) {
        console.log("Error in updating password", err);
        return res.redirect('back');
    }
}