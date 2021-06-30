const welcomeSchema = require('@schemas/welcome-schema')

module.exports = {
    commands: ['Set welcome message', 'setwelcome', 'set-welcome'],
    
    category: 'Admin Commands',
    description: 'Sets the welcome message',

    maxArgs: -1,
    expectedArgs: '<welcome message>',

    permissions: ['ADMINISTRATOR'],
    
    callback: async ({ message, text, client }) => {
        const guildId = message.guild.id 
        const channelId = message.channel.id

        await welcomeSchema.findOneAndUpdate({
            _id: guildId
        }, {
            _id: guildId,
            channelId: channelId,
            text,
        }, {
            upsert: true
        })

        message.channel.send('Your welcome message has been updated.')
    }
}
