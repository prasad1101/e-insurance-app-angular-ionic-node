const express = require("express")

const router = express.Router()

const dbFactory = require("../dao/connection-builder")

router.get("/list", (req, res) => {

    dbFactory.userHelper.readUsers(req.query, (result) => {

        res.json(result)
    })
})

router.delete("/delete", (req, res) => {

    dbFactory.userHelper.deleteUsers(req.body.userId, (result) => {

        res.json(result)
    })
})

router.put("/update", (req, res) => {
    dbFactory.userHelper.updateUsers(req.query.userId, req.body, (result) => {
        res.json(result)
    })
})

router.post("/register", (req, res) => {
    dbFactory.userHelper.saveUsers(req.body, (result) => {
        res.json(result)
    })
})



module.exports = { router }