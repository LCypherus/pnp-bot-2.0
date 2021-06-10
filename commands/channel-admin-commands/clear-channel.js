module.exports = {
    name: 'clear-channel',
    commands: ['clearchannel', 'cc'],
    description: 'Clears a channel from the number of messages written in the argument.',
    category: 'Channel Admin Commands',
    maxArgs: 1,
    expectedArgs: '<Number of messages to delete>',
    
    // Invoked when the command is actually ran
    callback: ({ message, args }) => {
        const number = parseInt(args)

        message.channel.bulkDelete(number)
    }
}