const userDao = require("../dao/user.dao")
const config = require("../config/main.config")
const getModel = () => {
    return require("../dao/connection-builder").modelBundle.paymentModel;

}

var getPayments = (query, cb) => {
    getModel().find(query || {}, (me, md) => {
        cb(me || md)
    })
}


var savePayments = (payload, cb) => {
    new (getModel())(payload).save((me, md) => {
        cb(me || md)
    })
}



var updatePayments = (userId, payload, cb) => {
    getModel().update({ userId: userId }, payload, (me, md) => {
        cb(me || md)
    })
}

var deletePayments = (userId, cb) => {
    getModel().remove({ userId: userId }, (me, md) => {
        cb(me || md)
    })
}




module.exports = { getPayments, savePayments, updatePayments, deletePayments }
