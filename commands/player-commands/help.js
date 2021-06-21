const Discord = require('discord.js');

module.exports = {
    commands: ['Help', 'help'],   
    category: 'Player Commands',
    description: 'List all commands for the server a player can use.',
    maxArgs: 0,
    
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
            .setAuthor(`${prefix}help - Requested by ${message.author.username}`, message.author.displayAvatarURL())
            .setTitle(`${client.user.username} Admins Help Menu`)
            .setDescription(textPlayerCommands)
            .setThumbnail(client.user.displayAvatarURL())
            .setTimestamp();

        message.channel.send(playerCommandsEmbed)
    }
}