const nodeMailer = require('../config/nodemailer');

//another way of exporting
exports.newComment = (comment) => {
    let htmlString = nodeMailer.renderTemplate({comment: comment},'/comments/new_comment.ejs');

    nodeMailer.transporter.sendMail({
      from: 'developerzzz0802@gmail.com',
      to: comment.user.email,
      subject: "New COmment ",
      html: htmlString
    }, (err, info) => {
        if(err){
            console.log('Error in sending mail',err);
            return;
        }
        console.log('Message sent', info);
        return;
    }
    
    );
}