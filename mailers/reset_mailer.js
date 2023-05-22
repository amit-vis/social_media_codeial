const nodemailer = require('../config/nodemailers');

exports.newMail = (link)=>{
    const htmlString = nodemailer.renderTemplate({link: link}, 'reset/reset.ejs');

    nodemailer.transporter.sendMail({
        from: 'av7942686@gmail.com',
        to: link.email,
        subject: 'Reset Password',
        html: htmlString
    },function(err, info){
        if(err){
            console.log('Error', err)
        }
        console.log('Reset password link sent', info);
    });
}