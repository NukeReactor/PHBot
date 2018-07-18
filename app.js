//Discord Bot Link
//https://discordapp.com/oauth2/authorize?client_id=468839796974944285&scope=bot

const Discord = require("discord.js");

const client = new Discord.Client();

const { prefix, token } = require('./config.json');

const talkedRecently = new Set();

var version = "1.1.0";

var usage = 0;

var time, timer, timeLeft;

var upsec = 0;
var upmin = 0;
var uphour = 0;

var cmdTotal = 46;

update();

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
        usage++;
        message.author.send(help());
      break;

      case 'yo': 
        usage++;
        message.channel.send("sup");
      break;

      case 'cool' : 
        usage++;
        message.channel.send(`<@${message.author.id}> is the coolest`);
      break;

      case 'say' :
        usage++;
        mArray.shift();
        message.channel.send(mArray.join(" "));
      break;

      case 'agree' : 
        usage++;
        message.channel.send(`I personally agree with <@${message.author.id}>`);
      break;

      case 'server-info' : 
        usage++;
        message.channel.send(`Server: ${message.guild.name}\nTotal Members: ${message.guild.memberCount}\nCreated At: ${message.guild.createdAt}\nRegion: ${message.guild.region}`);
      break;

      case 'user-info' : 
        usage++;
        message.channel.send(`Username: ${message.author.username}\nID: ${message.author.id}\nDate Created: ${message.author.createdAt}`);
      break;

      case 'fruit' : 
        usage++;
        message.channel.send('🍎')
          .then(() => message.channel.send('🍊'))
          .then(() => message.channel.send('🍇'))
          .catch(() => console.error('One of the emojis failed to react.'));
      break;

      case 'rfruit' : 
        usage++;
        message.react('🍎')
          .then(() => message.react('🍊'))
          .then(() => message.react('🍇'))
          .catch(() => console.error('One of the emojis failed to react.'));
      break;

      case 'roll' : 
        usage++;
        let num = Math.floor(Math.random() * 20) + 1;
        message.channel.send(`<@${message.author.id}> rolled a` + num);
      break;

      //Make a custom roll

      //Fix LOL, JOY, and WEEN

      case 'lol' :
        usage++;
        let [mojiCount1] = args; 

        if(mojiCount1 === null || mojiCount1 === undefined) {
          message.channel.send("Please enter a valid number before executing the command");
        } else {
         message.channel.send("😂".repeat(mojiCount1));
        }
      break;

      case 'rlol' : 
        usage++;
        message.react("😂");
      break;

      case 'joy' :
        usage++;
        let [mojiCount2] = args; 

        if(mojiCount2 === null || mojiCount2 === undefined) {
          message.channel.send("Please enter a valid number before executing the command");
        } else {
         message.channel.send("😄".repeat(mojiCount2));
        }
      break;

      case 'rjoy' : 
        usage++;
        message.react("😄");
      break;

      case 'ween' :
        usage++;
        let [mojiCount3] = args; 

        if(mojiCount3 === null || mojiCount3 === undefined) {
          message.channel.send("Please enter a valid number before executing the command");
        } else {
         message.channel.send("🍆".repeat(mojiCount3));
        }
      break;

      case 'rween' : 
        usage++;
        message.react("🍆");
      break;

      case 'bot-info' : 
        usage++;
        message.channel.send(`Bot is in ${client.guilds.size} server(s)\nTotal members: ${client.users.size}\nTotal Channels: ${client.channels.size}\nTotal Commands: ${cmdTotal}\nGender: Female\nFavorite Food: Beans (see command "!ph beans")\nVersion: ${version}`);
      break;

      case 'success' : 
        usage++;
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
        usage++;
        message.channel.send("REMAIN CALM. KEEP PEACE!");
      break;

      case 'peace' : 
        usage++;
        message.channel.send("Remain calm. Keep peace!");
      break;

      case 'destruction' : 
        usage++;
        message.channel.send("You, my good sir, have been **DESTROYED!**")
      break;

      case 'roasted' : 
        usage++;
        message.channel.send("You, my good sir, have been **ROASTED!**")
      break;

      case 'asl' : 
        usage++;
        let [age, sex, location] = args;

        if(args[0] === undefined || args[1] === undefined || args[2] === undefined) {
          message.channel.send("Please input the correct parameters to use this command");
        } else {
          message.reply(`Hello ${message.author.username}, I see you're a ${age} year old ${sex} from ${location}. Wanna date?`); 
        }    
      break;

      case 'shout' : 
        usage++;
        let [member] = args;
        args[0] = message.mentions.members.first();

        if(args[0] === undefined) {
          message.channel.send("Please input an @mention to a user!");
        } else {
          message.channel.send(`You there ${member} ?`);
        }
      break;

      case 'lizzie' : 
        usage++;
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
        usage++;
        let [date1, date2] = args;
        args[0] = message.mentions.members.first();
        args[1] = message.mentions.members.first();
        let dateNum = Math.floor(Math.random() * 10) + 1;

        if(args[0] === undefined || args[1] === undefined) {
          message.channel.send("Please input an @mention to a user!");
        } else {
            if(dateNum <= 5) {
              message.channel.send(`${date1} and ${date2} are totally compatible!`);
        }   else if (dateNum <= 10) {
             message.channel.send(`${date1} and ${date2} are not compatible together`);
            }
        }
      break;

      case 'no-homo' : 
       usage++;
       message.channel.send(`<@${message.author.id}> said no homo! All gay is gone!`);
      break;

      case 'love-you' :
        usage++;
        let [lover] = args;
        args[0] = message.mentions.members.first();

        if(args[0] === undefined) {
          message.channel.send("Please input an @mention to a user!");
        } else {
          message.channel.send(`<@${message.author.id}> loves you, ${lover}`);

          setTimeout(function() {
            message.channel.send("!ph no-homo");
          }, 2500);
        }
      break;

      case 'brb' : 
        usage++;
        let [time, activity] = args;
        timeLeft = time * 60000;

        activity = args.slice(1).join(" ");

        message.channel.send(`<@${message.author.id}> will be back in about ${time} minutes to ${activity}`);
    
        timer = setTimeout(function() {
          message.channel.send(`<@${message.author.id}> should be back by now. Maybe`);
        }, timeLeft);
      break;

      case 'back' :
        usage++;
        clearTimeout(timer);
        message.channel.send(`<@${message.author.id}> is back before they expected to be.`);
      break;

      case 'woah' :
        usage++;
        message.channel.send("HOLY COW!");
      break;

      case 'used' : 
        usage++;
        message.channel.send(`The bot has been used ${usage} times since the last time it rejoined`);
      break;

      case 'succ' : 
        usage++;
        message.channel.send("***s   u   c   c***");
      break;

      case 'congrats' : 
        usage++;
        message.channel.send("https://youtu.be/1Bix44C1EzY");
      break;

      case 'alert' : 
        usage++;
        let [alert] = args;
        args[0] = message.mentions.members.first();

        if(args[0] === undefined) {
          message.channel.send("Please input an @mention to a user!");
        } else {
          message.channel.send(`HEY ${alert} ARE YOU THERE!?`);
        }
      break;

      case 'nice' :
        usage++;
        message.channel.send("Extremely NICE MAN");
      break;

      case 'netter' : 
        usage++;
        message.channel.send("Netter Mann");
      break;

      case 'ok' : 
        usage++;
        message.channel.send("alright");
      break;

      case 'alright' :
        usage++;
        message.channel.send("ok");
      break;

      case 'yesno' :
        usage++;
        let yesnoNum = Math.floor(Math.random() * 2) + 1;
        if(yesnoNum === 1) {
          message.channel.send("yes");
        } else {
          message.channel.send("no");
        }
      break;

      case 'uptime' :
        usage++;
        message.channel.send(`The bot has been online for ${uphour} hours, ${upmin} minutes, and ${upsec} seconds`);
      break;

      case 'spam' :
        usage++;

        mArray.shift();

        if (talkedRecently.has(message.author.id)) {
            message.channel.send("Wait 10 seconds before getting typing this again. - " + message.author);
        } else {
          for(let i = 0; i < 5; i++) {
            message.channel.send(`${mArray.join(" ")}`);
          }

          talkedRecently.add(message.author.id);
          setTimeout(() => {
            talkedRecently.delete(message.author.id);
          }, 10000);
        }
      break;

      case 'sorry' :
        usage++;
        message.channel.send("I'm so sorry dude...");
      break;

      case 'oof' :
        usage++;
        message.channel.send("***O O F***");
      break;

      case 'umgl' : 
        usage++;
        let [victim] = args;
        args[0] = message.mentions.members.first();

        if(args[0] === undefined) {
            message.channel.send("Please input an @mention to a user!");
        } else {
          message.channel.send(`Hey ${victim}, you're mom gay! LOL!`);
        }
      break;

      case 'XD' :
        usage++
        message.channel.send("HA XD LOLOLOL")
      break;

      case 'beans' : 
        usage++;
        message.channel.send("This nigga eatin' *beans!?*");
      break;

      default : 
        usage++;
        message.channel.send("Sorry but that isn't a command"); 
      break; 
     } 
   } 
 });

