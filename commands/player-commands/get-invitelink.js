const Discord = require('discord.js');
const commandInvitelinkSchema = require('@schemas/command-invitelink-schema')

module.exports = {
    commands: ['Get invitelink', 'invitelink', 'get-invitelink'],
    
    category: 'Player Commands',
    description: 'Receive this server\'s invite link.',

    minArgs: 0,
    maxArgs: 0,
    
    callback: async ({ message }) => {
        const { guild } = message
        const result = await commandInvitelinkSchema.findOne({ _id: guild.id })
        const invitelink = result.invitelink

        message.channel.send(`https://discord.gg/${invitelink}`)
    }
}