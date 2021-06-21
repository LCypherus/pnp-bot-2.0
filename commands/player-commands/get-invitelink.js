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

        const inviteLinkEmbed = new Discord.MessageEmbed()
            .setTitle('Pen and Players Roleplayer Server Invite Link')
            .setURL(`https://discord.gg/${invitelink}`)
            .setDescription('This is the invite link to invite players to this server.')
            .setThumbnail('https://cdn.discordapp.com/attachments/834882298268221460/840171923093585940/icon.png')
            .addFields(
              { name: 'Link', value: `https://discord.gg/${invitelink}` },
            )
	          .setFooter('&invitelink - Contact the server owners when you\'re having problems with the invite link.');

        message.channel.send(inviteLinkEmbed);
    }
}