const muteSchema = require('@schemas/mute-schema');

const reasons = {
    SPAMMING: 5,
    ADVERTISING: 24,
}

module.exports = {
    // Best practice for the built-in help menu
    commands: ['Mute', 'mute'],
    
    category: 'Moderator Commands',
    description: 'Mutes the tagged user.',

    minArgs: 2,
    maxArgs: 2,
    expectedArgs: "<target user\'s @> <reason>",
    
    // Invoked when the command is actually ran
    callback: async ({ message, channel, args, text, client, prefix, instance, interaction }) => {
        const { guild, author: staff } = message;

        const target = message.mentions.users.first()
        if (!target) {
            message.reply('Please specify some one to mute.')
        }

        const reason = args[1].toUpperCase()
        if (!reasons[reason]) {
            let validReasons = ''
            for (const key in reasons) {
                validReasons += `${key}, `
            }
            validReasons = validReasons.substr(0, validReasons.length - 2)

            message.reply(`Unknown reason, please use on of the following= ${validReasons}`)
            return
        }

        const previousMutes = await muteSchema.find({ 
            userId: target.id
        })

        const currentlyMuted = previousMutes.filter(mute => {
            return mute.current === true
        })

        if (currentlyMuted.length) {
            message.reply('That user is already muted.')
            return
        }

        let duration = reasons[reason] * (previousMutes + 1)

        const expires = new Date()
        expires.setHours(expires.getHours() + duration)

        const mutedRole = guild.roles.cache.find(role => {
            return role.name === 'Muted'
        })
        if (!mutedRole) {
            message.reply('Could not find a Muted role.')
            return
        }

        const targetMember = (await guild.members.fetch()).get(target.id)
        targetMember.roles.add(mutedRole)

        await new muteSchema({ 
            guildId: message.guild.id,
            userId: target.id,
            reason, 
            staffId: staff.id,
            staffTag: staff.tag,
            expires,
            current: true
        }).save()

        message.reply(`You muted <@${target.id} for "${reason}". They will be unmuted in ${duration} hours.`)
    }
}