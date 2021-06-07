module.exports = {
    commands: 'ping',
    category: 'Coding Commands',
    minArgs: 0,
    maxArgs: 0,
    description: 'Replies with pong',
    callback: ({ message }) => {
        message.channel.send('Calculating ping ...').then(resultMessage => {
        const ping = resultMessage.createdTimestamp - message.createdTimestamp
        console.log(resultMessage.createdTimestamp, message.createdTimestamp, resultMessage.createdTimestamp - message.createdTimestamp)
  
        setTimeout(function() {
            resultMessage.edit(`Bot latency: ${ping}\nAPI Latency: ${message.client.ws.ping}`)
        }, 3000)
      })
    },
  }