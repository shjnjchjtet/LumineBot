const {Client, Message, MessageEmbed} = require('discord.js');
module.exports.run = async (client, message, args, prefix, DMprefix, Discord) => {
    try{
        if(args[0]) message.reply(`Sai cú pháp rồi! nhưng mà thôi full guide của bạn đây <:Worry_chongnanh:959351638890516580>`);
        const newEmbed = new MessageEmbed()
        .addField('Danh sách các nhân vật đã có full guide hướng dẫn có tâm',  "[1. Albedo](https://youtu.be/m5fJ48ccvj8)\n"
        + "[2. Itto](https://youtu.be/5OUwKgLe7vc)\n"
        + "[3. Raiden Shogun](https://youtu.be/V8sRzxMCbpo)\n"
        + "[4. Yae Miko](https://youtu.be/CE9k8soZBvg)\n"
        + "[5. Zhongli](https://youtu.be/GFOAH-BMZNY)\n"
        + "[6. Shenhe](https://youtu.be/3TzGMUDSziU)\n")
        .setThumbnail('https://cdn.discordapp.com/attachments/657115586287108107/955889963071840266/lumine2-removebg-preview-removebg-preview.png')
        .setColor('WHITE');

        message.channel.send({embeds: [newEmbed]});
    } catch (error) {
        console.log(error);
        let channel2 = client.channels.cache.get('959120662188933191');
        await channel2.send("Error at fg.js");
    }
    
}
module.exports.help = {
    name: 'fg',
    aliases: ["o"],
    description: "full guide"
}