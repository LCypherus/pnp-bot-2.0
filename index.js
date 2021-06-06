const Discord = require('discord.js')
const client = new Discord.Client()
const WOKCommands = require('wokcommands')

require('dotenv').config();

client.on('ready', () => {
    console.log('The client is ready!')

    const wok = new WOKCommands(client, {
        commandsDir: 'commands',
        featuresDir: 'features',
        messagesPath: '',
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
            // 'help',
            // 'command',
            // 'language',
            // 'prefix',
            // 'requiredrole'
        ]
    })

    .setDisplayName('P&P Bot 2.0')
    .setDefaultPrefix('?')
    .setColor('#3CA489')
    .setMongoPath(process.env.MONGODB)
    .setCategorySettings([
        {
            name: 'Math',
            emoji: '🎮'
        },
        {
            name: 'Economy',
            emoji: '💸'
        },
        {
            // You can change the default emojis as well
            // "Configuration" is ⚙ by default
            name: 'Configuration',
            emoji: '🚧',
            // You can also hide a category from the help menu
            // Admins bypass this
            hidden: true
        }
    ])

    wok.on('databaseConnected', (connection, state) => {
        console.log(`The connection state to Mongo is "${state}"`)
    })
})

client.login(process.env.BOTTOKEN);