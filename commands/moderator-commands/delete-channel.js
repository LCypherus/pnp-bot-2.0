module.exports = {
    commands: ['Delete channel', 'deletechannel', 'delete-channel'],
    category: 'Moderator Commands',
    description: 'Deletes the current channel.',
    maxArgs: 0,
    callback: ({message}) => {
      message.channel.delete()
    },
  }