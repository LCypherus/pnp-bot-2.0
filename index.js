require('module-alias/register')
const CronJob = require('cron').CronJob;

const DiscordJS = require('discord.js')
const client = new DiscordJS.Client({
    // Use recommended partials for the built-in help menu
    partials: ['MESSAGE', 'REACTION']
})
const WOKCommands = require('wokcommands')

require('dotenv').config();

client.on('ready', () => {
    console.log('The client is ready!');

    const wok = new WOKCommands(client, {
        commandsDir: 'commands',
        featuresDir: 'features',
        messagesPath: 'messages.json',
        showWarns: true,
        del: -1,
        ignoreBots: false,
        dbOptions: {
            keepAlive: true,
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
        },
        disabledDefaultCommands: [
            'language',
            'menu',
        ]
    })

    .setDisplayName('P&P Bot 2.0')
    .setDefaultPrefix('&')
    .setMongoPath(process.env.MONGODB)

    wok.on('databaseConnected', (connection, state) => {
        console.log(`The connection state to Mongo is "${state}"`)
    })
})

client.login(process.env.BOTTOKEN);