const Discord = require("discord.js");

const client = new Discord.Client();

const { prefix, token } = require('./config.json');

client.on("ready", () => {
  console.log(`Bot has started, with ${client.users.size} users, in ${client.channels.size} channels of ${client.guilds.size} guilds.`); 
  client.user.setActivity(`Use !ph help for a full list of commands!`);
});

client.on("guildCreate", guild => {
  console.log(`New guild joined: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members!`);
  client.user.setActivity(`Serving ${client.guilds.size} servers`);
});

client.on("guildDelete", guild => {
  console.log(`I have been removed from: ${guild.name} (id: ${guild.id})`);
  client.user.setActivity(`Serving ${client.guilds.size} servers`);
});


client.on("message", message => { 
  let mArray = message.content.split(" "); 
  let prefix = "!ph"; 

  if(prefix === mArray[0]) { 
    mArray.shift(); 
    let cmd = mArray[0]; 
    
    switch(cmd) { 
      case 'help' : message.author.send(help());
      break;

      case 'yo': message.channel.send("sup");
      break;

      case 'cool' : message.channel.send(`<@${message.author.id}> is the coolest`);
      break;

      case 'say' : mArray.shift();
        message.channel.send(mArray.join(" "));
      break;

      case 'agree' : message.channel.send(`I personally agree with <@${message.author.id}>`);
      break;

      case 'server-info' : message.channel.send(`Server: ${message.guild.name}\nTotal Members: ${message.guild.memberCount}\nCreated At: ${message.guild.createdAt}\nRegion: ${message.guild.region}`);
      break;

      case 'user-info' : message.channel.send(`Username: ${message.author.username}\nID: ${message.author.id}\nDate Created: ${message.author.createdAt}`);
      break;

      case 'fruit' : 
         message.channel.send('🍎')
            .then(() => message.channel.send('🍊'))
            .then(() => message.channel.send('🍇'))
            .catch(() => console.error('One of the emojis failed to react.'));
      break;

      case 'rfruit' : 
         message.react('🍎')
            .then(() => message.react('🍊'))
            .then(() => message.react('🍇'))
            .catch(() => console.error('One of the emojis failed to react.'));
      break;

      case 'roll' : let num = Math.floor(Math.random() * 20) + 1;
           message.channel.send(`<@${message.author.id}> rolled a` + num);
      break;

      case 'lol' : message.channel.send("😂");
      break;

      case 'rlol' : message.react("😂");
      break;

      case 'joy' : message.channel.send("😄");
      break;

      case 'rjoy' : message.react("😄");
      break;

      case 'ween' : message.channel.send("🍆");
      break;

      case 'rween' : message.react("🍆");
      break;

      default : message.channel.send("Sorry but that isn't a command"); 
      break; 
     } 
   } 
 });

function help() {
  return `List of Available Commands: 
  Help - Shows this list
  yo - Sup
  cool - Tells the server who the coolest person is!
  say <message> - Makes the bot repeat whatever you feel like making it repeat
  agree - Agrees with you on whatever you're trying to argue about
  server-info - Gives basic information about the server you're in
  user-info - Gives basic information about you!
  fruit - Fruit!
  rfruit - Reacts with fruit
  roll - Rolls a D20
  lol - LOL!
  rlol - Reacts with a lol
  joy - Joyful smiles
  rjoy - reacts with a joyful face`;
}

client.login(token);
