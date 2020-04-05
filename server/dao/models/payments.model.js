const mongoose = require("mongoose")

var Promise = require("bluebird")

mongoose.Promise = Promise

var SchemaObj = mongoose.Schema

const paymentSchema = new SchemaObj({

    userId: String,
    policyNo: String,
    cardNo: String,
    expiryDate: String,
    cvv: String,
    amount: String

}, { strict: false })

paymentModel = mongoose.model('payments', paymentSchema)



module.exports = paymentModel;