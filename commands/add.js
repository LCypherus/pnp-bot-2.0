module.exports = {
    // Best practice for the built-in help menu
    description: 'Adds two numbers together',
    category: 'Player Commands',
    // For the correct usage of the command
    expectedArgs: '<Number 1> <Number 2>',
    minArgs: 2,
    maxArgs: 2,
    syntaxError: 'Incorrect usage! Please use "{PREFIX}add {ARGUMENTS}"',
    
    // Invoked when the command is actually ran
    callback: ({ channel, args }) => {
        // Convert the arguments into numbers
        const number1 = parseInt(args[0])
        const number2 = parseInt(args[1])
        
        const sum = number1 + number2;
        
        // Reply with the sum
        channel.send(`The sum is ${sum}`)
    }
}