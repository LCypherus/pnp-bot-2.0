const botStatusSchema = require('@schemas/bot-status-schema');

module.exports = async (client, instance) => {
    const result = await botStatusSchema.findOne({ _id: guildId })
    const status = result.status
    const guildId = message.guild.id
    
    client.on("wok", () => {
        client.user.setPresence({
            activity: {
                name: status,
                type: 0,
            },
        })
    })
  }
  
  module.exports.config = {
    displayName: 'Bot Status',
    dbName: 'BOT STATUS',
    loadDBFirst: true
  }

