const Discord = require('discord.js')
const ticketAdminSchema = require('@schemas/ticket-admin-schema');

module.exports = {
    // Best practice for the built-in help menu
    commands: ['Ticket adminsOnly', 'adminsonly', 'ticket-adminsonly'],
    
    category: 'Player Commands',
    description: 'Makes a ticket admins only',
    minArgs: 0,
    
    // Invoked when the command is actually ran
    callback: async ({ message }) => {
        const { guild } = message
        const creator = message.author.username
        const result = await ticketAdminSchema.findOne({ guildId: guild.id })
        const cat = result.categoryId
        const adminRole = result.adminRoleId
        const moderatorRole = result.moderatorRoleId

        if (message.channel.parent.id === cat) {
            message.channel.overwritePermissions(
                [
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
            );
            message.channel.setName("AdminsOnly Ticket by " + creator);
        } else {
            message.reply("Your not in the correct category. The adminsOnly command only works in ticket channels.")
        }
    }
}

