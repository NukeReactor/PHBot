//Discord Bot Link
//https://discordapp.com/oauth2/authorize?client_id=468839796974944285&scope=bot

const Discord = require("discord.js");

const client = new Discord.Client();

const sql = require("sqlite3").verbose();

const { prefix, token } = require('./config.json');

const talkedRecently = new Set();

var version = "1.1.0";

var usage = 0;

var time, timer, timeLeft;

var upsec = 0;
var upmin = 0;
var uphour = 0;

var cmdTotal = 68;

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
  // if (message.author.bot) return;
  if (message.channel.type === "dm") return;

  let db = new sql.Database("data.db");

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

      case 'help2' :
        usage++;
        message.author.send(help2());
      break;

      case 'yo': 
        usage++;
        message.channel.send("sup");
      break;

      case 'coolest' : 
        usage++;
        message.channel.send(`<@${message.author.id}> is the coolest`);
      break;

      case 'cool' :
        usage++;
        message.delete();
        message.channel.send("That's cool dude");
      break;

      case 'say' :
        usage++;
        mArray.shift();
        message.delete();
        message.channel.send(mArray.join(" "));
      break;

      case 'agree' : 
        usage++;
        message.delete();
        message.channel.send(`I personally agree with <@${message.author.id}>`);
      break;

      case 'server-info' : 
        usage++;
        message.channel.send(`Server: ${message.guild.name}\nTotal Members: ${message.guild.memberCount}\nChannel ID: ${message.channel.id}\nChannel Type: ${message.channel.type}\nBrowser: ${message.client.browser}\nUptime (mill): ${message.client.uptime}\nServer Created At: ${message.guild.createdAt}\nRegion: ${message.guild.region}`);
      break;

      case 'user-info' : 
        usage++;
        message.channel.send(`Username: ${message.author.username}\nID: ${message.author.id}\nDate Created: ${message.author.createdAt}`);
      break;

      case 'fruit' : 
        usage++;
        message.delete();
        message.channel.send('🍎')
          .then(() => message.channel.send('🍊'))
          .then(() => message.channel.send('🍇'))
          .catch(() => console.error('One of the emojis failed to react.'));
      break;

      case 'rfruit' : 
        usage++;
        message.delete();
        message.react('🍎')
          .then(() => message.react('🍊'))
          .then(() => message.react('🍇'))
          .catch(() => console.error('One of the emojis failed to react.'));
      break;

      case 'roll' : 
        usage++;
        let num = Math.floor(Math.random() * 20) + 1;
        message.channel.send(`<@${message.author.id}> rolled a ` + num);
      break;

      //Make a custom roll

      case 'lol' :
        usage++;
        message.delete();
        let [mojiCount1] = args; 

        if(mojiCount1 === null || mojiCount1 === undefined) {
          message.channel.send("Please enter a valid number before executing the command");
        } else { 
            if(mojiCount1 >= 100) {
              message.channel.send("Please keep the emoji amount under 100");
            } else {
              message.channel.send("😂".repeat(mojiCount1));
            }
        }
      break;

      case 'rlol' : 
        usage++;
        message.react("😂");
      break;

      case 'joy' :
        usage++;
        message.delete();
        let [mojiCount2] = args; 

        if(mojiCount2 === null || mojiCount2 === undefined) {
          message.channel.send("Please enter a valid number before executing the command");
        } else { 
            if(mojiCount2 >= 100) {
              message.channel.send("Please keep the emoji amount under 100");
            } else {
              message.channel.send("😄".repeat(mojiCount2));
            }
        }
      break;

      case 'rjoy' : 
        usage++;
        message.react("😄");
      break;

      case 'ween' :
        usage++;
        message.delete();
        let [mojiCount3] = args; 

        if(mojiCount3 === null || mojiCount3 === undefined) {
          message.channel.send("Please enter a valid number before executing the command");
        } else { 
            if(mojiCount3 >= 100) {
              message.channel.send("Please keep the emoji amount under 100");
            } else {
              message.channel.send("🍆".repeat(mojiCount3));
            }
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

      case 'sah' : 
        usage++;
        let [member] = args;
        args[0] = message.mentions.members.first();

        if(args[0] === undefined) {
          message.channel.send("Please tag a user to use this command properly!");
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
          message.channel.send("Please tag a user to use this command properly!");
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
       message.delete();
       message.channel.send(`<@${message.author.id}> said no homo! All gay is gone!`);
      break;

      case 'love-you' :
        usage++;
        let [lover] = args;
        args[0] = message.mentions.members.first();

        if(args[0] === undefined) {
          message.channel.send("Please tag a user to use this command properly!");
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

        if(time === undefined || time <= 0 || activity === undefined || activity.length <= 1) {
          message.channel.send("Please input a time and an activity to use this command");
        } else {
          message.channel.send(`${message.author.username} will be back in about ${time} minutes, ${activity}`);
          message.channel.send(`Timer set for ${time} minutes`);
    
          timer = setTimeout(function() {
            message.channel.send(`<@${message.author.id}> should be back by now. Maybe`);
          }, timeLeft);
        } 
      break;

      case 'back' :
        usage++;
        clearTimeout(timer);

        if(timeLeft === 0 || timeLeft === undefined) {
          message.channel.send("Nobody is gone!");
        } else {
          message.channel.send(`${message.author.username} is back before they expected to be.`);
          message.channel.send("@everyone The Timer stopped");
          timeLeft = 0;
        }
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

        if(args[0] === undefined) {
          message.channel.send("Please tag a user to use this command properly!");
        } else {

          message.channel.send(`HEY ${alert.toUpperCase()} ARE YOU THERE!?`);
        }
      break;

      case 'nice' :
        usage++;
        message.channel.send("Extremely nice man");
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
        console.log("Hours: " + uphour + " Minutes: " + upmin + " Seconds: " + upsec);
        message.channel.send(`The bot has been online for ${uphour} hours, ${upmin} minutes, and ${upsec} seconds`);
      break;

      //NEED TO FIX
      // ------------------------------------

      case 'spam' :
        usage++;

        let [spamCount, spamContent] = args;
        args[1] = args.slice(1).join(" ");

        var i = 0;

        if (talkedRecently.has(message.author.id)) {
            message.channel.send("Wait 10 seconds before getting typing this again " + message.author);
        } else { 
          if(spamCount > 10 || spamCount === undefined || spamCount <= 0 || spamCount === null) {
            message.channel.send("Please input a valid number (1 - 10)");
          } else {
            if(args[1] === undefined || args[1] <= 1) {
              message.channel.send("Please enter text to spam");
            } else {
                while(i < spamCount) {
                  message.channel.send(spamContent);
                  i++;
                }

                talkedRecently.add(message.author.id);
                  setTimeout(() => {
                   talkedRecently.delete(message.author.id);
                }, 10000);
             }
          }
        }
      break;

      //----------------------------------------

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
            message.channel.send("Please tag a user to use this command properly!");
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

      case 'gr' :
        usage++;
        mArray.shift();
        message.channel.send(`Does anyone wanna play ${mArray.join(" ")} with ${message.author.username}?`);
      break;

      case 'egg' :
        usage++;
        message.channel.send(`The chat has been splattered with eggs!`);
      break;

      case 'RUN' :
        usage++;
        message.channel.send("GET OUTTA HERE!!");
      break;

      case 'power' :
        usage++;
        powerNum = Math.floor(Math.random() * 2) + 1;
        if(powerNum === 1) {
          message.channel.send("I can handle this!");
        } else {
          message.channel.send("TOO MUCH POWER!");
        }
      break;

      case 'leap' :
        usage++;
        message.channel.send(`${message.author.username} jumps and ascends!`);
      break;

      case 'yeet' :
        usage++;
        message.channel.send("YEET BOI");
      break;

      case 'do' :
        usage++;
        message.channel.send("Wow... They actually did it!");
      break;

      case 'holy' :
        usage++;
        message.channel.send("This person is blessed!");
      break;

      case 'holyg' :
        usage++
        message.channel.send("https://youtu.be/E4K0jkxRPe0");
      break;

      case 'name' :
        usage++;
        let [thing, thingName, thingLastname] = args;

        if(args[0] === undefined || args[1] === undefined || args.length <= 1) {
          message.channel.send("Please input valid parameters to use this command!");
        } else {
          message.channel.send(`${message.author.username} named their ${thing} ${thingName} ${thingLastname}`);
        }
      break;

       case 'retard' :
        usage++;
        let [personRet] = args;
        args[0] = message.mentions.members.first();

        if(args[0] === undefined) {
          message.channel.send("Please tag somebody to use this command");
        } else {
          message.channel.send(`${personRet} is a retard!`);
        }
      break;

      case 'convert' :
        usage++;
        let [conv] = args;
        args[0] = message.mentions.members.first();

        let conversion = args.slice(1).join(" ");

        if(args[0] === undefined || args[1] === undefined) {
          message.channel.send("Please input valid parameters to use this command");
        } else {
          message.channel.send(`${conv} has been converted to ${conversion}`);
        }
      break;

      case 'fo' :
        usage++;

        let [fOff] = args;
        fOff = args.slice(0).join(" ");

        message.channel.send(`Fuck off ${fOff}`);
      break;

      case 'greet' : 
        usage++;
        let [personGreeted] = args;
        args[0] = message.mentions.members.first();

        message.channel.send(`Greetings to you, ${personGreeted}`);
      break;

      case 'liar' :
        usage++;
        message.delete();
        message.channel.send("The person above is a liar! ^^");
      break;

      case 'big-gay' :
        usage++;
        message.delete();
        message.channel.send("The person below has the big gay!")
      break;

      case '*' :
        usage++;
        mArray.shift();

        message.delete();
        message.channel.send(`*${mArray.join(" ")}*`);
      break;

      case '**' :
        usage++;
        mArray.shift();

        message.delete();
        message.channel.send(`**${mArray.join(" ")}**`);
      break;

      case '***' :
        usage++;
        mArray.shift();

        message.delete();
        message.channel.send(`***${mArray.join(" ")}***`);
      break;

      case 'gay' :
        usage++;
        let [gayPerson] = args;
        args[0] = message.mentions.members.first();

        if(args[0] === undefined) {
          message.channel.send("Please tag a user to use this command");
        } else {
          message.delete();
          message.channel.send(`${gayPerson} is super gay!`);
        }
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
  if(upsec > 60) {
    upsec = 0;
    upmin += 1;
  }

  if(upmin > 60) {
    upmin = 0;
    uphour += 1;
  }

  console.log("Hours: " + uphour + " Minutes: " + upmin + " Seconds: " + upsec);
 }, 1000);
}

