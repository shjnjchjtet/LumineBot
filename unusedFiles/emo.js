const {Client, MessageManager, MessageEmbed} = require('discord.js');
module.exports.run = async (client, message, args, prefix, Discord) => {
       if(!args[0]) return message.reply("Sai cú pháp rồi bạn ei, nhập ~emo list để hiện danh sách emoji có sẵn nhé");
        console.log("args: " + args);
        var mint = args[0].toLowerCase();
        const fs = require('fs');
        var data= null;
        var checkExist = false;
        try {
            console.log("lay dc json");
            const jsonString = fs.readFileSync("./data/emoji.json");
            data = JSON.parse(jsonString);
        } catch (err) {
            console.log(err);
            return;
        }
        
        for (let index = 0; index < data.emoji.length; index++) {
            const emo = data.emoji[index];
            if (emo.name === mint) {
                message.delete();
                message.channel.send(message.author.tag +" đã thả emoji bên dưới");
                message.channel.send(emo.id);
                checkExist = true;
                return;
            } else if (mint === 'list'){
                console.log("vao list");
                let mint1 = new MessageEmbed()
                .setTitle("Danh sách các emoji có sẵn");
                //fetch emoji
                for (let index = 0; index < data.emoji.length; index++) {
                    const emo2 = data.emoji[index];
                    mint1.addFields({ name: emo2.name, value: emo2.id , inline: true});
                }

                message.channel.send({ embeds: [mint1] });
                checkExist = true;
                return;
            }
        }
        if (!checkExist) {
            message.channel.send("Emoji này chưa có, nhập ~emo list để hiện danh sách emoji có sẵn nhé");
        }
}

module.exports.help = {
    name: 'emo',
    aliases: ["o"],
    description: "bruh"
}