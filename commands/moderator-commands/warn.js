const punishmentLogSchema = require('@schemas/punishment-log-schema')

module.exports = {
    commands: ['Warn', 'warn'],
    category: 'Moderator Commands',
    description: 'Gives the player a warning',
    minArgs: 2,
    expectedArgs: "<target user's @> <reason>",
    callback: async ({message, args}) => {
        const target = message.mentions.users.first()
        if (!target) {
            message.reply('Please specify someone to warn.')
            return
        }

        const guildId = message.guild.id 
        const userId = target.id

        const warn = await new punishmentLogSchema({
            guildId,
            userId,
            command: message.content
        }).save()

        if(warn) {
            message.reply(`I successfully added the warn to ${target}.`)
        } else {
            message.reply(`I failed to add the warn to ${target}`)
        }
    }
}