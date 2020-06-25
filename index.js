const Discord = require("discord.js");
const client = new Discord.Client();
const config = require("./config.json");
const { Client, MessageEmbed } = require('discord.js');



client.on('ready', () => {
    console.log(`${client.user.tag} is ready`);
});

// The code below welcomes people when they join the server

client.on('guildMemberAdd', member => {
  const channel = member.guild.channels.cache.find(ch => ch.name == 'welcome');
  if (!channel) return;
  channel.send(`Welcome to the server, ${member} please read the rules and enjoy!`);
  member.send("Welcome to the server we have lot's of great features and really chill people enjoy");
});

client.on('guildMemberRemove', member => {
  const channel = member.guild.channels.cache.find(ch => ch.name == 'welcome');
  if (!channel) return;
  channel.send(`We are sad to see you go ${member} we hope you do well in the future`);
});


// The code below makes an embed for lbot info

client.on('message', async message => {
  if (message.content == config.prefix+"help") {
          if (!message.member.roles.cache.find(r => r.name == "Administrator"))
    return;
    const embed = new MessageEmbed()
      .setColor('PURPLE')
      .setTitle('Discord Server Creator')
      .setThumbnail(message.guild.iconURL)
      .setAuthor(`${message.guild.name} Info`, message.guild.iconURL)
      .addField("**Guild Name**", `${message.guild.name}`, true)
      .addField("**Guild Owner**", `${message.guild.owner}`, true)
      .addField("**Member Count**", `${message.guild.memberCount}`, true)
      .addField("**Lbot Commands**", config.prefix+'setup')
      .setFooter(`Lbot Info Above`, client.user.displayAvatarURL)
      .addField("**Description**", 'dont have time to make a discord server or dont know how to? Lbot is here to help do !setup to get your new server started.');
    message.channel.send(embed);
  }

      // the code below create's an embed for !setup
      if(message.content == config.prefix+"setup") {
              if (!message.member.roles.cache.find(r => r.name == "Administrator"))
    return;
        const embed = new MessageEmbed()
        .setColor('PURPLE')
        .setTitle('Discord Server Creator')
        .setThumbnail(message.guild.iconURL)
        .setAuthor(`${message.guild.name} Info`, message.guild.iconURL)
        .addField("**Guild Name**", `${message.guild.name}`, true)
        .addField("**Guild Owner**", `${message.guild.owner}`, true)
        .addField("**Member Count**", `${message.guild.memberCount}`, true)
        .addField("**Lbot Commands**", config.prefix+'chillserver')
        .setFooter(`Lbot Info Above`, client.user.displayAvatarURL)
        .addField("**Description**", 'Pick which type of server you want.');
      message.channel.send(embed);
      }

      // The code below create's roles for !chillserver

      if(message.content == config.prefix+"chillserver") {
              if (!message.member.roles.cache.find(r => r.name == "Administrator"))
    return;
        message.guild.roles.create({
          data: {
            name: "Administrator",
            color: "fe00d0",
            permissions: ["ADMINISTRATOR"]
          }
        });

        message.channel.send('Created new roles')

        createrole(message, 'Friends', '#10ebb9');
        createrole(message, 'Active', '#00ff2e');
        createrole(message, 'Memer', '#f7fe04');
        createrole(message, 'Member', '#110eec');

        message.channel.send('Created new roles')

        // The code below create's channels and categories for !chillserver
        const category = await createChannel(message, "Information", "category")

        const channel = await createChannel(message, "welcome")
        
        const channel1 = await createChannel(message, "Announcements")

        const channel2 = await createChannel(message, "rules")

        const channel3 = await createChannel(message, "updates")

        const category1 = await createChannel(message, "General Channels", "category")

        const channel4 = await createChannel(message, "general chat")

        const channel5 = await createChannel(message, "memes")

        const channel6 = await createChannel(message, "bot commands")

        const category2 = await createchannel1(message, "Voice channels", "category")

        const channel7 = await createchannel1(message, "Public channel 1")

        const channel8 = await createchannel1(message, "Public channel 2")

        const channel9 = await createchannel1(message, "Public channel 3")
        
        const channel10 = await createchannel1(message, "Music")

        const category3 = await createchannel1(message, "Staff", "category")

        const channel11 = await createchannel1(message, 'Penthouse')

        const channel12 = await createchannel1(message, "Staff voice channel")






        channel.setParent(category.id)
        channel1.setParent(category.id)
        channel2.setParent(category.id)
        channel3.setParent(category.id)
        channel4.setParent(category1.id)
        channel5.setParent(category1.id)
        channel6.setParent(category1.id)
        channel7.setParent(category2.id)
        channel8.setParent(category2.id)
        channel9.setParent(category2.id)
        channel10.setParent(category2.id)
        channel11.setParent(category3.id)
        channel12.setParent(category3.id)
      }
});

// !kick command no user can bypass 

client.on('message', message => {

  if (message.content.startsWith("!kick")) {

    if (!message.member.roles.cache.find(r => r.name == "Administrator"))
        return;
    // Easy way to get member object though mentions.
    var member = message.mentions.members.first();
    // Kick
    member.kick().then((member) => {
        // Successmessage
        message.channel.send(":wave: " + member.displayName + " has been successfully kicked :point_right: ");
    }).catch(() => {
        // Failmessage
        message.channel.send("Access Denied");
    });
}
});

// !ban command no user can bypass

client.on("message", (message) => {
  if (message.content.startsWith("!ban")) {

      if (!message.member.roles.cache.find(r => r.name == "Administrator"))
          return;

      var member = message.mentions.members.first();

      member.ban().then((member) => {

          message.channel.send(":wave: " + member.displayName + " fuck up outta here boi https://gfycat.com/playfulfittingcaribou :point_right: ");

          message.channel.send("Access Denied");
      });
  }
});


// function for creating roles
    function createrole(message, name, color) {
      message.guild.roles.create({
        data: {
          name: name,
          color: color,
        },
        reason: 'Setup',
      })
        .catch(console.error);
    }


  // function for create text channel and categories
async function createChannel(message, name, type = "text") {
const create = await message.guild.channels.create(name, { type, reason: "Setup" });

return create;
}
// function for voice channels
async function createchannel1(message, name, type = "voice") {
  const create = await message.guild.channels.create(name, { type, reason: "Setup"});

  return create;
}


    client.login(config.token)