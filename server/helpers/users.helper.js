const userDao = require("../dao/user.dao")
const config = require("../config/main.config")
const getModel = () => {
    return require("../dao/connection-builder").modelBundle.userModel;

}

var readUsers = (query, cb) => {
    getModel().find(query || {}, (me, md) => {
        cb(me || md)
    })
}


var saveUsers = (payload, cb) => {
    new (getModel())(payload).save((me, md) => {
        cb(me || md)
    })
}



var updateUsers = (userId, payload, cb) => {
    getModel().update({ userId: userId }, payload, (me, md) => {
        cb(me || md)
    })
}

var deleteUsers = (userId, cb) => {
    getModel().remove({ userId: userId }, (me, md) => {
        cb(me || md)
    })
}

/** Authentication */

var jwt = require("jsonwebtoken")

var authorizeUser = (loginpayload, cb) => {

    readUsers(loginpayload, (loginUserResponse, isSuccess) => {

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




module.exports = { readUsers, saveUsers, updateUsers, authorizeUser, deleteUsers }
