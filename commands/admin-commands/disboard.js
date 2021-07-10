const CronJob = require('cron').CronJob;
const disboardChannelSchema = require('@schemas/disboard-channel-schema');

module.exports = {
    // Best practice for the built-in help menu
    commands: ['Disboard', 'disboard'],
    category: 'Admin Commands',
    description: 'Starts the disboard cronjob',
    permissions: ['ADMINISTRATOR'],
    
    // Invoked when the command is actually ran
    callback: async ({ message, channel, args, text, client, prefix, instance, interaction }) => {
        const { guild } = message
        const result = await disboardChannelSchema.findOne({ _id: guild.id })
        const disboardChannel = result.disboardChannel
        
        console.log('Before job instantiation');
        const job = new CronJob('*/5 */2 * * *', function() {
            const guild = client.guilds.cache.get(message.guild.id);
            const channel = guild.channels.cache.get(disboardChannel);
            channel.send('!d bump');
        });
        console.log('After job instantiation');
        job.start();
    }
}