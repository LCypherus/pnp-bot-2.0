module.exports = {
    // Best practice for the built-in help menu
    name: 'console',
    commands: ['console'],
    
    category: 'Owner Commands',
    description: 'Logging items in the console.',

    minArgs: 0,
    maxArgs: 1,

    permissions: ['ADMINISTRATOR'],
    
    // Invoked when the command is actually ran
    callback: ({ message, channel, args, text, client, prefix, instance, interaction }) => {
        // console.log(message.guild.name, message.guild.ownerID)

        // message.channel.send(message.guild.icon)

        const target = message.mentions.users.first()
        console.log(target.username)
    }
}