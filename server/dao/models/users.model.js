const mongoose = require("mongoose")

var Promise = require("bluebird")

mongoose.Promise = Promise

var SchemaObj = mongoose.Schema

const userSchema = new SchemaObj({

    userId: { type: String, unique: true, min: 3 },
    name: String,
    password: String,
    mobile: String,
    email: String,
    policyNo: String
    


}, { strict: false })

userModel = mongoose.model('users', userSchema)



module.exports = userModel;