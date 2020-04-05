const mqtt = require('mqtt')
const conString = 'mqtt://35.200.197.238:8091'
var client = mqtt.connect(conString)
console.log("Waiting on ", conString)
client.on('connect', function () {
    console.log("Now I can see")
    client.subscribe('+')
})

client.on('message', function (topic, message) {
    // message is Buffer
    let msg = message.toString()
    try {
        msg = JSON.parse(msg)
    } catch (error) {

    }
    console.log(`MQTT pub | ${new Date()} | [ ${msg.channelId} ] | ${JSON.stringify(msg)}`)
    //client.end()
    //saveChat(msg)
    saveToJSONServer(msg)
})
saveChat = function (context) {
    new communicationModel(helper.buildIDs(context)).save((me, md) => {
        console.log(">>> saved msg", me, md)
    });
};




/* LowDB - JSON DB */

const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')

const adapter = new FileSync('db.json')
const db = low(adapter)

saveToJSONServer = (msg) => {
    /* db.get('messages')
        .push(msg)
        .write() */
}
