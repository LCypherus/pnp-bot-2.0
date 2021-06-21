const Discord = require('discord.js');
const paginationEmbed = require('discord.js-pagination');

module.exports = {
    commands: ['Admin help', 'adminhelp', 'admin-help'],
    
    category: 'Admin Commands',
    description: 'List all commands for the server',

    minArgs: 0,
    maxArgs: 0,
    permissions: ['ADMINISTRATOR'],
    
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
            .setAuthor(`${prefix}adminhelp - Requested by ${message.author.username}`, message.author.displayAvatarURL())
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
        .setAuthor(`${prefix}adminhelp - Requested by ${message.author.username}`, message.author.displayAvatarURL())
        .setTitle(`${client.user.username} Admins Help Menu`)
        .setDescription(textModeratorCommands)
        .setThumbnail(client.user.displayAvatarURL())
        .setTimestamp();

        // Make admin commands array
        let adminCommands = []
        
        instance.commandHandler.commands.forEach((command) => {
            if( command.category == "Admin Commands"){
                adminCommands.push(command)
            }
        })

        textAdminCommands = `These are all **Admin Commands**: \n\n`

        for (let i = 0; i < adminCommands.length; i++) {
            textAdminCommands += `**---------- ${adminCommands[i].names[0]} ----------** \n **Description: **${adminCommands[i].description} \n **Command:** ${prefix}${adminCommands[i].names[1]} ${adminCommands[i].syntax} \n\n`;
        }
        
        const adminCommandsEmbed = new Discord.MessageEmbed()
        .setColor(message.guild.me.displayHexColor)
        .setAuthor(`${prefix}adminhelp - Requested by ${message.author.username}`, message.author.displayAvatarURL())
        .setTitle(`${client.user.username} Admins Help Menu`)
        .setDescription(textAdminCommands)
        .setThumbnail(client.user.displayAvatarURL())
        .setTimestamp();

        // Make configuration commands array
        textConfigurationCommands = `These are all **Configuration Commands**:

        **---------- Channel only ----------**
        **Description: **Makes a command only work in some channels.
        **Command: **${prefix}channelonly <command name> [Channel tags OR "none"]
        
        **---------- Set prefix ----------**
        **Description: **Displays or sets the prefix for the current guild.
        **Command: **${prefix}prefix [new prefix]
        
        **---------- Required role ----------**
        **Description: **Specifies what role each command requires.
        **Command: **${prefix}requiredrole <command name> <"none" | tagged role>`
        
        const configurationCommandsEmbed = new Discord.MessageEmbed()
        .setColor(message.guild.me.displayHexColor)
        .setAuthor(`${prefix}adminhelp - Requested by ${message.author.username}`, message.author.displayAvatarURL())
        .setTitle(`${client.user.username} Admins Help Menu`)
        .setDescription(textConfigurationCommands)
        .setThumbnail(client.user.displayAvatarURL())
        .setTimestamp();

        pages = [playerCommandsEmbed, ModeratorCommandsEmbed, adminCommandsEmbed, configurationCommandsEmbed];

        paginationEmbed(message, pages);
    }
}