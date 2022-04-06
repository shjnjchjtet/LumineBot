const {Client, Message, MessageEmbed} = require('discord.js');
module.exports.run = async (client, message, args, prefix, Discord, fs) => {
        //tamsu: 958813128630628422
        //test: 657115586287108107
        if(!args[0]) return message.reply(`Nói gì đi bạn, ví dụ: ${prefix}ts ahihi`);
        channel = client.channels.cache.get('958813128630628422');

        var data= null;
                
        const jsonString = fs.readFileSync("./data/randomNum.json");
        data = JSON.parse(jsonString);
        console.log("jsonString: " + jsonString);

        timeNow = new Date();
        console.log("time:" + timeNow.getTime());
        if (timeNow.getTime() > data.time) {
                let ranNum = Math.floor(Math.random() * 12 + 1);
                if (ranNum === data.randomNum) {
                   ranNum = ranNum +1;    
                } 
                data.randomNum = ranNum;
                do{
                    data.time = data.time + 43200000; // + 12 hours
                } while(timeNow.getTime() > data.time)
                fs.writeFile("./data/randomNum.json", JSON.stringify(data), function writeJSON(err) {
                        if (err) return console.log(err);
                        console.log(JSON.stringify(data, null, 2));
                        console.log('writing to ' + jsonString);
                      });
                channel.send("Thông báo, số ID đã được làm mới <a:moe_chore:959079479312015430>");
        }
        userId = message.author.id;
        maMau = userId.substring(data.randomNum,data.randomNum + 6);
        maskId = userId.substring(data.randomNum,data.randomNum + 3);
        maskId2 = parseInt(maskId) + data.randomNum;
        

        console.log("User " + message.author.tag + " đã tâm sự: " + args.join(' '));

        const embedNe = new MessageEmbed()
                .setColor(maMau)
                .setTitle(`Bạn có số ID ${maskId2} nhắn: `)
                .setDescription(args.join(' '));

        channel.send({ embeds: [embedNe] });

        

        
}
module.exports.help = {
    name: 'ts',
    aliases: ["o"],
    description: "bruh"
}
