const axios = require('axios');
let config = require('./config.json');
require("dotenv").config()
const { resetToken } = require('./reset.js')

const Discord = require('discord.js')
const client = new Discord.Client()
let leaks = '0'
client.on("ready", () => {
    console.log(client.user.username + " Is ready to go")
    client.user.setActivity("I've had " + leaks + " Tokens Leaked", {
        type: "WATCHING"
    })
})

client.on("message", async (message) => {
    if (message.content.includes(client.token)) {
        message.delete()
        const channel = client.channels.cache.get(config.channelid)
        channel.send('Token was comprised, Reseting token please wait.....')
        leaks++
        resetToken(client, leaks);
    }
})

client.login(process.env.TOKEN)
