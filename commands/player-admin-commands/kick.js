const punishmentLogSchema = require('@schemas/punishment-log-schema')

module.exports = {
    name: 'kick',
    commands: 'kick',
    category: 'Player Admin Commands',
    description: 'Kicks the player from the server',
    minArgs: 2,
    expectedArgs: "<Target user's @> <reason>",
    callback: async ({message, args}) => {
        const { member, mentions } = message
        
        const tag = `<@${member.id}>`

        const target = mentions.users.first()
            if (target) {
                const targetMember = message.guild.members.cache.get(target.id)
                targetMember.kick()
                message.channel.send(`${tag} That user has been kicked.`)
            } else {
                message.channel.send(`${tag} Please specify someone to kick.`)
            }

        const guildId = message.guild.id 
        const userId = target.id

        await new punishmentLogSchema({
            guildId,
            userId,
            command: message.content
        }).save()
    }
}