const mongoose = require("mongoose")
var autoIncrement = require('mongoose-auto-increment');
var Promise = require("bluebird")

mongoose.Promise = Promise

var connection = mongoose.createConnection("mongodb://localhost/insurance");
autoIncrement.initialize(connection);

var SchemaObj = mongoose.Schema

const customerSchema = new SchemaObj({

    customerId: String,
    policyNo: String,
    mobile: String,
    name: String,
    plan: String,
    term: String,
    location: String,
    sumAssured: String,
    purpose: String

}, { strict: false })

customerSchema.plugin(autoIncrement.plugin, {
    model: 'Customer',
    field: 'customerId',
    startAt: 1,
    incrementBy: 1
});


customerModel = mongoose.model('customers', customerSchema)

module.exports = customerModel;