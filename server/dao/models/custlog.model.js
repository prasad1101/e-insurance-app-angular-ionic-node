const mongoose = require("mongoose")

var Promise = require("bluebird")

mongoose.Promise = Promise

var SchemaObj = mongoose.Schema

const custlogSchema = new SchemaObj({

    customerId: { type: String, unique: true, min: 3 },
    password: String,

}, { strict: false })

custlogModel = mongoose.model('customerLogin', custlogSchema)



module.exports = custlogModel;