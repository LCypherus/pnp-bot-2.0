module.exports = {
    // Best practice for the built-in help menu
    commands: ['Remove role', 'removerole', 'remove-role'],
    
    category: 'Moderator Commands',
    description: 'Removes a role from a player',

    minArgs: 2,
    expectedArgs: "<target user's @> <role name>",
    
    // Invoked when the command is actually ran
    callback: ({ message, args }) => {
        const targetUser = message.mentions.users.first()
        if (!targetUser) {
            message.reply('Please specify someone to remove a role from.')
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
            member.roles.remove(role)
            message.reply(`That user no longer has the ${roleName} role`)
        } else {
            message.reply(`That user does not have the ${roleName} role`)
        }
    },
}