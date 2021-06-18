const ticketAdminSchema = require('@schemas/ticket-admin-schema')

module.exports = {
    // Best practice for the built-in help menu
    name: 'ticket-admin',
    commands: ['ticket-admin', 'ticketadmin', 'addticketadmin'],
    category: 'Owner Commands',
    description: 'Sets the parent category for the ticket system.',
    minArgs: 3,
    maxArgs: 3,
    expectedArgs: '<category ID> <admin role Id> <moderator role Id (or admin role second time)',
    permissions: ['ADMINISTRATOR'],
    
    // Invoked when the command is actually ran
    callback: async ({ message, args }) => {
        const { guild } = message
        const categoryId = args[0]
        const adminRoleId = args[1]
        const moderatorRoleId = args[2]

        await ticketAdminSchema.findOneAndUpdate({
            guildId: guild.id, 
        }, {
            guildId: guild.id,
            categoryId,
            adminRoleId,
            moderatorRoleId
        }, {
            upsert: true
        })

        message.reply('Category id set')
    }
}