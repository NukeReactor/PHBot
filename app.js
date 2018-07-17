const Discord = require("discord.js");

const client = new Discord.Client();

const config = require("./config.json");

client.on("ready", () => {
  console.log(`Bot has started, with ${client.users.size} users, in ${client.channels.size} channels of ${client.guilds.size} guilds.`); 
  client.user.setActivity(`Serving ${client.guilds.size} servers`);
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
      case 'yo': message.channel.send("sup");
       break; 
     } 
   } 
 });

client.login(config.token);
