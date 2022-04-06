const {Client, Message, MessageEmbed} = require('discord.js');
module.exports.run = async (client, message, args, prefix, DMprefix, Discord) => {
    try{

        if(args[0]) message.reply(`Nhập ${prefix}help thôi là được rồi, gõ chi lắm zậy <:emo_cringe:956929017636855829>`);
        const newEmbed = new MessageEmbed()
        .setTitle("Danh sách các lệnh có sẵn")
        .setThumbnail('https://cdn.discordapp.com/attachments/666271696436854784/955870871501815858/emojisky.com-16075281.png')
        .addFields(
            { name: `${prefix}qg <nhân vật>`, value: `Hiện quick guide của nhân vật - ví dụ: ${prefix}qg hutao` },
            { name: `${prefix}qg list`, value: 'Hiện danh sách nhân vật đã có quick guide' },
            { name: `${prefix}yt`, value: 'Hiện kênh youtube của LittleFox, nhớ subscribe nhé' },
            { name: `${prefix}fg`, value: 'Hiện danh sách nhân vật đã có full guide' },
            { name: `${prefix}noi <nội dung>`, value: 'Thay lời muốn nói (bot sẽ gửi tin nhắn ở kênh <#952182492251717632>)' },
            { name: `${prefix}chui <tên nạn nhân>`, value: 'Chửi ai đấy (bot sẽ gửi tin nhắn ở kênh <#952182492251717632>)' },
            { name: `${prefix}tamsu`, value: 'Tâm sự ẩn danh ở kênh <#958813128630628422> nhé' },
        )
        
        .setColor('WHITE');
        message.channel.send({embeds: [newEmbed]});
    } catch (error) {
        console.log(error);
        let channel2 = client.channels.cache.get('959120662188933191');
        await channel2.send("Error at help.js");
    }
}
module.exports.help = {
    name: 'help',
    aliases: ["o"],
    description: "bruh"
}