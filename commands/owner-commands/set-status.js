const botStatusSchema = require('@schemas/bot-status-schema');

module.exports = {
    name: 'set-status',
    commands: ['set-status', 'status'],
    category: 'Owner Commands',
    description: 'Set the bot status to the argument.',
    minArgs: 1,
    maxArgs: -1,
    expectedArgs: '<bot\'s status>',
    permissions: ['ADMINISTRATOR'],
    
    callback: async ({ message, channel, args, text, client, prefix, instance, interaction }) => {
        const guildId = message.guild.id
        const status = text
        
        await botStatusSchema.findOneAndUpdate({
            _id: guildId
        }, {
            _id: guildId,
            status,
        }, {
            upsert: true
        })
    }
}


