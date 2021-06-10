const createTableSchema = require('@schemas/createtable-schema')

module.exports = {
    // Best practice for the built-in help menu
    name: 'createtable',
    commands: ['createtable'],
    
    category: 'Channel Admin Commands',
    description: 'Create a table with role, category and channels',

    minArgs: 1,
    expectedArgs: '<shortname of game>', // <dm\'s username#xxxx> <tablename>
    
    // Invoked when the command is actually ran
    callback: async ({ message, args }) => {
        const gamename = await createTableSchema.findOne({
            guildId: message.guild.id,
            shortName: args[0]
        })

        const finalShortName = gamename.shortName
        const finalLongName = gamename.longName

        console.log(finalShortName, finalLongName)
    }
}