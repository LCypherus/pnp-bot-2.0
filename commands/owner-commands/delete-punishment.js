const punishmentLogSchema = require('@schemas/punishment-log-schema')

module.exports = {
    name: 'delete-punishment',
    commands: ['delpun'],
    category: 'Owner Commands',
    description: 'Removes a punishment from a player',
    minArgs: 2,
    expectedArgs: "<Target user's @> <whole punishment>",
    permissions: ['ADMINISTRATOR'],
    callback: async ({message, args}) => {
        const target = message.mentions.users.first()
        if (!target) {
            message.reply('Please specify someone to remove a punish from.')
            return
        }

        args.shift()

        const guild = message.guild.id 
        const user = target.id
        const punishCommand = args.join(' ')

        return await punishmentLogSchema.findOneAndDelete({
            guildId: guild,
            userId: user,
            command: punishCommand
        }).then(deletedPunishment => {
            if(deletedPunishment) {
                message.reply(`I successfully deleted the punishment you requested.`)
            } else {
                message.reply("No punishment matches the provided query.")
            }
            return deletedPunishment
          })
    }
}