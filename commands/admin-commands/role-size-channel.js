const roleSizeSchema = require('@schemas/role-size-schema')
const {fetchChannelData} = require('@features/role-size-channel')

module.exports = {
    // Best practice for the built-in help menu
    commands: ['Role size channel', 'rolesize', 'role-size-channel'],
    category: 'Admin Commands',
    description: 'Enables a channel to count the number in a role or a guild.',
    minArgs: 3,
    maxArgs: -1,
    expectedArgs: '<channel ID> <role ID or "all"> <channel name>',
    permissions: ['ADMINISTRATOR'],
    
    // Invoked when the command is actually ran
    callback: async ({ message, args }) => {
        const { guild } = message
        const channelId = args[0]
        const channel = guild.channels.cache.get(channelId)
        if (!channel || channel.type !== 'voice') {
            message.reply(`You must provide a voice channel id`)
            return
        }

        const roleId = args[1].toLowerCase()
        const role = guild.roles.cache.get(roleId)
        if (roleId !== 'all') {
            if (!role) {
                message.reply(`You must provide either a valid role Id or the word "all" for all guild members.`)
                return
            }
        }

        const channelName = args.slice(2).join(" ")

        console.log(channelName)

        await roleSizeSchema.findOneAndUpdate({
            guildId: guild.id,
            channelId, 
        }, {
            guildId: guild.id,
            channelId, 
            roleId,
            channelName,
        }, {
            upsert: true
        })

        message.reply('Voice channel counter set')

        fetchChannelData()
    }
}