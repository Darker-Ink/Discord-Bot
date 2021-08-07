const axios = require('axios');
let config = require('./config.json');
fs = require('fs');

let resetToken = async (client, leaks) => {
    axios({
        url: 'https://discord.com/api/v9/applications/' + config.appid + '/bot/reset',
        timeout: 5000,
        headers: {
            authorization: config.usertoken
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
            fs.writeFile('.env', 'TOKEN=' + client.token, function(err) {
                if (err) return console.log(err);
                console.log('wrote token to .env');
            });
            messages.edit("Token Has been reset. Please keep a eye out on chats incase this happens again")
            setTimeout(() => {
                client.user.setActivity("I've had " + leaks + " Tokens Leaked", {
                    type: "WATCHING"
                })
            }, 5000);
        }, 3000);
    }).catch(err => {
        console.log(err)
        if (err.response != null && err.response.data != null) console.log(err.response.data);
    })
}

module.exports.resetToken = resetToken;