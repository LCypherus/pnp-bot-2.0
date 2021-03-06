const roleSizeSchema = require('@schemas/role-size-schema')

// { `${guildId}-${roleId}`: [channelId, text] }
// { `${guildId}-all`: [channelId, text] }
let channelData = {}

const fetchChannelData = async () => {
  const results = await roleSizeSchema.find({})

  channelData = {}

  for (const result of results) {
    const { guildId, channelId, roleId, channelName } = result

    const key = `${guildId}-${roleId}`
    channelData[key] = [channelId, channelName]
  }

  setTimeout(fetchChannelData, 1000 * 60)
}

module.exports = (client) => {
  fetchChannelData()

  const updateCount = (guild, roleId = 'all') => {
    const key = `${guild.id}-${roleId}`
    const data = channelData[key]
    if (data) {
      const [channelId, channelName] = data

      const channel = guild.channels.cache.get(channelId)
      if (channel) {
        let count

        if (roleId === 'all') {
          count = guild.memberCount.toLocaleString()
        } else {
          const role = guild.roles.cache.get(roleId)
          if (role) {
            count = role.members.size
          } else {
            console.log(`Missing role for "${key}": [${channelId}, "${channelName}"]`)
            return
          }
        }

        channel.setName(`${channelName} ${count}`)
      } else {
        console.log(`Missing channel for "${key}": [${channelId}, "${channelName}"]`)
      }
    }
  }

  client.on('guildMemberAdd', (member) => {
    updateCount(member.guild)
  })

  client.on('guildMemberRemove', (member) => {
    updateCount(member.guild)
  })

  client.on('guildMemberUpdate', (oldMember, newMember) => {
    const { roles: beforeRoles } = oldMember
    const { roles: afterRoles, guild } = newMember

    let changedRole

    for (let role of guild.roles.cache) {
      role = role[1]

      const wasInBeforeRoles = !!beforeRoles.cache.get(role.id)
      const isInAfterRoles = !!afterRoles.cache.get(role.id)

      if (wasInBeforeRoles !== isInAfterRoles) {
        changedRole = role
        break
      }
    }

    if (changedRole) {
      updateCount(guild, changedRole.id)
    }
  })
}

module.exports.fetchChannelData = fetchChannelData

module.exports.config = {
    displayName: 'Role Size Channel',
    dbName: 'ROLE SIZE CHANNEL',
    loadDBFirst: true
}