const DiscordJS = require('discord.js')
const createTableSchema = require('@schemas/createtable-schema')

module.exports = {
    // Best practice for the built-in help menu
    commands: ['Create table', 'createtable'],
    
    category: 'Moderator Commands',
    description: 'Create a table with role, category and channels',

    minArgs: 4,
    expectedArgs: '<type of table> <shortName> <mention dm> <tablename>',
    
    // Invoked when the command is actually ran
    callback: async ({ message, args, client }) => {
        // Find the short and long game name    
        const gamename = await createTableSchema.findOne({
            guildId: message.guild.id,
            shortName: args[1]
        })

        // Basic variables
        const type = args[0]
        const dm = message.mentions.users.first()
        const dmId = dm.id
        const guildId = message.guild.id
        const gameRoleId = gamename.gameRoleId
        const shortName = gamename.shortName
        const longName = gamename.longName
        const tableName = args.slice(3).join(" ")
        const tableShorthand = tableName.match(/(?:^| )(\w)/g).join("").replace(/ /gi, "");

        // Pre-made role id's
        const spectator = "853733170972852306"

        // Create a role
        let role = await message.guild.roles.create({
            data: {
                name: tableName + " Player",
                color: 'GREEN',
                position: 6,
            }
        })
        rolesId = await role.id;
        
        // Create a category
        let cat = await message.guild.channels.create("(X/Y) " + tableName, {
            type: 'category',
            permissionOverwrites: [
                {
                    id: message.guild.roles.everyone, // Everyone
                    allow: ["VIEW_CHANNEL", "READ_MESSAGE_HISTORY"]
                },
                {
                    id: spectator, // Spectator
                    allow: ["VIEW_CHANNEL", "READ_MESSAGE_HISTORY"]
                },
                {
                    id: gameRoleId, // Game Format
                    allow: ["VIEW_CHANNEL", "READ_MESSAGE_HISTORY"]
                },
                {
                    id: rolesId,
                    allow: ["VIEW_CHANNEL", "SEND_MESSAGES", "EMBED_LINKS", "ATTACH_FILES", "READ_MESSAGE_HISTORY", "USE_EXTERNAL_EMOJIS", "ADD_REACTIONS", "SEND_TTS_MESSAGES"]
                },
                {
                    id: dmId,
                    allow: ["MANAGE_CHANNELS", "ADD_REACTIONS", "PRIORITY_SPEAKER", "STREAM", "VIEW_CHANNEL", "SEND_MESSAGES", "SEND_TTS_MESSAGES", "MANAGE_MESSAGES", "EMBED_LINKS", "ATTACH_FILES", "READ_MESSAGE_HISTORY", "MENTION_EVERYONE", "USE_EXTERNAL_EMOJIS", "CONNECT", "SPEAK", "MUTE_MEMBERS", "DEAFEN_MEMBERS", "USE_VAD"]
                }
            ]
        });

        // Create the info channel
        await message.guild.channels.create(tableShorthand + "-info", {
            type: 'text',
            parent: cat,
            permissionOverwrites: [
                {
                    id: message.guild.roles.everyone, // Everyone
                    allow: ["VIEW_CHANNEL", "READ_MESSAGE_HISTORY"]
                },
                {
                    id: spectator, // Spectator
                    allow: ["VIEW_CHANNEL", "READ_MESSAGE_HISTORY"]
                },
                {
                    id: gameRoleId, // Game Format
                    allow: ["VIEW_CHANNEL", "READ_MESSAGE_HISTORY"]
                },
                {
                    id: rolesId,
                    allow: ["VIEW_CHANNEL", "READ_MESSAGE_HISTORY"]
                },
                {
                    id: dmId,
                    allow: ["MANAGE_CHANNELS", "ADD_REACTIONS", "PRIORITY_SPEAKER", "STREAM", "VIEW_CHANNEL", "SEND_MESSAGES", "SEND_TTS_MESSAGES", "MANAGE_MESSAGES", "EMBED_LINKS", "ATTACH_FILES", "READ_MESSAGE_HISTORY", "MENTION_EVERYONE", "USE_EXTERNAL_EMOJIS", "CONNECT", "SPEAK", "MUTE_MEMBERS", "DEAFEN_MEMBERS", "USE_VAD"]
                }
            ]
        });

        // Create the main channel
        if(type == "text") {
            await message.guild.channels.create(tableShorthand + "-main", {
                type: 'text',
                parent: cat,
            });
        } else if(type == "voice") {
            await await message.guild.channels.create(tableShorthand + "-voice", {
                type: 'voice',
                parent: cat,
                permissionOverwrites: [
                    {
                        id: message.guild.roles.everyone, // Everyone
                        allow: ["VIEW_CHANNEL"]
                    },
                    {
                        id: spectator, // Spectator
                        allow: ["VIEW_CHANNEL"]
                    },
                    {
                        id: gameRoleId, // Game Format
                        allow: ["VIEW_CHANNEL"]
                    },
                    {
                        id: rolesId,
                        allow: ["VIEW_CHANNEL", "CONNECT", "SPEAK", "USE_VAD", ]
                    },
                    {
                        id: dmId,
                        allow: ["VIEW_CHANNEL", "MANAGE_CHANNELS", "PRIORITY_SPEAKER", "STREAM", "CONNECT", "SPEAK", "MUTE_MEMBERS", "DEAFEN_MEMBERS", "USE_VAD"]
                    }
                ]
            });
        } else if(type == "both") {
            await message.guild.channels.create(tableShorthand + "-main", {
                type: 'text',
                parent: cat,
            });
            await message.guild.channels.create(tableShorthand + "-voice", {
                type: 'voice',
                parent: cat,
                permissionOverwrites: [
                    {
                        id: message.guild.roles.everyone, // Everyone
                        allow: ["VIEW_CHANNEL"]
                    },
                    {
                        id: spectator, // Spectator
                        allow: ["VIEW_CHANNEL"]
                    },
                    {
                        id: gameRoleId, // Game Format
                        allow: ["VIEW_CHANNEL"]
                    },
                    {
                        id: rolesId,
                        allow: ["VIEW_CHANNEL", "CONNECT", "SPEAK", "USE_VAD", ]
                    },
                    {
                        id: dmId,
                        allow: ["VIEW_CHANNEL", "MANAGE_CHANNELS", "PRIORITY_SPEAKER", "STREAM", "CONNECT", "SPEAK", "MUTE_MEMBERS", "DEAFEN_MEMBERS", "USE_VAD"]
                    }
                ]
            });
        } else {
            message.channel.send("Please specify if your making a Text, voice or both campaign.");
        }

        // Create the ooc channel
        await message.guild.channels.create(tableShorthand + "-ooc", {
            type: 'text',
            parent: cat,
            permissionOverwrites: [
                {
                    id: message.guild.roles.everyone, // Everyone
                    allow: ["VIEW_CHANNEL", "SEND_MESSAGES", "EMBED_LINKS", "ATTACH_FILES", "READ_MESSAGE_HISTORY", "USE_EXTERNAL_EMOJIS", "ADD_REACTIONS", "SEND_TTS_MESSAGES"]
                },
                {
                    id: spectator, // Spectator
                    allow: ["VIEW_CHANNEL", "READ_MESSAGE_HISTORY"]
                },
                {
                    id: gameRoleId, // Game Format
                    allow: ["VIEW_CHANNEL", "SEND_MESSAGES", "EMBED_LINKS", "ATTACH_FILES", "READ_MESSAGE_HISTORY", "USE_EXTERNAL_EMOJIS", "ADD_REACTIONS", "SEND_TTS_MESSAGES"]
                },
                {
                    id: rolesId,
                    allow: ["VIEW_CHANNEL", "SEND_MESSAGES", "EMBED_LINKS", "ATTACH_FILES", "READ_MESSAGE_HISTORY", "USE_EXTERNAL_EMOJIS", "ADD_REACTIONS", "SEND_TTS_MESSAGES"]
                },
                {
                    id: dmId,
                    allow: ["MANAGE_CHANNELS", "ADD_REACTIONS", "PRIORITY_SPEAKER", "STREAM", "VIEW_CHANNEL", "SEND_MESSAGES", "SEND_TTS_MESSAGES", "MANAGE_MESSAGES", "EMBED_LINKS", "ATTACH_FILES", "READ_MESSAGE_HISTORY", "MENTION_EVERYONE", "USE_EXTERNAL_EMOJIS", "CONNECT", "SPEAK", "MUTE_MEMBERS", "DEAFEN_MEMBERS", "USE_VAD"]
                }
            ]
        });

        // Create rolls channel
        await message.guild.channels.create(tableShorthand + "-rolls", {
            type: 'text',
            parent: cat,
            permissionOverwrites: [
                {
                    id: rolesId,
                    allow: ["VIEW_CHANNEL", "SEND_MESSAGES", "EMBED_LINKS", "ATTACH_FILES", "READ_MESSAGE_HISTORY", "USE_EXTERNAL_EMOJIS", "ADD_REACTIONS", "SEND_TTS_MESSAGES"]
                },
                {
                    id: dmId,
                    allow: ["MANAGE_CHANNELS", "ADD_REACTIONS", "PRIORITY_SPEAKER", "STREAM", "VIEW_CHANNEL", "SEND_MESSAGES", "SEND_TTS_MESSAGES", "MANAGE_MESSAGES", "EMBED_LINKS", "ATTACH_FILES", "READ_MESSAGE_HISTORY", "MENTION_EVERYONE", "USE_EXTERNAL_EMOJIS", "CONNECT", "SPEAK", "MUTE_MEMBERS", "DEAFEN_MEMBERS", "USE_VAD"]
                }
            ]
        });

        // Create dm channel
        let dmChannel = await message.guild.channels.create(tableShorthand + "-dm", {
            type: 'text',
            parent: cat,
            permissionOverwrites: [
                {
                    id: dmId,
                    allow: ["MANAGE_CHANNELS", "ADD_REACTIONS", "PRIORITY_SPEAKER", "STREAM", "VIEW_CHANNEL", "SEND_MESSAGES", "SEND_TTS_MESSAGES", "MANAGE_MESSAGES", "EMBED_LINKS", "ATTACH_FILES", "READ_MESSAGE_HISTORY", "MENTION_EVERYONE", "USE_EXTERNAL_EMOJIS", "CONNECT", "SPEAK", "MUTE_MEMBERS", "DEAFEN_MEMBERS", "USE_VAD"]
                }
            ]
        });

        // Create the ending embed on succes
        const createtableEmbed = new DiscordJS.MessageEmbed()
	        .setColor('#3CA489')
	        .setTitle('You succesfully added a new table')
	        .setDescription('This is the summary of the new table')
	        .setThumbnail('https://cdn.discordapp.com/attachments/834882298268221460/840171923093585940/icon.png')
	        .addFields(
		        { name: 'Dungeon Master', value: dm, inline: true },
	        	{ name: 'Format & type', value: longName + ' ' + type, inline: true },
                { name: 'Table Name:', value: tableName, inline: false },
                { name: 'Table Shorthand', value: tableShorthand, inline: true },
                { name: 'Playersrole', value: tableName + " Player", inline: true },
	        )
	        .setFooter('&createtable - Contact L_Cypherus when you\'re having problems with this command.');

        message.channel.send(createtableEmbed);

        dmChannelId = await dmChannel.id
        await client.channels.cache.get(dmChannelId).send(`Hello ${dm}, Your table has been created.\n`, {embed: createtableEmbed});
    }
}