const {Client, Message, MessageEmbed} = require('discord.js');
// const {pagination } = require('reconlx');

module.exports.run = async (client, message, args, prefix, DMprefix, Discord) => {
      
        if(args[0]) message.reply(`ý bạn là ${prefix}qglist?`);
       
        // var mint = args[0].toLowerCase();
        const fs = require('fs');
        var nanika = new Map();
        var slash = "※................................................※ \n";
        var data= null;
        try {
            const jsonString = fs.readFileSync("./data/charList.json");
            data = JSON.parse(jsonString);
        } catch (err) {
            console.log(err);
            return;
        }
        try{

        // for (let index = 0; index < data.character.length; index++) {
                         
                
                var AuthorUser = message.author.id;
                for (let index = 0; index < data.element.length; index++) {
                    const culac = data.element[index];
                    let mint1 = new MessageEmbed()
                    .setTitle(culac.vnName)
                    .setDescription(slash + culac.characters + slash)
                    .setThumbnail(culac.thumnail)
                    .addField('Cú pháp mẫu', `${prefix}qg hutao`, true)
                    .setColor(culac.color);
                    
                    nanika.set(culac.name,mint1);                   
                }
                let messageEmbed =  await message.channel.send({ embeds: [nanika.get('Pyro')] });
                
                //fetch reaction
                for (let index = 0; index < data.element.length; index++) {
                    const culac = data.element[index];
                    messageEmbed.react(culac.icon);
                }

                //handle user reaction
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

                    if (AuthorUser === user.id && reaction.message.id === messageEmbed.id) {  
                        if(reaction.emoji.id === data.element[0].icon){
                          messageEmbed.edit({ embeds: [nanika.get(data.element[0].name)]});
                          reaction.users.remove(user);
                          return;
                        } else
                        if(reaction.emoji.id === data.element[1].icon){
                          messageEmbed.edit({ embeds: [nanika.get(data.element[1].name)]});
                          reaction.users.remove(user);
                          return;
                        } else
                        if(reaction.emoji.id === data.element[2].icon){
                          messageEmbed.edit({ embeds: [nanika.get(data.element[2].name)]});
                          reaction.users.remove(user);
                          return;
                        } else
                        if(reaction.emoji.id === data.element[3].icon){
                          messageEmbed.edit({ embeds: [nanika.get(data.element[3].name)]});
                          reaction.users.remove(user);
                          return;
                        } else
                        if(reaction.emoji.id === data.element[4].icon){
                          messageEmbed.edit({ embeds: [nanika.get(data.element[4].name)]});
                          reaction.users.remove(user);
                          return;
                        } else
                        if(reaction.emoji.id === data.element[5].icon){
                          messageEmbed.edit({ embeds: [nanika.get(data.element[5].name)]});
                          reaction.users.remove(user);
                          return;
                        }
                          reaction.users.remove(user);
                    } else if(reaction.message.id === messageEmbed.id){
                      reaction.users.remove(user);
                    }
                    // for (let index = 0; index < data.element.length; index++) {
                    //     const vestoe = data.element[index];
                    //   console.log("emoji ID " +reaction.emoji.id +", icon: " + vestoe.icon);
                    //     if (reaction.emoji.id === vestoe.icon) {
                    //         console.log("User " +user.id +", " + user.tag+ " chon: " + vestoe.name);
                    //         console.log("Author User " +message.author.tag);
                    //         if (AuthorUser === user.id) {
                    //             nanika.forEach((values,keys)=>{
                    //                 if(keys === vestoe.name){
                    //                     messageEmbed.edit({ embeds: [values] })
                    //                     reaction.users.remove(user);
                    //                     return;
                    //                 }
                    //             })
                    //         }
                    //     }
                    //     reaction.users.remove(user);
                        
                    // }
                });
                return;
              } catch (error) {
                console.log(error);
                let channel2 = client.channels.cache.get('959120662188933191');
                await channel2.send("Error at qglist.js");
            }
        
}

module.exports.help = {
  name: 'qglist',
  aliases: ["o"],
  description: "bruh"
}