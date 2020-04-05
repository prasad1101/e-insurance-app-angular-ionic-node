var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'prasad.k.pawar@gmail.com',
        pass: '9021239787'
    }
});


let sendEmail = function (mailOptions, cb) {

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log({ err: error, success: false });
            cb(error)
        } else {
            console.log('Email sent: ' + info.response);
            cb({ res: info.response, success: true })
        }
    });
}
module.exports = { sendEmail };