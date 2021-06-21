const createTableSchema = require('@schemas/createtable-schema')

module.exports = {
    commands: ['Add game', 'addgame', 'add-game'],
    category: 'Admin Commands',
    description: 'Add\'s a new game to the gameslist',
    minArgs: 3,
    expectedArgs: "<shortname> <longname>",
    callback: async ({message, args}) => {
        const guildId = message.guild.id
        const gameRoleId = args[0]
        const shortName = args[1]
        const longName = args.slice(2).join(" ")

        const games = await new createTableSchema({
            guildId,
            gameRoleId,
            shortName,
            longName,
        }).save()

        if(games) {
            message.reply(`I successfully added the ${longName} to the system with ${shortName} as shortname with ${gameRoleId} as ID.`)
        } else {
            message.reply(`I failed to add the game.`)
        }
    }
}