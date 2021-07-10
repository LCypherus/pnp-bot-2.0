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
        function sortOn(property){
            return function(a, b){
                if(a[property] < b[property]){
                    return -1;
                }else if(a[property] > b[property]){
                    return 1;
                }else{
                    return 0;   
                }
            }
        }
        
        // Make player commands array
        let playerCommands = []
        
        instance.commandHandler.commands.forEach((command) => {
            if( command.category == "Player Commands"){
                playerCommands.push(command)
            }
        })

        playerCommands.sort(sortOn("names"));

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
        let moderatorCommands = []
        
        instance.commandHandler.commands.forEach((command) => {
            if( command.category == "Moderator Commands"){
                moderatorCommands.push(command)
            }
        })

        moderatorCommands.sort(sortOn("names"));

        textModeratorCommands = `These are all **Moderator Commands**: \n\n`

        for (let i = 0; i < moderatorCommands.length; i++) {
            textModeratorCommands += `**---------- ${moderatorCommands[i].names[0]} ----------** \n **Description: **${moderatorCommands[i].description} \n **Command:** ${prefix}${moderatorCommands[i].names[1]} ${moderatorCommands[i].syntax} \n\n`;
        }

        const moderatorCommandsEmbed = new Discord.MessageEmbed()
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

        adminCommands.sort(sortOn("names"));

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
        
        **---------- Enable/Disable Commands ----------**
        **Description: **Enables or disables commands in your guild.
        **Command: **${prefix}command <enable or disable> <command name>

        **---------- Required role ----------**
        **Description: **Specifies what role each command requires.
        **Command: **${prefix}requiredrole <command name> <"none" | tagged role>
        
        **---------- Set prefix ----------**
        **Description: **Displays or sets the prefix for the current guild.
        **Command: **${prefix}prefix [new prefix]`
        
        const configurationCommandsEmbed = new Discord.MessageEmbed()
        .setColor(message.guild.me.displayHexColor)
        .setAuthor(`${prefix}adminhelp - Requested by ${message.author.username}`, message.author.displayAvatarURL())
        .setTitle(`${client.user.username} Admins Help Menu`)
        .setDescription(textConfigurationCommands)
        .setThumbnail(client.user.displayAvatarURL())
        .setTimestamp();

        pages = [playerCommandsEmbed, moderatorCommandsEmbed, adminCommandsEmbed, configurationCommandsEmbed];

        paginationEmbed(message, pages);
    }
}