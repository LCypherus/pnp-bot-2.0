const muteSchema = require('@schemas/mute-schema');
const punishmentLogSchema = require('@schemas/punishment-log-schema')

const allDurations = {
    1: 24,
    2: 48,
    3: 72,
    4: 96,
    5: 120,
    6: 144,
    7: 168,
}

module.exports = {
    // Best practice for the built-in help menu
    commands: ['Mute', 'mute'],
    
    category: 'Moderator Commands',
    description: 'Mutes the tagged user.',

    minArgs: 3,
    maxArgs: -1,
    expectedArgs: "<target user\'s @> <\# of days> <reason>",
    
    // Invoked when the command is actually ran
    callback: async ({ message, args }) => {
        const { guild, author: staff } = message;

        const target = message.mentions.users.first()
        if (!target) {
            message.reply('Please specify some one to mute.')
        }

        const oneDuration = args[1]
        if (!allDurations[oneDuration]) {
            let validReasons = ''
            for (const key in allDurations) {
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

        let duration = allDurations[oneDuration] * (previousMutes.length + 1)

        const reason = args.slice(2).join(" ")

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
            duration: oneDuration,
            reason, 
            staffId: staff.id,
            staffTag: staff.tag,
            expires,
            current: true
        }).save()

        await new punishmentLogSchema({
            guildId: message.guild.id,
            userId: target.id,
            command: message.content,
            staffId: staff.id,
            staffTag: staff.tag,
        }).save()

        message.reply(`You muted <@${target.id}> for "${oneDuration} days(s)". The reason is "${reason}".`)
    }
}