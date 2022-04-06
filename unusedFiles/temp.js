const Discord = require('discord.js');
const client = new Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES", "GUILD_MEMBERS", "GUILD_MESSAGE_REACTIONS"] }, { partials: ["MESSAGE", "CHANNEL", "REACTION"] });
module.exports.Client =  client;

const keepAlive = require("./server");

const mySecret = process.env['nanikey']

const prefix = '~';
const fs = require('fs');

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();


//commands handler
fs.readdirSync('./commands/').forEach(dir =>{
    fs.readdir(`./commands/${dir}`, (err, files) => {
        if (err) {
            throw err;
        }

        var jsFiles = files.filter(f => f.split(".").pop() === "js");
        if (jsFiles.length <=0) {
            return console.log("no command");
        }

        jsFiles.forEach(file => {
            var fileGet = require(`./commands/${dir}/${file}`);
            console.log(`command file ${file} loaded`);

            try {
                client.commands.set(fileGet.help.name, fileGet);

                fileGet.help.aliases.forEach(alias =>{
                    client.aliases.set(alias, fileGet.help.name);
                })
            } catch (error) {
                return console.log("Failed at command section", error);
            }
        });
    });
});

client.once('ready', () => {
    console.log('Bot da khoi dong!');
  });

client.on('messageCreate', async message =>{
    let content = message.content;
    if (message.channelId === '955089081342259271'){
        console.log(`Leak content: ${content}`);    
    }
    if (message.channelId === '955089081342259271' && !message.author.bot && content.includes("Leaks Announcements")) {
        console.log("Leak news:" + content.includes("@Leaks"));
        //ping leak: 955052177171304488
        //founder: 952065520339914822
        message.channel.send(`Có leak mới nè vào bú đi <@&955052177171304488>`);
        return;
    }
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const cmd = args.shift().toLowerCase();
    console.log("zo args: " + args);
    console.log("zo cmd:" + cmd);
    let commands = client.commands.get(cmd) || client.commands.get(client.aliases.get(cmd));
    if(commands) {
        if (!message.content.startsWith(prefix)) {
            return;
        }
        console.log("zo messageCreate");
        commands.run(client, message, args, prefix, Discord);
    } else{
        message.reply("Sai cú pháp rồi bạn ei, nhập ~help để hiện danh sách các lệnh có sẵn nhé");
    }

})



keepAlive();


client.login(mySecret);

