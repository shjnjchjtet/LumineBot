const {Client, Message, MessageEmbed} = require('discord.js');
module.exports.run = async (client, message, args, prefix, DMprefix, Discord) => {
    try{

        //test 657115586287108107
        //genera
        channel = client.channels.cache.get('952182492251717632');
        
        if(!args[0]) return message.author.send(`Bạn muốn nói gì nè, ví dụ: ${prefix}noi gâu gâu`);
        await channel.send(args.join(' '));
        message.delete();   
    } catch (error) {
        console.log(error);
        let channel2 = client.channels.cache.get('959120662188933191');
        await channel2.send("Error at noi.js");
    }
}
module.exports.help = {
    name: 'noi',
    aliases: ["o"],
    description: "bruh"
}