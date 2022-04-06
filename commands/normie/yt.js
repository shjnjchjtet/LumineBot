module.exports.run = async (client, message, args, prefix, DMprefix, Discord) => {
       
    if(args[0]) message.reply(`Gõ ${prefix}yt là em tự nôn link youtube rồi <a:emo_nomnom:960909518181630014>`);
    return message.reply("https://www.youtube.com/c/LittleFox2512");
}

module.exports.help = {
name: 'yt',
aliases: ["o"],
description: "bruh"
}