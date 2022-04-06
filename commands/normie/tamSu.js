const {Client, Message, MessageEmbed} = require('discord.js');
module.exports.run = async (client, message, args, prefix, DMprefix, Discord) => {
    try{

        const embedNe = new MessageEmbed()
                .setColor(10418943)
                .setTitle(`Hướng dẫn sử dụng nè, nhấn vào gif bên dưới để xem rõ hơn nhé`)
                .setImage('https://cdn.discordapp.com/attachments/653718872360222760/960481601354088469/ezgif.com-gif-maker.gif')

        noiDung = `Nhập lệnh phía bên dưới cho Hutao theo cú pháp ${DMprefix}ts <nội dung tâm sự>  để trò chuyện ở kênh <#958813128630628422> nhé, ví dụ: ${DMprefix}ts hihi`
        message.author.send({ content: noiDung, embeds: [embedNe] });
                        
        message.delete();
    } catch (error) {
        console.log(error);
        let channel2 = client.channels.cache.get('959120662188933191');
        await channel2.send("Error at chui.js");
    }
}
module.exports.help = {
    name: 'tamsu',
    aliases: ["o"],
    description: "bruh"
}


