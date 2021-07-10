module.exports = {
    // Best practice for the built-in help menu
    commands: ['Console', 'console', 'testconsole'],
    
    category: 'Coding Commands',
    description: 'Logging items in the console.',

    minArgs: 0,
    maxArgs: 1,

    permissions: ['ADMINISTRATOR'],
    
    // Invoked when the command is actually ran
    callback: ({ message, channel, args, text, client, prefix, instance, interaction }) => {
        console.log(instance)
        
    }
}