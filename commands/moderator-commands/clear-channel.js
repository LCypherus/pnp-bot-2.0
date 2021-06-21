module.exports = {
    commands: ['Clear channel', 'cc', 'clear-channel'],
    description: 'Clears a channel from the number of messages written in the argument.',
    category: 'Moderator Commands',
    maxArgs: 1,
    expectedArgs: '<Number of messages to delete>',
    
    // Invoked when the command is actually ran
    callback: ({ message, args }) => {
        const number = parseInt(args)

        message.channel.bulkDelete(number)
    }
}