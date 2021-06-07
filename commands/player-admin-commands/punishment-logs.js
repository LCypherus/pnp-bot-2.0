const Discord = require('discord.js')
const punishmentLogSchema = require('@schemas/punishment-log-schema')

module.exports = {
    name: 'punishment-logs',
    commands: ['punishmentlogs', 'punishlogs', 'pl'],
    category: 'Player Admin Commands',
    description: 'View the players punishment logs',
    minArgs: 1,
    maxArgs: 1,
    expectedArgs: "<Target user's @>",
    callback: async ({message}) => {
        const target = message.mentions.users.first()
        if (!target) {
            message.reply('Please specify someone to load punishments for.')
            return
        }

        const { guild } = message
        const { id } = target

        const results = await punishmentLogSchema.find({
            guildId: guild.id,
            userId: id
        })

        let reply = ''

        for (const result of results) {
            reply += `**${result.command}** was ran at ${new Date(result.createdAt).toLocaleDateString()}\n`
        }

        const punishmentLogEmbed = new Discord.MessageEmbed()
            .setTitle(`${target.username}'s punishments log`)
            .setDescription(reply)
            .setTimestamp();

            message.reply(punishmentLogEmbed);
    }
}