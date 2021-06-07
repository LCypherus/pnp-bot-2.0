module.exports = {
    name: 'delete-channel',
    commands: ['deletechannel', 'delchannel'],
    category: 'Channel Admin Commands',
    description: 'Deletes the current channel.',
    maxArgs: 0,
    callback: ({message}) => {
      message.channel.delete()
    },
  }