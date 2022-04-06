const Discord = require('discord.js');
const client = new Discord.Client({ intents: ["DIRECT_MESSAGES","GUILDS", "GUILD_MESSAGES", "GUILD_MEMBERS", "GUILD_MESSAGE_REACTIONS"] }, { partials: ["MESSAGE", "CHANNEL", "REACTION"] });

module.exports.Client =  client;

// const keepAlive = require("./server");

// const mySecret = process.env['nanikey']
const { MessageEmbed} = require('discord.js');
const prefix = 'lu!';
const DMprefix = '>';
const fs = require('fs');
let hiCheck = false;
let byeCheck = false;
let nightCheck = false;
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
    let userCmd = message.content.toLowerCase();

    if (message.channelId === '955089081342259271' && userCmd.includes("nnouncements")) {
        message.channel.send(`Có leak mới nè <@&955090192631488623>`);
        return;
    }

    if(userCmd.includes("@here") || userCmd.includes("@everyone") || userCmd.includes("<@&")) return;

    checkDM(client, message, userCmd, fs);

    var data= null;
    try {
        
        const jsonString = fs.readFileSync("./data/greeting.json");
        data = JSON.parse(jsonString);
    } catch (err) {
        console.log(err);
        return;
    }
    
    greeting(client, message, data, userCmd, hiCheck);
    if (hiCheck) return;

    chaoHoi(client, message, data, userCmd, byeCheck, data.bye , data.botBye);
    if (byeCheck) return;

    chaoHoi(client, message, data, userCmd, nightCheck, data.night , data.botNight);
    if (nightCheck) return;

    if (!userCmd.startsWith(prefix) || message.author.bot || message.channel.type == "DM") return;

    const args = userCmd.slice(prefix.length).split(/ +/);
    const cmd = args.shift().toLowerCase();

    if (cmd === 'fg' || cmd === 'qg' || cmd === 'yt' || cmd === 'help' || cmd === 'qglist') {
        if (message.channelId !== '953912033651326986' && message.channelId !== '952167603160375306') {
            message.author.send("Lệnh này chỉ dùng được ở kênh <#952167603160375306> và <#953912033651326986> thôi bạn nhé");
            message.delete();  
            return;
        }
    }

    let commands = client.commands.get(cmd) || client.commands.get(client.aliases.get(cmd));
    if(commands) {
        if (!userCmd.startsWith(prefix)) {
            return;
        }
        console.log("User " +message.member.user.tag + " dung command: " + userCmd);
        
        getTime(client, message);
        
        commands.run(client, message, args, prefix, DMprefix, Discord);
    } else{
        content = `Sai cú pháp rồi bạn ei, nhập ${prefix}help để hiện danh sách các lệnh có sẵn như bên dưới nhé`;
        const newEmbed = new MessageEmbed()
        .setTitle("Danh sách các lệnh có sẵn")
        .setThumbnail('https://cdn.discordapp.com/attachments/666271696436854784/955870871501815858/emojisky.com-16075281.png')
        .addFields(
            { name: `${prefix}qg <nhân vật>`, value: `Hiện quick guide của nhân vật - ví dụ: ${prefix}qg hutao` },
            { name: `${prefix}qg list`, value: 'Hiện danh sách nhân vật đã có quick guide' },
            { name: `${prefix}yt`, value: 'Hiện kênh youtube của LittleFox, nhớ subscribe nhé' },
            { name: `${prefix}fg`, value: 'Hiện danh sách nhân vật đã có full guide' },
            { name: `${prefix}noi <nội dung>`, value: 'Thay lời muốn nói (bot sẽ gửi tin nhắn ở kênh <#952182492251717632>)' },
            { name: `${prefix}chui <tên nạn nhân>`, value: 'Chửi một ai đấy (bot sẽ gửi tin nhắn ở kênh <#952182492251717632>)' },
            { name: `${prefix}tamsu`, value: 'Tâm sự ẩn danh ở kênh <#958813128630628422> nhé' },
        )
        .setColor('WHITE');
        message.author.send({content : content ,embeds: [newEmbed]});
        message.delete();
    }

})

