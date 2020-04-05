const express = require("express")

const paymentsRouter = express.Router()

const dbFactory = require("../dao/connection-builder")

paymentsRouter.get("/get-payments", (req, res) => {

    dbFactory.paymentHelper.getPayments(req.query, (result) => {

        res.json(result)
    })
})

paymentsRouter.delete("/delete-payments", (req, res) => {

    dbFactory.paymentHelper.deletePayments(req.body.userId, (result) => {

        res.json(result)
    })
})

paymentsRouter.put("/update-payments", (req, res) => {
    dbFactory.paymentHelper.updatePayments(req.query.userId, req.body, (result) => {
        res.json(result)
    })
})

paymentsRouter.post("/save-payments", (req, res) => {
    dbFactory.paymentHelper.savePayments(req.body, (result) => {
        res.json(result)
    })
})



module.exports = { paymentsRouter }