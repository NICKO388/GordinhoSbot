const { MessageEmbed } = require("discord.js")
const Discord = require('discord.js');

/**
 *
 * @param {Discord.Client} client
 * @param {Discord.Message} msg
 */
exports.run = (client, msg, args) => {
    const filter = m => m.content.includes('');
    
    let i = 0
    
    const emojis = msg.guild.emojis.cache.array()   
    console.log(`${emojis.length}`)
    if(args[0] == "-parar"){
        i = emojis.length + 10;
        return;
    }

    
    msg.channel.send(`${msg.author} voce sera spammado com os emojis do servidor. Digite "cancelar" em 30 segundos para cancelar (voce nunca mais tera essa oportunidade)`).then(() => {
        
        msg.channel.awaitMessages(filter, {max: 1, time: 30000, errors: [`time`]})
            .then(collected => {
                if(collected.first().author.id == msg.author.id){
                    if(collected.array().join(" ").includes("cancelar")){
                        i = emojis.length + 10;
                        msg.channel.send(`Cancelado com sucesso`)
                        return;
                    }
                }
                
            }).catch(collected => {
                msg.channel.send(`Parece que nao cancelaram`)
                sendEmojis()
            })
    })
    
    function sendEmojis(){
        for(i; i< emojis.length; i++){
            const embed = new MessageEmbed()
            embed.setDescription(`${emojis[i]}`)
            embed.setTitle(`Emoji ${i} de ${emojis.length}`)
            msg.author.send(embed)
        }
    }
    
}
