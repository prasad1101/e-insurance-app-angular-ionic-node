const config = require("../config/main.config.json")

const mongoose = require("mongoose")

console.log(config)

mongoose.set("debug", config.isDebugMode || false)

mongoose.connect(config.mongoURL)

mongoose.connection.on("connected", () => {

    console.log("Mongoose connection is open", config.mongoURL)

})

mongoose.connection.on("error", (err) => {

    console.log("Mongoose connection is failed to", config.mongoURL, err)

})


mongoose.connection.on("disconnected", () => {

    console.log("Mongoose connection is disconnected to", config.mongoURL)

})


process.on("SIGINT", () => {

    mongoose.connection.close(() => {

        console.log("process termination asked us to close connection to", config.mongoURL)

        process.exit(0)

    })

})

const modelBundle = require("./models/model.bundle.js")
const userHelper = require("../helpers/users.helper")
const otpsHelper = require("../helpers/otps.helper")
const smsHelper = require("../helpers/sms.helper")
const customerHelper = require("../helpers/customers.helper")
const paymentHelper = require("../helpers/payments.helper")
const custlogHelper = require("../helpers/custlog.helper")

module.exports = { modelBundle, userHelper, otpsHelper, smsHelper, customerHelper, paymentHelper, custlogHelper }