function update() {
 setInterval(function() {
  upsec += 1;
  if(upsec >= 60) {
    upsec = 0;
    upmin += 1;
  }

  if(upmin >= 60) {
    upmin = 0;
    uphour += 1;
  }
 }, 1000)
}

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
  24. asl <age> <gender> <location> - Wanna date?
  25. shout <@mention> - What's up?
  26. lizzie - Tells where Lizzie the dog is
  27. dateChance <@mention> <@mention> - Tells whether two people are compaitble or not.\n It's recommended to use the no homo command afterwords
  28. no-homo - No homo dude. It's not gay now
  29. love-you <@mention> - Tells them you love them. No homo tho
  30. brb <amount-of-time-gone> <what-you-are-doing>- Tells how long you'll be gone to do something
  31. used - Tells how many times the bot has ran commands
  32. succ - s u c c
  33. congrats - congratulaaaations!
  34. alert <@mention> - Grabs somebody's attention
  35. nice - Nice man
  36. netter - Netter Mann
  37. ok - alright
  38. alright - ok
  39. yesno - yes or no
  40. uptime - Tell show long the bot has been online
  41. spam <text> - spams. Be careful not to spam
  42. sorry - oof man, oof
  43. oof - O O F
  44. umgl <@mention> - UR MOM GAY LOL
  45. XD - XD LOL HAHAHAHAHAHA
  46. beans - This nigga eatin *beans*!?`;
}

client.login(token);
