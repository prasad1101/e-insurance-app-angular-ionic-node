
const config = require("./config/main.config.json")
const jwt = require("jsonwebtoken")
const ngrok = require('ngrok');

const express = require('express')
const bodyParser = require("body-parser")
const app = express()
const conBuilder = require('./dao/connection-builder')

var fs = require('fs');
var http = require('http');
var https = require('https');



const allowCrossDomain = (req, res, next) => {

    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    //res.header('Access-Control-Allow-Headers', 'x-access-token');
    res.header('Access-Control-Allow-Headers', '*');
    next();
}
app.use(allowCrossDomain)


app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.all("*", (req, res, next) => {
    req.reqId = Math.random()
    console.log(`${req.reqId} | ${req.method} | ${req.url} | ${new Date()} | ${req.method == 'GET' ? JSON.stringify(req.query) : JSON.stringify(req.body)}`)

    next();
})

app.post("/login", (req, res) => {

    conBuilder.userHelper.authorizeUser(req.body, (response) => {

        res.json(response)
    })
})

app.post("/loginCust", (req, res) => {

    conBuilder.custlogHelper.authorizeCust(req.body, (response) => {

        res.json(response)
    })
})

app.get('/', (req, res) => res.send('hello world !'))

const verifyToken = (req, res, next) => {

    token = req.headers["x-access-token"]

    if (token) {

        jwt.verify(token, config.auth.appSecret, (err, decodedToken) => {



            if (err) {

                console.log(`Invalid user token provided, access denied to request ${req.reqId}`)

                res.status(403).send({ auth: false, message: "Invalid token provided" })
                return
            } else {
                next()
            }
        })

    } else {

        res.status(403).send({ auth: false, message: "No token provided" })
        return
    }

}


app.use("/users", require("./router/users.router").router)
app.use("/customers", require("./router/customers.router").customersRouter)
app.use("/payments", require("./router/payments.router").paymentsRouter)
app.use("/otps", require("./router/otps.router").otpRouter)
app.use("/custlog", require("./router/custlog.router").custlogRouter)



//start servers


/* HTTPS */

const privateKey = fs.readFileSync(__dirname + config.ssl.privateKey, 'utf8');
const certificate = fs.readFileSync(__dirname + config.ssl.sslCertificate, 'utf8');
const ca1 = fs.readFileSync(__dirname + config.ssl.ca1, 'utf8');
const ca2 = fs.readFileSync(__dirname + config.ssl.ca2, 'utf8');
const credentials = { key: privateKey, cert: certificate, ca: [ca1, ca2] };

/* HTTPS end */








// app.listen(config.port, () => {
//     const url = ngrok.connect(config.port).then(r => {
//         console.log(`Port forwarded via ngrok at ${r} , try local server at : http://localhost:${config.port}!`)
//     });
// })

const httpServer = http.createServer(app);
const httpsServer = https.createServer(credentials, app);



httpServer.listen(config.port, (a) => {
    console.log(`HTTP | ${config.serverName} listening on port ${config.port}!`)
});

httpsServer.listen(config.sslPort, (a) => {
    console.log(`HTTPS | ${config.serverName} listening on port ${config.sslPort}!`)
});



