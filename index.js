require('module-alias/register')

const DiscordJS = require('discord.js')
const client = new DiscordJS.Client({
    // Use recommended partials for the built-in help menu
    partials: ['MESSAGE', 'REACTION']
})
const WOKCommands = require('wokcommands')

require('dotenv').config();

client.on('ready', () => {
    console.log('The client is ready!')

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
            'command',
            'language',
        ]
    })

    .setDisplayName('P&P Bot 2.0')
    .setDefaultPrefix('?')
    .setColor('#3CA489')
    .setMongoPath(process.env.MONGODB)
    .setCategorySettings([
        {
            name: 'Player Commands',
            emoji: '📲'
        },
        {
            name: 'Player Admin Commands',
            emoji: '👨‍💻'
        },
        {
            name: 'Channel Admin Commands',
            emoji: '🖥'
        },
        {
            name: 'Coding Commands',
            emoji: '🛠',
            hidden: true
        },
        {
            name: 'Development',
            emoji: '🚧',
            hidden: true
        }
    ])

    wok.on('databaseConnected', (connection, state) => {
        console.log(`The connection state to Mongo is "${state}"`)
    })
})

client.login(process.env.BOTTOKEN);