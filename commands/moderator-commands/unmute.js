const muteSchema = require('@schemas/mute-schema');

module.exports = {
    commands: ['Unmute', 'unmute'],
    
    category: 'Moderator Commands',
    description: 'Unmutes the tagged user.',

    minArgs: 1,
    maxArgs: 1,
    expectedArgs: "<target user's @> or <target's ID",
    
    // Invoked when the command is actually ran
    callback: async ({ message, channel, args, text, client, prefix, instance, interaction }) => {
        let id = ''
        
        const target = message.mentions.users.first()
        if (target) {
            id = target.id
        } else {
            id = args[0]
        }

        const expires = new Date()

        const result = await muteSchema.updateOne({ 
            guildId: message.guild.id,
            userId: id,
            current: true
        }, {
            current: false,
            expires
        })

        console.log('RESULT:', result)

        if (result.nModified === 1) {
            const mutedRole = message.guild.roles.cache.find(role => {
                return role.name === 'Muted'
            })

            if (mutedRole) {
                const guildMember = message.guild.members.cache.get(id)
                guildMember.roles.remove(mutedRole)
            }
            message.reply(`You unmuted <@${id}>`)

            await muteSchema.findOneAndDelete({
                guildId: message.guild.id,
                userId: id,
                current: false
            })
        } else {
            message.reply('That user is not muted.')
        }
    }
}