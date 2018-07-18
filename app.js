//Discord Bot Link
//https://discordapp.com/oauth2/authorize?client_id=468839796974944285&scope=bot

const Discord = require("discord.js");

const client = new Discord.Client();

const { prefix, token } = require('./config.json');

var version = "1.0.1";

var usage = 0;

client.on("ready", () => {
  console.log(`Bot has started with ${client.users.size} users in ${client.channels.size} channels of ${client.guilds.size} guilds.`); 
  client.user.setActivity(`Use !ph help for commands`);
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

  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

  if(prefix === mArray[0]) { 
    mArray.shift(); 
    let cmd = mArray[0]; 
    
    switch(cmd) { 
      case 'help' : 
        usage += 1;
        message.author.send(help());
      break;

      case 'yo': 
        usage += 1;
        message.channel.send("sup");
      break;

      case 'cool' : 
        usage += 1;
        message.channel.send(`<@${message.author.id}> is the coolest`);
      break;

      case 'say' :
        usage += 1;
        mArray.shift();
        message.channel.send(mArray.join(" "));
      break;

      case 'agree' : 
        usage += 1;
        message.channel.send(`I personally agree with <@${message.author.id}>`);
      break;

      case 'server-info' : 
        usage += 1;
        message.channel.send(`Server: ${message.guild.name}\nTotal Members: ${message.guild.memberCount}\nCreated At: ${message.guild.createdAt}\nRegion: ${message.guild.region}`);
      break;

      case 'user-info' : 
        usage += 1;
        message.channel.send(`Username: ${message.author.username}\nID: ${message.author.id}\nDate Created: ${message.author.createdAt}`);
      break;

      case 'fruit' : 
        usage += 1;
        message.channel.send('🍎')
          .then(() => message.channel.send('🍊'))
          .then(() => message.channel.send('🍇'))
          .catch(() => console.error('One of the emojis failed to react.'));
      break;

      case 'rfruit' : 
        usage += 1;
        message.react('🍎')
          .then(() => message.react('🍊'))
          .then(() => message.react('🍇'))
          .catch(() => console.error('One of the emojis failed to react.'));
      break;

      case 'roll' : 
        usage += 1;
        let num = Math.floor(Math.random() * 20) + 1;
        message.channel.send(`<@${message.author.id}> rolled a` + num);
      break;

      case 'lol' :
        usage += 1;
        let [mojiCount1] = args; 

        if(mojiCount1 === null || mojiCount1 === undefined) {
          message.channel.send("Please enter a valid number before executing the command");
        } else {
         message.channel.send("😂".repeat(mojiCount1));
        }
      break;

      case 'rlol' : 
        usage += 1;
        message.react("😂");
      break;

      case 'joy' :
        usage += 1;
        let [mojiCount2] = args; 

        if(mojiCount2 === null || mojiCount2 === undefined) {
          message.channel.send("Please enter a valid number before executing the command");
        } else {
         message.channel.send("😄".repeat(mojiCount2));
        }
      break;

      case 'rjoy' : 
        usage += 1;
        message.react("😄");
      break;

      case 'ween' :
        usage += 1;
        let [mojiCount3] = args; 

        if(mojiCount3 === null || mojiCount3 === undefined) {
          message.channel.send("Please enter a valid number before executing the command");
        } else {
         message.channel.send("🍆".repeat(mojiCount3));
        }
      break;

      case 'rween' : 
        usage += 1;
        message.react("🍆");
      break;

      case 'bot-info' : 
        usage += 1;
        message.channel.send(`Bot is in ${client.guilds.size} server(s)\nTotal members: ${client.users.size}\nTotal Channels: ${client.channels.size}\nVersion: ${version}`);
      break;

      case 'success' : 
        usage += 1;
        let successNum = Math.floor(Math.random() * 4) + 1;
        if (successNum === 1) {
          message.channel.send("Hell yeah! That was amazing!");
        } else if(successNum === 2) {
          message.channel.send("Awesome! We did it!");
        } else if(successNum === 3) {
          message.channel.send("Another job well done!");
        } else if(successNum === 4) {
          message.channel.send("YES! FINALLY!");
        } else {
          message.channel.send("Cool");
        }

        console.log(successNum);
      break;

      case 'PEACE' : 
        usage += 1;
        message.channel.send("REMAIN CALM. KEEP PEACE!");
      break;

      case 'peace' : 
        usage += 1;
        message.channel.send("Remain calm. Keep peace!");
      break;

      case 'destruction' : 
        usage += 1;
        message.channel.send("You, my good sir, have been **DESTROYED!**")
      break;

      case 'roasted' : 

        message.channel.send("You, my good sir, have been **ROASTED!**")
      break;

      case 'commandCount' : 
        usage += 1;
        message.channel.send("Their are currently 40 commands counting this one. Use !ph help for a full list");
      break;

      case 'asl' : 
        usage += 1;
        let [age, sex, location] = args;
        message.reply(`Hello ${message.author.username}, I see you're a ${age} year old ${sex} from ${location}. Wanna date?`);
      break;

      case 'shout' : 
        usage += 1;
        let member = message.mentions.members.first();
        message.channel.send(`You there ${member} ?`);
      break;

      case 'lizzie' : 
        usage += 1;
        let randNum = Math.floor(Math.random() * 10) + 1;
        if(randNum <= 2) {
          message.channel.send("Lizzie is in the living room");
        } else if(randNum <= 4) {
          message.channel.send("Lizzie is outisde of your door");
        } else if(randNum <= 6) {
          message.channel.send("Lizzie is in the kitchen");
        } else if(randNum <= 9) {
          message.channel.send("Lizzie is right next to you");
        } else if(randNum === 10) {
          message.channel.send("Lizzie is behind you with a knife. RUN!");
        } else {
          message.channel.send("Lizzie is nowhere to be found at the current moment");
        }
      break;

      case 'dateChance': 
        usage += 1;
        let [date1, date2] = args;
        args[0] = message.mentions.members;
        args[1] = message.mentions.members;
        let dateNum = Math.floor(Math.random() * 3) + 1;

        if(dateNum === 1) {
          message.channel.send(`${date1} and ${date2} are totally compatible!`);
        } else {
          message.channel.send(`${date1} and ${date2} are not compatible together`);
        }
      break;

      case 'no-homo' : 
       usage += 1;
       message.channel.send(`<@${message.author.id}> said no homo! All gay is gone!`);
      break;

      case 'love-you' :
        usage += 1;
        let [lover] = args;
        args[0] = message.mentions.members.first();
        message.channel.send(`<@${message.author.id}> loves you, ${lover}`);
        setTimeout(function() {
          message.channel.send("!ph no-homo");
        }, 2500)
      break;

      /*FIX THIS*/

      case 'brb' : 
        usage += 1;
        let [timeGone, activity] = args

        var timeLeft = timeGone * 60000;

        activity = args.slice(1).join(" ");

        message.channel.send(`<@${message.author.id}> will be back in about ${timeGone} minutes to ${activity}`);
    
        var timer = setTimeout(function() {
          message.channel.send(`<@${message.author.id}> should be back by now. Maybe`);
        }, timeLeft);
      break;

      case 'back' :
        usage += 1;
        timeLeft = 0;
        message.channel.send(`<@${message.author.id}> is back earlier than expected!`);
        clearTimeout(timer);
      break;

      /*FIX THIS*/

      case 'woah' :
        usage += 1;
        message.channel.send("HOLY COW!");
      break;

      case 'used' : 
        usage += 1;
        message.channel.send(`The bot has been used ${usage} times since the last time it rejoined`);
      break;

      case 'succ' : 
        usage += 1;
        message.channel.send("***s   u   c   c***");
      break;

      case 'congrats' : 
        usage += 1;
        message.channel.send("https://youtu.be/1Bix44C1EzY");
      break;

      case 'alert' : 
        usage += 1;
        let [alert] = args;
        args[0] = message.mentions.members.first();
        message.channel.send(`HEY ${alert} ARE YOU THERE!?`);
      break;

      case 'nice' :
        usage += 1;
        message.channel.send("Extremely NICE MAN");
      break;

      case 'netter' : 
        usage += 1;
        message.channel.send("Netter Mann");
      break;

      case 'ok' : 
        usage += 1;
        message.channel.send("alright");
      break;

      case 'alright' :
        usage += 1;
        message.channel.send("ok");
      break;

      case 'yesno' :
        usage += 1;
        let yesnoNum = Math.floor(Math.random() * 2) + 1;
        if(yesnoNum === 1) {
          message.channel.send("yes");
        } else {
          message.channel.send("no");
        }
      break;

      default : 
        usage += 1;
        message.channel.send("Sorry but that isn't a command"); 
      break; 
     } 
   } 
 });

