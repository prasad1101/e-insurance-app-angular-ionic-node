const express = require("express")
const otplib = require("otplib")
const otpRouter = express.Router()
const smsHelper = require("../helpers/sms.helper")
const dbFactory = require("../dao/connection-builder")
const mailHelper = require("../helpers/mail.helper")
const secret = 'KVKFKRCPNZQUYMLXOVYDSQKJKZDTSRLD'

let generateOTP = (userId, cb) => {
    let token = otplib.authenticator.generate(secret + userId);
    cb(token)
}

otpRouter.post("/generate-otp", (req, res) => {

    generateOTP(req.body.userId, (otp) => {
        let otpToSave = {
            createdOn: new Date(),
            otp: otp,
            userId: req.body.userId,
            isVerified: false,
            mobile: req.body.mobile,
            email: req.body.email
        }
        dbFactory.userHelper.readUsers({ userId: req.body.userId }, (result) => {

            if (result) {

                dbFactory.otpsHelper.saveOtps(otpToSave, (result) => {

                    console.log("otp router says =======>", result)


                    smsHelper.sendSms(result.mobile, result.userId, otp)
                    res.json(/* { msg: "New Otp is sent to your contact number" } */ result)



                    console.log("mail options contains ======>", mailOptions)
                    var mailOptions = {
                        from: 'Prasad from E-insurance App <prasad.k.pawar@gmail.com>',
                        to: result.email,
                        subject: 'OTP For E-Insurance App',
                        text: `Hello Mr/Ms ${result.userId}, Welcome to E-Insurance App, your OTP is :` + otp
                    };
                    mailHelper.sendEmail(mailOptions);



                })
            }
            else {
                res.json(result)
            }
        })
    })
})

otpRouter.put("/verify-otp", (req, res) => {

    dbFactory.otpsHelper.updateOtps({ userId: req.body.userId, otp: req.body.otp }, { isVerified: true }, (result) => {
        if (0 == result.n) {
            res.json({ error: "Invalid otp" })
        }
        else if (0 == result.nModified) {
            res.json({ error: "Please check your otp, it may be already used" })
        } else {
            res.json({ success: true })
        }
    })
})



module.exports = { otpRouter }