async function checkDM(client, message, userCmd, fs){
    if (message.channel.type != "DM") {
        return;
    }
    
    if (!userCmd.startsWith(DMprefix) || message.author.bot) return;
    const args = userCmd.slice(DMprefix.length).split(/ +/);
    const cmd = args.shift().toLowerCase();

    let commands = client.commands.get(cmd) || client.commands.get(client.aliases.get(cmd));
    if(commands) {
        if (!message.content.startsWith(DMprefix)) {
            return;
        }
        console.log("User " + message.author.tag + " dung command: " + userCmd);
        
        getTime(client, message);
      
        commands.run(client, message, args, DMprefix, Discord, fs);
    } else{
        //test: 653718872360222760
        message.reply(`Sai cú pháp rồi bạn ei, nhập ${DMprefix}ts để tâm sự ẩn danh ở kênh <#653718872360222760> nhé`);
    }

}

async function getTime(client, message){
    var today = new Date();
    today.setHours(today.getHours() + 7);
    var str = today.toGMTString();
              
    let channel2 = client.channels.cache.get('959120662188933191');
    await channel2.send("User " + message.author.tag + " ----- " + message.content + " --- at:  " + str);
}

async function greeting(client, message, data, userCmd, hiCheck){
    let greeting = data.greeting;
    let checkGreeting = false;
    let objectt = data.objectt;
    let checkObjectt = false;
    
    let arr = userCmd.split(" ", 2);

    let firstWord = arr[0]; 
    greeting.forEach(element => {
        if (firstWord.includes(element)) {
            return checkGreeting = true;
        }
    });
    objectt.forEach(element => {
        if (userCmd.includes(element) && !userCmd.includes("lỗi") && !userCmd.includes("lũi") && !userCmd.includes("đấy") && !userCmd.includes(":")) {
            return checkObjectt = true;
        }
    });

    //channel test: 657115586287108107
    //general: 952182492251717632
    if (message.channelId === '952182492251717632' && checkObjectt && checkGreeting && !message.author.bot) {
        let botPart = data.botHi;
        let emotePart = data.emoPart;
        let greetRandom = Math.floor(Math.random() * botPart.length);
        let emoteRandom = Math.floor(Math.random() * emotePart.length);
        message.channel.send(`${botPart[greetRandom].name} <@${message.author.id}> <${emotePart[emoteRandom].name}>`);
        getTime(client, message);
        return hiCheck =true;
    }
    return hiCheck = false;
}

async function chaoHoi(client, message, data, userCmd, chaoCheck, loiChao , botChao){
    let checkLoiChao = false;
    let objectt = data.objectt;
    let checkObjectt = false;
    
    loiChao.forEach(element => {
        if (userCmd.includes(element)) {
            return checkLoiChao = true;
        }
    });
    objectt.forEach(element => {
        if (userCmd.includes(element) && !userCmd.includes(":")) {
            return checkObjectt = true;
        }
    });

    //channel test: 657115586287108107
    //general: 952182492251717632
    //cao: 635674138890993684
    if (message.channelId === '952182492251717632' && checkObjectt && checkLoiChao && !message.author.bot) {
        let emotePart = data.emoPart;
        let greetRandom = Math.floor(Math.random() * botChao.length);
        let emoteRandom = Math.floor(Math.random() * emotePart.length);
        message.channel.send(`${botChao[greetRandom].name} <@${message.author.id}> <${emotePart[emoteRandom].name}>`);
        getTime(client, message);
        return chaoCheck =true;
    }
    return chaoCheck = false;
}


// //keepAlive();

// //client.login(mySecret);
//lumine
client.login('OTU1MzUzMTY1MDc3ODI3NTk0.Yjgb-A.dt0kbAgu601e8hiCjJSjrsZCvDk');

//hutao
// client.login('OTU2NDgxMjczNzY4MDc5NDEw.Yjw2mg.4QVH5AWUohnfpIcd6mYY23s2yFo');
