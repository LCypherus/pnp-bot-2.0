module.exports = {
    commands: ['Delete channel', 'deletechannel', 'delete-channel'],
    category: 'Moderator Commands',
    description: 'Deletes the current channel.',
    maxArgs: 0,
    callback: ({message}) => {
        let filter = m => m.author.id === message.author.id
        message.channel.send(`Are you sure to delete this channel? \`YES\` / \`NO\``).then(() => {
            message.channel.awaitMessages(filter, {
                max: 1,
                time: 30000,
                errors: ['time']
            })
            .then(message => {
                message = message.first()
                if (message.content.toUpperCase() == 'YES' || message.content.toUpperCase() == 'Y') {
                    message.channel.delete()
                } else if (message.content.toUpperCase() == 'NO' || message.content.toUpperCase() == 'N') {
                    message.channel.send(`Terminated`)
                } else {
                    message.channel.send(`Terminated: Invalid Response`)
                }
            })
            .catch(collected => {
                message.channel.send('Timeout');
            });
        })
    },
}