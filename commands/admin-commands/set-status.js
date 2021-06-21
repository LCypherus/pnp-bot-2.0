module.exports = {
    commands: ['Set status', 'status', 'set-status'],
    category: 'Admin Commands',
    description: 'Set the bot status to the argument.',
    minArgs: 1,
    maxArgs: -1,
    expectedArgs: '<bot\'s status>',
    permissions: ['ADMINISTRATOR'],
    
    callback: async ({ text, client }) => {
        
        client.user.setPresence({
            activity: {
                name: text,
                type: 'WATCHING',
            },
        })
    }
}


