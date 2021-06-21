const fetch = require('node-fetch'); // maybe include this back in if the code fails to work?
const Discord = require("discord.js");
const math = require("mathjs");

module.exports = {
    commands: ['Roll', 'roll', 'r'],
    
    category: 'Player Commands',
    description: 'A basic roll command for all basic rolls and arithmetic.',

    minArgs: 1,
    maxArgs: -1,
    expectedArgs: 'xdy',

    callback: async ({ message, channel, args, text, client, prefix, instance, interaction }) => {
        function randomNum(min, max) {
            return Math.floor(Math.random() * (max - min + 1) ) + min;
          }
          
          function roll(rollString){
              let rollBreakdown = rollString.matchAll(/(\d+)d(\d+)/g);
              rollBreakdown = [...rollBreakdown];
              var totals = []
              rollBreakdown.forEach(function(arrayList){
                  var total = 0;
                for (i = 0; i < arrayList[1]; i++){
                    total += randomNum(1, arrayList[2]);
                }
                totals.push(total)
              });
              totals.forEach(function(num){
                  rollString = rollString.replace(/\d+d\d+/, num);
              })
              //var evaluatedRoll = eval(rollString);
              var evaluatedRoll = math.evaluate(rollString);
              console.log(evaluatedRoll);
              return evaluatedRoll;
          }

          let keywords = "1d20";
  if (args.length > 0){
  	keywords = args.join("");
  }
  var result = roll(keywords);
  message.channel.send("Your roll string: " + keywords);
  message.channel.send("Your roll value: " + result);
    }


}