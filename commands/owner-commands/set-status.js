module.exports = {
    name: 'set-status',
    commands: ['set-status', 'status'],
    category: 'Owner Commands',
    description: 'Set the bot status to the argument.',
    minArgs: 1,
    maxArgs: -1,
    expectedArgs: '<bot\'s status>',
    permissions: ['ADMINISTRATOR'],
    
    callback: async ({ text, client }) => {
        
        client.user.setPresence({
            activity: {
                name: text,
                type: 0,
            },
        })
    }
}


