const userDao = require("../dao/user.dao")
const config = require("../config/main.config")
const getModel = () => {
    return require("../dao/connection-builder").modelBundle.custlogModel;

}

var readCust = (query, cb) => {
    getModel().find(query || {}, (me, md) => {
        cb(me || md)
    })
}


var saveCust = (payload, cb) => {
    new (getModel())(payload).save((me, md) => {
        cb(me || md)
    })
}



var updateCust = (customerId, payload, cb) => {
    getModel().update({ customerId: customerId }, payload, (me, md) => {
        cb(me || md)
    })
}

var deleteCust = (customerId, cb) => {
    getModel().remove({ customerId: customerId }, (me, md) => {
        cb(me || md)
    })
}

/** Authentication */

var jwt = require("jsonwebtoken")

var authorizeCust = (loginpayload, cb) => {

    readCust(loginpayload, (loginUserResponse, isSuccess) => {

        loginUserResponse = loginUserResponse[0]

        if (loginUserResponse) {
            isSuccess = true;
            try {

                loginUserResponse = JSON.parse(JSON.stringify(loginUserResponse))

            } catch (error) {

            }

            loginUserResponse.access = {
                read: true,
                write: false
            }


            token = jwt.sign(loginUserResponse, config.auth.appSecret, { expiresIn: config.auth.expiresIn })

            cb({ token: token, isSuccess: isSuccess })
        } else {
            isSuccess = false;
            cb({ error: "Invalid login" })
        }


    })



}




module.exports = { readCust, saveCust, updateCust, authorizeCust, deleteCust }
