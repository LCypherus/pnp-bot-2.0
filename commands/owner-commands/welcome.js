const welcomeSchema = require('@schemas/welcome-schema')

module.exports = {
    name: 'set-welcome',
    commands: ['setwelcome'],
    
    category: 'Owner Commands',
    description: 'Sets the welcome message',

    maxArgs: -1,
    expectedArgs: '<welcome message>',

    permissions: ['ADMINISTRATOR'],
    
    callback: async ({ message, text }) => {
        const cache = {}
        
        const guildId = message.guild.id 
        const channelId = message.channel.id

        cache[guildId] = [channelId, text]

        await welcomeSchema.findOneAndUpdate({
            _id: guildId
        }, {
            _id: guildId,
            channelId: channelId,
            text,
        }, {
            upsert: true
        })
    }
}