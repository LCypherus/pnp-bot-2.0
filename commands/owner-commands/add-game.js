const createTableSchema = require('@schemas/createtable-schema')

module.exports = {
    name: 'add-game',
    commands: ['addgame'],
    category: 'Owner Commands',
    description: 'Add\'s a new game to the gameslist',
    minArgs: 2,
    expectedArgs: "<shortname> <longname>",
    callback: async ({message, args}) => {
        const guildId = message.guild.id 
        const shortName = args[0]
        const longName = args.slice(1).join(" ")

        const games = await new createTableSchema({
            guildId,
            shortName,
            longName
        }).save()

        if(games) {
            message.reply(`I successfully added the ${longName} to the system with ${shortName} as shortname.`)
        } else {
            message.reply(`I failed to add the game.`)
        }
    }
}