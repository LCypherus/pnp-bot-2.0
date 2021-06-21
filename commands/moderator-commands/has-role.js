module.exports = {
    // Best practice for the built-in help menu
    commands: ['Has role', 'hasrole', 'has-role'],
    
    category: 'Moderator Commands',
    description: 'Checks if a user has a role.',

    minArgs: 2,
    expectedArgs: "<target user's @> <role name>",
    
    // Invoked when the command is actually ran
    callback: ({ message, args }) => {
        const targetUser = message.mentions.users.first()
        if (!targetUser) {
            message.reply('Please specify someone to make a rolecheck.')
            return
        }
  
        args.shift()
  
        const roleName = args.join(' ')
        const { guild } = message
  
        const role = guild.roles.cache.find((role) => {
            return role.name === roleName
        })
        if (!role) {
            message.reply(`There is no role with the name "${roleName}"`)
            return
        }
  
        const member = guild.members.cache.get(targetUser.id)
        
        if (member.roles.cache.get(role.id)) {
            message.reply(`That user has the ${roleName} role`)
        } else {
            message.reply(`That user does not have the ${roleName} role`)
        }
    },
}