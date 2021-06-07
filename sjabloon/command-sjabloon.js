module.exports = {
    // Best practice for the built-in help menu
    name: 'ping',
    commands: ['p'],
    
    category: 'Fun & Games',
    description: 'Replies with "Pong"!',

    minArgs: 0,
    maxArgs: 0,
    expectedArgs: '',

    permissions: ['ADMINISTRATOR'],

    cooldown: '60s',
    globalCooldown: '10m',
    
    // Invoked when the command is actually ran
    callback: ({ message, channel, args, text, client, prefix, instance, interaction }) => {
        message.reply("Pong!")
    }
}