function help() {
  return `
  __List of Commands Page 1__: 
  help - Shows this list
  help2 - Shows the next page
  yo - Sup
  coolest - Tells the server who the coolest person is!
  cool - Cool dude
  say <message> - Makes the bot repeat whatever you feel like making it repeat
  agree - Agrees with you on whatever you're trying to argue about
  server-info - Gives basic information about the server you're in
  user-info - Gives basic information about you!
  fruit - Fruit!
  rfruit - Reacts with fruit
  roll - Rolls a D20
  woah - HOLY COW
  lol <amount> - LOL!
  rlol - Reacts with a lol
  joy <amount> - Joyful smiles
  rjoy - reacts with a joyful face
  ween <amount> - 🍆 LOL XD
  rween - reacts with 🍆
  bot-info - Tells basic info about the bot. Be kind please
  success - Lets people know that it went well
  peace - remain calm!
  PEACE - like peace, but LOUDER!!
  destruction - Let's somebody know they've been DESTROYED!
  leap - ASCEND
  yeet - YeEt
  name <thing> <thing's name> <optional last name> - names a thing
  liar - LIES
  __End of Page 1 - do !ph help2 for more commands__`;
}

function help2() {
  return `
  __List of Commands Page 2__:
  roasted - lets somebody know they've been ROASTED
  asl <age> <gender> <location> - Wanna date?
  sah <@mention> - What's up?
  lizzie - Tells where Lizzie the dog is
  dateChance <@mention> <@mention> - Tells whether two people are compaitble or not.\n It's recommended to use the no homo command afterwords
  no-homo - No homo dude. It's not gay now
  love-you <@mention> - Tells them you love them. No homo tho
  brb <amount-of-time-gone> <what-you-are-doing>- Tells how long you'll be gone to do something
  used - Tells how many times the bot has ran commands (restarts once bot restarts)
  succ - s u c c
  congrats - congratulaaaations!
  alert <@mention> - Grabs somebody's attention
  nice - Nice man
  netter - Netter Mann
  ok - alright
  alright - ok
  yesno - yes or no
  uptime - Tell show long the bot has been online (restarts once bot restarts)
  spam <amount (1 - 10> <text> - spams. Be careful not to spam
  sorry - oof man, oof
  oof - O O F
  umgl <@mention> - UR MOM GAY LOL
  XD - XD LOL HAHAHAHAHAHA
  beans - This nigga eatin *beans*!?
  gr- Request a game to play
  egg - Egg
  run - GET OUTTA HERE
  power - I got this...
  do - they did...
  holy - good
  holyg - thats a holy game!
  convert - Converts people
  retard - Calls someone a retard
  fo <message> - Fuck off
  greet - Greets a person
  big-gay - Big gay
  * - puts * around the text
  ** - puts ** around the text
  *** - puts *** around the text
  gay - Guess what it does 
  __End of Page 2__`
}

client.login(token);
