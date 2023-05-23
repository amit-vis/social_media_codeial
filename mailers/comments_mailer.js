const nodemailer = require('../config/nodemailers');

// this is another way to exporting method
exports.newComment = (comment) =>{
    let htmlString = nodemailer.renderTemplate({comment: comment}, 'comments/new_comment.ejs')

    nodemailer.transporter.sendMail({
        from: 'av7942686@gmail.com',
        to: comment.user.email,
        subject: 'new Comment published!',
        html: htmlString
    },(err, info)=>{
        if(err){
            console.log('error in sending mail', err);
            return;
        }
        console.log('message is sent', info);
        return;
    });
}