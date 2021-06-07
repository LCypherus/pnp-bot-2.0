const punishmentLogSchema = require('@schemas/punishment-log-schema')

module.exports = {
    name: 'warn',
    commands: 'warn',
    category: 'Player Admin Commands',
    description: 'Gives the player a warning',
    minArgs: 2,
    expectedArgs: "<Target user's @> <reason>",
    callback: async ({message, args}) => {
        const target = message.mentions.users.first()
        if (!target) {
            message.reply('Please specify someone to warn.')
            return
        }

        args.shift()

        const guildId = message.guild.id 
        const userId = target.id
        const reason = args.join(' ')

        const warning = {
            author: message.member.user.tag,
            timestamp: new Date().getTime(),
            reason,
        }

        await new punishmentLogSchema({
            guildId,
            userId,
            command: message.content
        }).save()
    }
}