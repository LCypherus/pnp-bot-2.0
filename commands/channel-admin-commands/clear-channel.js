module.exports = {
    // Best practice for the built-in help menu
    name: 'clear-channel',
    commands: ['clearchannel', 'cc'],
    description: 'Clears a channel from all messages.',
    category: 'Channel Admin Commands',
    minArgs: 0,
    maxArgs: 0,
    
    // Invoked when the command is actually ran
    callback: ({ message }) => {
        message.channel.messages.fetch().then((results) => {
            message.channel.bulkDelete(results)
        })
    }
}