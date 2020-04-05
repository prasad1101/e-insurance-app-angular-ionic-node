const userDao = require("../dao/user.dao")
const config = require("../config/main.config")
const getModel = () => {
    return require("../dao/connection-builder").modelBundle.customerModel;

}

var readCustomers = (query, cb) => {
    getModel().find(query || {}, (me, md) => {
        cb(me || md)
    })
}


var saveCustomers = (payload, cb) => {
    new (getModel())(payload).save((me, md) => {
        cb(me || md)
    })
}



var updateCustomers = (customerId, payload, cb) => {
    getModel().update({ customerId: customerId }, payload, (me, md) => {
        cb(me || md)
    })
}

var deleteCustomers = (customerId, cb) => {
    getModel().remove({ customerId: customerId }, (me, md) => {
        cb(me || md)
    })
}




module.exports = { readCustomers, saveCustomers, updateCustomers, deleteCustomers }
