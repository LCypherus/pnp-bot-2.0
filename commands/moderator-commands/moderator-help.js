const Discord = require('discord.js');
const paginationEmbed = require('discord.js-pagination');

module.exports = {
    commands: ['Moderator help', 'moderatorhelp', 'modhelp', 'moderator-help'],
    category: 'Moderator Commands',
    description: 'List all commands for the server a moderator can use.',
    maxArgs: 0,
    
    // Invoked when the command is actually ran
    callback: ({ message, channel, args, text, client, prefix, instance, interaction }) => {
        // Make player commands array
        let playerCommands = []
        
        instance.commandHandler.commands.forEach((command) => {
            if( command.category == "Player Commands"){
                playerCommands.push(command)
            }
        })

        textPlayerCommands = `These are all **Player Commands**: \n\n`

        for (let i = 0; i < playerCommands.length; i++) {
            textPlayerCommands += `**---------- ${playerCommands[i].names[0]} ----------** \n **Description: **${playerCommands[i].description} \n **Command: **${prefix}${playerCommands[i].names[1]} ${playerCommands[i].syntax} \n\n`;
        }

        const playerCommandsEmbed = new Discord.MessageEmbed()
            .setColor(message.guild.me.displayHexColor)
            .setAuthor(`${prefix}moderatorhelp - Requested by ${message.author.username}`, message.author.displayAvatarURL())
            .setTitle(`${client.user.username} Admins Help Menu`)
            .setDescription(textPlayerCommands)
            .setThumbnail(client.user.displayAvatarURL())
            .setTimestamp();

        // Make channel moderator commands array
        let ModeratorCommands = []
        
        instance.commandHandler.commands.forEach((command) => {
            if( command.category == "Moderator Commands"){
                ModeratorCommands.push(command)
            }
        })

        textModeratorCommands = `These are all **Moderator Commands**: \n\n`

        for (let i = 0; i < ModeratorCommands.length; i++) {
            textModeratorCommands += `**---------- ${ModeratorCommands[i].names[0]} ----------** \n **Description: **${ModeratorCommands[i].description} \n **Command:** ${prefix}${ModeratorCommands[i].names[1]} ${ModeratorCommands[i].syntax} \n\n`;
        }

        const ModeratorCommandsEmbed = new Discord.MessageEmbed()
        .setColor(message.guild.me.displayHexColor)
        .setAuthor(`${prefix}moderatorhelp - Requested by ${message.author.username}`, message.author.displayAvatarURL())
        .setTitle(`${client.user.username} Admins Help Menu`)
        .setDescription(textModeratorCommands)
        .setThumbnail(client.user.displayAvatarURL())
        .setTimestamp();

        pages = [playerCommandsEmbed, ModeratorCommandsEmbed];

        paginationEmbed(message, pages);
    }
}