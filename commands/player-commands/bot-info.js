const { MessageEmbed } = require('discord.js')
const { version } = require('@root/package.json')

module.exports = {
    // Best practice for the built-in help menu
    commands: ['Bot Info', 'botinfo', 'bot-info'],
    
    category: 'Player Commands',
    description: 'Displays bot information',

    minArgs: 0,
    maxArgs: 0,
    expectedArgs: '',
    
    // Invoked when the command is actually ran
    callback: async ({ message, channel, args, text, client, prefix, instance, interaction }) => {
        let totalMembers = 0
    for (const guild of client.guilds.cache) {
        totalMembers += (await guild[1].members.fetch()).size
    }        
        const embed = new MessageEmbed()
            .setAuthor(`Information about the ${client.user.username} Bot`, client.user.displayAvatarURL())
            .addFields({
                name: 'Bot tag',
                value: client.user.tag, 
                inline: true
            }, {
                name: 'Version',
                value: version, 
                inline: true
            }, {
                name: '\u200b',
                value: '\u200b',
                inline: true
            }, {
                name: "Server's command prefix",
                value: prefix,
                inline: true
            }, {
                name: 'Time since last restart',
                value: `${process.uptime().toFixed(2)}s`, 
                inline: true
            }, {
                name: '\u200b',
                value: '\u200b',
                inline: true
            }, {
                name: "Server count",
                value: client.guilds.cache.size,
                inline: true
            }, {
                name: 'Total members',
                value: totalMembers,
                inline: true
            }, {
                name: '\u200b',
                value: '\u200b',
                inline: true
            })
        message.channel.send(embed)
    }
}