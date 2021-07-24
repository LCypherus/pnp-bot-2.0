const Discord = require('discord.js')
const ticketAdminSchema = require('@schemas/ticket-admin-schema');

module.exports = {
    // Best practice for the built-in help menu
    commands: ['Start a ticket', 'ticket'],
    
    category: 'Player Commands',
    description: 'Start a ticket to privatly talk to the moderators and/or admins.',

    minArgs: 1,
    maxArgs: 1,
    expectedArgs: '<open> or <adminsOnly> or <newTable> or <advertise>',
    
    // Invoked when the command is actually ran
    callback: async ({ message, args, prefix }) => {
        const type = args[0]
        const { guild } = message
        const result = await ticketAdminSchema.findOne({ guildId: guild.id })
        const cat = result.categoryId
        const adminRole = result.adminRoleId
        const moderatorRole = result.moderatorRoleId
        const creator = message.author.username
        const arguments = message.content.slice(prefix.length).trim().split(/ +/);
	    const command = arguments.shift().toLowerCase();

        let textMain = `Hey <@${message.author.id}>\n\nPlease describe the reasoning for opening this ticket, include any information you think may be relevant such as proof, other third parties and so on.\n\nThe <@&${adminRole}> and the <@&${moderatorRole}> will be with you shortly.\n\nAt any time you can use ${prefix}adminsonly to reform this ticket into an adminsOnly ticket.`;
        let textAdminsOnly = `Hey <@${message.author.id}>\n\nThis is an admins only ticket, meaning only the <@&${adminRole}> will see your messages.\n\nPlease describe the reasoning for opening this ticket, include any information you think may be relevant such as proof, other third parties and so on.\n\nWe will be with you shortly.`;
        let textNewTicket = `Hey <@${message.author.id}>\n\nGreat to see you opened a ticket to start your own table here in Pen and Player RP server. Please answer the questions written below.\n\nThe <@&${adminRole}> and the <@&${moderatorRole}> will be with you shortly.\n\nAt any time you can use ${prefix}adminsonly to reform this ticket into an adminsOnly ticket.`;
        let textAdvertise = `Hey <@${message.author.id}>\n\nThis is an admins only advertisement request ticket, meaning only the <@&${adminRole}> will see your messages.\n\nPlease answer the questions written below.\n\nWe will be with you shortly.`;
        const newTableEmbed = new Discord.MessageEmbed()
        .setColor('#3CA489')
        .setTitle('Questions to start a new table')
        .setThumbnail('https://cdn.discordapp.com/attachments/834882298268221460/840171923093585940/icon.png')
        .setDescription('01. Are you new to DMing?\n02. What format/game do you want to use?\n03. Are you familiar with the format you want to use?\n04. What’s your campaign idea?\n05. How is the campaign going to start?\n06. How many days do you need to start off when your table is created?\n07. How can we help you make your campaign successful to you?\n08. What is the name of your campaign?\n09. Voice or Pbp?\n10. How many players will you handle? ')
        const advertiseEmbed = new Discord.MessageEmbed()
        .setColor('#3CA489')
        .setTitle('Questions to advertise your server')
        .setThumbnail('https://cdn.discordapp.com/attachments/834882298268221460/840171923093585940/icon.png')
        .setDescription('01. Servername?\n02. Invitelink?\n03. What gameformat(s) does the server play?\n04. PbP or Voice?\n05. Server description?\n06. Looking for?')

        if(type == "open") {
            const createdChannel = await message.guild.channels.create("Ticket by " + creator, {
                type: 'text',
                parent: cat,
                permissionOverwrites: [
                    {
                        id: message.guild.roles.everyone, // Everyone
                        deny: ["VIEW_CHANNEL", "SEND_MESSAGES", "READ_MESSAGE_HISTORY"]
                    },
                    {
                        id: message.guild.roles.cache.get(adminRole),
                        allow: ["VIEW_CHANNEL", "SEND_MESSAGES", "READ_MESSAGE_HISTORY"]
                    },
                    {
                        id: message.guild.roles.cache.get(moderatorRole),
                        allow: ["VIEW_CHANNEL", "SEND_MESSAGES", "READ_MESSAGE_HISTORY"]
                    },
                    {
                        id: message.author.id,
                        allow: ["VIEW_CHANNEL", "SEND_MESSAGES", "READ_MESSAGE_HISTORY"]
                    }
                ]
            });
            createdChannel.send(textMain);
        } else if(type == "adminsOnly") {
            const createdChannel = await await message.guild.channels.create("AdminsOnly Ticket by " + creator, {
                type: 'text',
                parent: cat,
                permissionOverwrites: [
                    {
                        id: message.guild.roles.everyone, // Everyone
                        deny: ["VIEW_CHANNEL", "SEND_MESSAGES", "READ_MESSAGE_HISTORY"]
                    },
                    {
                        id: message.guild.roles.cache.get(adminRole), // Grand Master
                        allow: ["VIEW_CHANNEL", "SEND_MESSAGES", "READ_MESSAGE_HISTORY"]
                    },
                    {
                        id: message.author.id,
                        allow: ["VIEW_CHANNEL", "SEND_MESSAGES", "READ_MESSAGE_HISTORY"]
                    }
                ]
            });
            createdChannel.send(textAdminsOnly);
        } else if(type == "advertise") {
            const createdChannel = await await message.guild.channels.create("Advertise request by " + creator, {
                type: 'text',
                parent: cat,
                permissionOverwrites: [
                    {
                        id: message.guild.roles.everyone, // Everyone
                        deny: ["VIEW_CHANNEL", "SEND_MESSAGES", "READ_MESSAGE_HISTORY"]
                    },
                    {
                        id: message.guild.roles.cache.get(adminRole), // Grand Master
                        allow: ["VIEW_CHANNEL", "SEND_MESSAGES", "READ_MESSAGE_HISTORY"]
                    },
                    {
                        id: message.author.id,
                        allow: ["VIEW_CHANNEL", "SEND_MESSAGES", "READ_MESSAGE_HISTORY"]
                    }
                ]
            });
            createdChannel.send(textAdvertise);
            createdChannel.send(advertiseEmbed);
        } else if(type == "newTable") {
            const createdChannel = await message.guild.channels.create("Newtable Ticket by " + creator, {
                type: 'text',
                parent: cat,
                permissionOverwrites: [
                    {
                        id: message.guild.roles.everyone, // Everyone
                        deny: ["VIEW_CHANNEL", "SEND_MESSAGES", "READ_MESSAGE_HISTORY"]
                    },
                    {
                        id: message.guild.roles.cache.get(adminRole),
                        allow: ["VIEW_CHANNEL", "SEND_MESSAGES", "READ_MESSAGE_HISTORY"]
                    },
                    {
                        id: message.guild.roles.cache.get(moderatorRole),
                        allow: ["VIEW_CHANNEL", "SEND_MESSAGES", "READ_MESSAGE_HISTORY"]
                    },
                    {
                        id: message.author.id,
                        allow: ["VIEW_CHANNEL", "SEND_MESSAGES", "READ_MESSAGE_HISTORY"]
                    }
                ]
            });
            createdChannel.send(textNewTicket);
            createdChannel.send(newTableEmbed);
        } else {
            message.channel.send(`Please use one of the following commands: ${prefix}${command}, ${prefix}${command} adminsOnly or ${prefix}${command} newTable.`);
        }

        await message.delete({ timeout: 3000 })
    }
}