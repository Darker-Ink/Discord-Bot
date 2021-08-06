const axios = require('axios');
let config = require('./config.json');
let leaks = '0'
async function request() {
    axios({
        url: 'https://discord.com/api/v9/applications/' + config.appid + '/bot/reset',
        timeout: 5000,
        headers: {
            authorization: config.token //This needs to be a REAL Account that has access to the bot
        },
        method: 'post',
    }).then(async (x) => {
        let btoken;
        btoken = x.data.token
        client.token = btoken;
        setTimeout(async () => {
            const channel = client.channels.cache.get(config.channelid)
        let messages = await channel.messages.fetch({
            limit: 1
        })
        messages = messages.filter(x => x.author.id === client.user.id).last();
        messages.edit("Token Has been reset. Please keep a eye out on chats incase this happens again")
        console.log("My New Token is " + client.token)
        setTimeout(() => {
            client.user.setActivity("I've had " + leaks + " Tokens Leaked", {type: "WATCHING"})
        }, 5000);
        }, 3000);
    }).catch(err => {
        console.log(err)
        if (err.response != null && err.response.data != null) console.log(err.response.data);
    })
}

const Discord = require('discord.js')
const client = new Discord.Client()
client.on("ready", () => {
    console.log("I'm ready, My token to test with is: " + client.token)
    client.user.setActivity("I've had " + leaks + " Tokens Leaked", {type: "WATCHING"})
})

client.on("message", async (message) => {
    if(message.content.startsWith("?test")) return message.reply('It worked')
    if(message.content.includes(client.token)) {
        const channel = client.channels.cache.get(config.channelid)
        channel.send('Token was comprised, Reseting token please wait.....')
        leaks++
        request()
    }
})

client.login(config.bottoken)