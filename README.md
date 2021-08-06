# Discord Bot

This allows your to check how many time a user boosted your server, feel free to use that in your code.

## Note:
- This might be considered self-botting which is against Discord's Terms of service, this might seem harmless but  nonetheless use at your own risk

## Setup:
- Clone the repo.
- configure the application (`config.json`)
- Install Node Packages. (`npm i`)
- run the app! `node index.js`

## Config:

### token:
<br>

This field is for your Discord **User** token, a bot token simply won't work.
> *note:* The user must have administrator access.


### channelid:
<br>

Channel ID the bot will send messages in when its token gets comprised.

### appid:
<br>

App ID the ID of your bot.
> *note:* The use account in use must have access to the bot, I recommend that you Use a Team.


### bottoken:
<br>

The Token the Bot uses to login the first time
> *note:* If the token gets comprised and the code/bot goes down you will have to replace it.