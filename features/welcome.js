const welcomeSchema = require('@schemas/welcome-schema')

module.exports = (client, instance) => {
    // Listen for new members joining a guild
    client.on("guildMemberAdd", async (member) => {
        const { guild } = member
  
        const result = await welcomeSchema.findOne({ _id: guild.id })

        const channelId = result.channelId
        const text = result.text

        const channel = guild.channels.cache.get(channelId)
        channel.send(text.replace(/<@>/g, `<@${member.id}>`))
    })
}
  
  // Configuration for this feature
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