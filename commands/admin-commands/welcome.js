const welcomeSchema = require('@schemas/welcome-schema')

module.exports = {
    commands: ['Set welcome message', 'setwelcome', 'welcome'],
    
    category: 'Admin Commands',
    description: 'Sets the welcome message',

    maxArgs: -1,
    expectedArgs: '<welcome message>',

    permissions: ['ADMINISTRATOR'],
    
    callback: async ({ message, text, client }) => {
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

        message.channel.send('Your welcome message has been updated.')

        client.on("guildMemberAdd", async (member) => {
            const { guild } = member
    
            let data = cache[guild.id]
    
            if (!data) {
                console.log('FETCHING FROM DATABASE')
    
                const result = await welcomeSchema.findOne({ _id: guild.id })
    
                cache[guild.id] = data = [result.channelId, result.text]
            }
    
            const channelId = data[0]
            const text = data[1]
    
            const channel = guild.channels.cache.get(channelId)
            channel.send(text.replace(/<@>/g, `<@${member.id}>`))
        })
    }
}

module.exports.config = {
    // The display name that server owners will see.
    // This can be changed at any time.
    displayName: 'Welcome Message',
    
    // The name the database will use to set if it is enabled or not.
    // This should NEVER be changed once set, and users cannot see it.
    dbName: 'WELCOME MESSAGE',
    
    // Being true means a database connection must be present before the
    // feature is enabled.
    loadDBFirst: true
}