function help() {
  return `
  List of Available Commands: 
  1. help - Shows this list
  2. yo - Sup
  3. cool - Tells the server who the coolest person is!
  4. say <message> - Makes the bot repeat whatever you feel like making it repeat
  5. agree - Agrees with you on whatever you're trying to argue about
  6. server-info - Gives basic information about the server you're in
  7. user-info - Gives basic information about you!
  8. fruit - Fruit!
  9. rfruit - Reacts with fruit
  10. roll - Rolls a D20
  11. woah - HOLY COW
  12. lol <amount> - LOL!
  13. rlol - Reacts with a lol
  14. joy <amount> - Joyful smiles
  15. rjoy - reacts with a joyful face
  16. ween <amount> - 🍆 LOL XD
  17. rween - reacts with 🍆
  18. bot-info - Tells some information about the servers the bot is in
  19. success - Lets people know that it went well
  20. peace - remain calm!
  21. PEACE - like peace, but LOUDER!!
  22. destruction - Let's somebody know they've been DESTROYED!
  23. roasted - lets somebody know they've been ROASTED
  24. commandCount - tells how many commands their are at the moment
  25. asl <age> <gender> <location> - Wanna date?
  26. shout <@mention> - What's up?
  27. lizzie - Tells where Lizzie the dog is
  28. dateChance <@mention> <@mention> - Tells whether two people are compaitble or not.\n It's recommended to use the no homo command afterwords
  29. no-homo - No homo dude. It's not gay now
  30. love-you <@mention> - Tells them you love them. No homo tho
  31. brb <amount-of-time-gone> <what-you-are-doing>- Tells how long you'll be gone to do something
  32. used - Tells how many times the bot has ran commands
  33. succ - s u c c
  34. congrats - congratulaaaations!
  35. alert <@mention> - Grabs somebody's attention
  36. nice - Nice man
  37. netter - Netter Mann
  38. ok - alright
  39. alright - ok
  40. yesno - yes or no`;
}

client.login(token);
