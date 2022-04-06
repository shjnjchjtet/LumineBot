const {Client, Message, MessageEmbed} = require('discord.js');
// const {pagination } = require('reconlx');

module.exports.run = async (client, message, args, prefix, Discord) => {
    
    if(isNaN(args[0])) return message.reply("nhập clgt??");
    
    // if(!message.member.roles.cache.has('952065520339914822') && !message.member.roles.cache.has('952172167309692938')){
    //     return message.reply("Bạn không có quyền để dùng lệnh này");
    // }
    
    const fs = require('fs');
    
    var data= null;
    try {
        const jsonString = fs.readFileSync("./data/gift.json");
        data = JSON.parse(jsonString);
    } catch (err) {
            console.log(err);
            return;
        }
    try{
                var AuthorUser = message.author.id;
                let mint1 = new MessageEmbed()
                    .setTitle("Chọn đê <a:zz_frog_pepecheers:955541158526844938>")
                    .addFields(
                        { name: 'React phía dưới để nhận quà', value: "Mỗi người chỉ nhận được 1 lần \n Phần quà đã được chọn thì người khác không nhận được nữa" },
                    )
                    
                let messageEmbed =  await message.channel.send({ embeds: [mint1] });
                message.delete(); 
                //fetch reaction
                for (let index = 0; index < data.element.length; index++) {
                    const culac = data.element[index];
                    messageEmbed.react(culac.icon);
                }

                //handle user reaction
                var userArray = [];
                var userNameArray = [];
                var giftArray = [];
                var giftNameArray = [];
                var anVaList = [];
                var count = 0;
                var hetQua = false;
                var giftQuota =[];
                data.gift.forEach(element => {
                    giftQuota.push(element.id);
                });
                console.log("giftQuota: " + giftQuota);

                client.on('messageReactionAdd', async (reaction, user) => {
                    if (reaction.message.partial) {
                        await reaction.message.fetch();
                    }
                    if (reaction.partial) {
                        await reaction.fetch();
                    }
                    if (user.bot) {
                        return;
                    }
                   if (!args.includes(user.id) && reaction.message.id === messageEmbed.id) {
                        if(anVaList.includes(user.id)){
                           reaction.users.remove(user);
                           return;
                        }
                        message.channel.send(`Ơ hay bạn  <@${user.id}>  có trúng giải đâu mà đòi nhận quà <:zemo_pikameh:729555091937427516>`);
                        anVaList.push(user.id);
                        reaction.users.remove(user);
                        return;
                    }
                    if (reaction.message.id === messageEmbed.id) {  
                        for (let index = 0; index < data.element.length; index++) {
                            let reactGift2 = data.element[index];
                            if(reaction.emoji.id === reactGift2.icon){
                                if (userArray.includes(user.id)) {
                                    console.log(`<@${user.tag}> đã react: ${reactGift2.icon}`);
                                    console.log(`<@${user.tag}> nhận quà rồi thì té chỗ khác bạn ei`);
                                    reaction.users.remove(user);
                                    return;
                                } else{
                                    let giftRandom = Math.floor(Math.random() * data.gift.length);
                                    for (let index = 0; index < data.gift.length; index++) {
                                        let reactGift = data.element[index];
                                        if (giftNameArray.includes(reactGift.name)) {
                                            console.log(`<@${user.tag}> đã react: ${reactGift.icon}`);
                                            console.log(`<@${user.tag}> chọn quà khác nhé, quà này có người nhận rồi`);
                                            reaction.users.remove(user);
                                            return;
                                        } else{
                                            if (giftQuota.includes(giftRandom)) {
                                              //het qua
                                                if (count > args[0]-1 && !hetQua) {
                                                  message.channel.send(`Quà đã phát hết, giải tán đê! `);
                                                  reaction.users.remove(user);
                                                  hetQua = true;
                                                  return;
                                                }      
                                                //prevent user spam
                                                if (count > args[0]-1) {                                                  
                                                  reaction.users.remove(user);
                                                  return;
                                                }  
                                              //trung qua
                                                if (giftArray.includes(giftRandom)) {
                                                    continue;
                                                }
                                                message.channel.send(`Chúc mừng  <@${user.id}>  đã trúng phần quà từ ${reactGift.name} : `  + data.gift[giftRandom].description);
                                                userArray.push(user.id);
                                                userNameArray.push(`<@${user.id}>`)
                                                giftArray.push(giftRandom);
                                                giftNameArray.push(reactGift.name);
                                                let mint2 = new MessageEmbed()
                                                .setTitle("Thống kê danh sách trúng thưởng")
                                                .addFields(
                                                    { name: 'React phía dưới để nhận quà', value: "Mỗi người chỉ nhận được 1 lần \n Phần quà đã được chọn thì người khác không nhận được nữa" },
                                                        { name: `Phần quà đã được claim: `, value: `${giftNameArray}` },
                                                        { name: `Những người đã nhận: `, value: `${userNameArray}` },
                                                    )
                                                
                                                messageEmbed.edit({ embeds: [mint2]});
                                                count ++;
                                                //last user -> out of gift
                                                if (count >= args[0] && !hetQua) {
                                                    message.channel.send(`Quà đã phát hết, giải tán đê! `);
                                                    hetQua = true;
                                                    count ++;
                                                    return;
                                                  }
                                                return;  
                                            }
                                        }
                                    }
                                    return;
                                }
                            } 
                            //prevent adding reaction
                            // else  reaction.users.remove(user);
                        }
                    }
                });
                return;
    } catch (error) {
        console.log(error);
        let channel2 = client.channels.cache.get('959120662188933191');
        await channel2.send("Error at giftevent.js");
    }
        
}

module.exports.help = {
  name: 'giftevent',
  aliases: ["o"],
  description: "bruh"
}
