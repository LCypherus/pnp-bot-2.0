module.exports = {
    // Best practice for the built-in help menu
    commands: ['Simulate Join', 'simjoin'],
    
    category: 'Admin Commands',
    description: 'Simulates a new player joining the server.',

    permissions: ['ADMINISTRATOR'],
    
    // Invoked when the command is actually ran
    callback: ({ message, channel, args, text, client, prefix, instance, interaction }) => {
        client.emit('guildMemberAdd', message.member)
    }
}