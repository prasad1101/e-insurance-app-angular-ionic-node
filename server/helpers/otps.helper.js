const otpDao = require("../dao/otp.dao")
const config = require("../config/main.config")

const getModel = () => {
    return require("../dao/connection-builder").modelBundle.otpModel;

}

var readOtps = (query, cb) => {
    getModel().find(query || {}, (me, md) => {
        cb(me || md)
    })
}


var saveOtps = (payload, cb) => {
    new (getModel())(payload).save((me, md) => {
        cb(me || md)
    })
}



var updateOtps = (query, payload, cb) => {
    console.log(query, payload)
    getModel().updateOne(query, payload, (me, md) => {
        cb(me || md)
    })
}


/** Authentication */

var jwt = require("jsonwebtoken")

var authorizeOtpUser = (otppayload, cb) => {

    readOtps(otppayload, (otpUserResponse) => {

        otpUserResponse = otpUserResponse[0]

        if (otpUserResponse) {

            try {

                otpUserResponse = JSON.parse(JSON.stringify(otpUserResponse))

            } catch (error) {

            }

            otpUserResponse.access = {
                read: true,
                write: false
            }


            token = jwt.sign(otpUserResponse, config.auth.appSecret, { expiresIn: config.auth.expiresIn })

            cb({ token: token })
        } else {

            cb({ error: "Invalid Otp" })
        }


    })



}




module.exports = { readOtps, saveOtps, updateOtps, authorizeOtpUser }
