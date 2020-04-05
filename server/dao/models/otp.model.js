const mongoose = require("mongoose")

var Promise = require("bluebird")

mongoose.Promise = Promise

var SchemaObj = mongoose.Schema

const otpSchema = new SchemaObj({

    otp: String,
    userId: String,
    createdOn: Date,
    isVerified: Boolean


}, { strict: false })

otpModel = mongoose.model('otps', otpSchema)

module.exports = otpModel;