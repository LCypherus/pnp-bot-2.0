const { MessageEmbed } = require('discord.js')
const { version } = require('@root/package.json')

module.exports = {
    // Best practice for the built-in help menu
    commands: ['User Info', 'userinfo', 'user-info'],
    
    category: 'Player Commands',
    description: 'Displays user information',

    minArgs: 0,
    maxArgs: 1,
    expectedArgs: "none or <target's @>",
    
    // Invoked when the command is actually ran
    callback: async ({ message, channel, args, text, client, prefix, instance, interaction }) => {
        const { guild } = message

        const user = message.mentions.users.first() || message.member.user
        const member = guild.members.cache.get(user.id)
         
        const embed = new MessageEmbed()
            .setAuthor(`User info for ${user.username}`, user.displayAvatarURL())
            .addFields({ 
                name: 'user tag',
                value: user.tag, 
                inline: true
            }, { 
                name: 'is bot',
                value: user.bot, 
                inline: true
            }, {
                name: '\u200b',
                value: '\u200b',
                inline: true
            }, {
                name: 'Nickname',
                value: member.nickname || 'None', 
                inline: true
            }, {
                name: 'Role count',
                value: member.roles.cache.size - 1, 
                inline: true
            }, {
                name: '\u200b',
                value: '\u200b',
                inline: true
            }, {
                name: 'Joined Server',
                value: new Date(member.joinedTimestamp).toLocaleDateString(), 
                inline: true
            }, {
                name: 'Joined Discord',
                value: new Date(user.createdTimestamp).toLocaleDateString(), 
                inline: true
            }, {
                name: '\u200b',
                value: '\u200b',
                inline: true
            })
            
        message.channel.send(embed)
    }
}