const {Client, Message, MessageEmbed} = require('discord.js');
module.exports.run = async (client, message, args, prefix, DMprefix, Discord) => {
    try {
        
        if(!args[0]) return message.author.send(`Bạn muốn chửi ai? ví dụ nè: ${prefix}chui nanika`);
        var mint = message.content.toLowerCase();
        channel = client.channels.cache.get('952182492251717632');
        if(mint.includes("nani") || mint == '<@!307170519101472769>' || (mint.includes("n") && mint.includes("a") && mint.includes("i"))){
            await channel.send(`DM <@${message.author.id}> luôn :))`);
        } else if(mint.includes("hutao") || mint == '<@!955353165077827594>'){
            await channel.send(`DM <@${message.author.id}> luôn :))`);
        }else{
            await channel.send("DM " + args.join(' ') + " luôn");
        }
        message.delete(); 
    } catch (error) {
        console.log(error);
        let channel2 = client.channels.cache.get('959120662188933191');
        await channel2.send("Error at chui.js");
    }
}
module.exports.help = {
    name: 'chui',
    aliases: ["o"],
    description: "bruh"
}