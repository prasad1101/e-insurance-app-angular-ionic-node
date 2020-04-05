const express = require("express")

const customersRouter = express.Router()

const dbFactory = require("../dao/connection-builder")

customersRouter.get("/listCustomer", (req, res) => {

    dbFactory.customerHelper.readCustomers(req.query, (result) => {

        res.json(result)
    })
})

customersRouter.delete("/deleteCustomer", (req, res) => {

    dbFactory.customerHelper.deleteCustomers(req.body.customerId, (result) => {

        res.json(result)
    })
})

customersRouter.put("/updateCustomer", (req, res) => {
    dbFactory.customerHelper.updateCustomers(req.query.customerId, req.body, (result) => {
        res.json(result)
    })
})

customersRouter.post("/registerCustomer", (req, res) => {
    dbFactory.customerHelper.saveCustomers(req.body, (result) => {
        res.json(result)
    })
})



module.exports = { customersRouter }