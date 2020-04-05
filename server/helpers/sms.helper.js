const simpleGet = require('simple-get')

let sendSms = (sendTo, userId, otp) => {
    console.log(`Sms Helper Says ===============> http://cloud.smsindiahub.in/vendorsms/pushsms.aspx?user=09970905608&password=09970905608&msisdn=${sendTo},&sid=FRUTUM&msg=${otp}&fl=0&gwid=2`)
    simpleGet(`http://cloud.smsindiahub.in/vendorsms/pushsms.aspx?user=09970905608&password=09970905608&msisdn=${sendTo},&sid=FRUTUM&msg=Hello Mr/Ms ${userId}, Welcome to E-Insurance App, your OTP is : ${otp}&fl=0&gwid=2`, function (err, res) {
        if (err) throw err
        console.log(res.statusCode) // 200 918087777708
        res.pipe(process.stdout) // `res` is a stream
    })
}

module.exports = { sendSms };