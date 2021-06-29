module.exports = {
    // Best practice for the built-in help menu
    commands: ['Simulate Leave', 'simleave'],
    
    category: 'Admin Commands',
    description: 'Simulates a player leaving the server.',

    permissions: ['ADMINISTRATOR'],
    
    // Invoked when the command is actually ran
    callback: ({ message, channel, args, text, client, prefix, instance, interaction }) => {
        client.emit('guildMemberLeave', message.member)
    }
}