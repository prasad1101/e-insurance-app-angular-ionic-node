const express = require("express")

const custlogRouter = express.Router();

const dbFactory = require("../dao/connection-builder")

custlogRouter.get("/listCust", (req, res) => {

    dbFactory.custlogHelper.readCust(req.query, (result) => {

        res.json(result)
    })
})

custlogRouter.delete("/deleteCust", (req, res) => {

    dbFactory.custlogHelper.deleteCust(req.body.customerId, (result) => {

        res.json(result)
    })
})

custlogRouter.put("/updateCust", (req, res) => {
    dbFactory.custlogHelper.updateCust(req.query.customerId, req.body, (result) => {
        res.json(result)
    })
})

custlogRouter.post("/registerCust", (req, res) => {
    dbFactory.custlogHelper.saveCust(req.body, (result) => {
        res.json(result)
    })
})



module.exports = { custlogRouter }