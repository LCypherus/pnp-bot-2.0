const disboardChannelSchema = require('@schemas/disboard-channel-schema');

module.exports = {
    commands: ['Set disboard channel', 'setdisboardchannel', 'set-disboard-channel'],
    category: 'Admin Commands',
    description: 'Sets the channel to send the bump messages to.',
    minArgs: 1,
    maxArgs: 1,
    expectedArgs: '<channel id>',
    permissions: ['ADMINISTRATOR'],

    callback: async ({message, text}) => {
        const guildId = message.guild.id
        const disboardChannelArg = text

        if (disboardChannelArg.startsWith('<#')) {
            dChannelArgs = disboardChannelArg.substring(2, disboardChannelArg.length - 1)
        } else {
            dChannelArgs = disboardChannelArg
        }

        console.log(dChannelArgs)

        await disboardChannelSchema.findOneAndUpdate(
            {
                _id: guildId,
            },
            {
                _id: guildId,
                disboardChannel: dChannelArgs,
            },
            {
                upsert: true,
            }
        )

        message.channel.send(`The disboard bump channel for this bot is now ${dChannelArgs}`)
    },
}