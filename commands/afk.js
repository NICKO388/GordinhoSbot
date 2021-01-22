
const Discord = require('discord.js');
const config = require(`../config.json`)
const afkmanage = require("../afks.json")
const time = new Date()
/**
 *
 * @param {Discord.Client} client
 * @param {Discord.Message} msg
 */

exports.run = (client, msg, args) => {
    
    if(args.length < 1){
        if(afkmanage.afk.includes(msg.author.username)){
            msg.reply(`Voce ja esta no modo afk`)
            return;
        }
        msg.channel.send(`Voce Foi adicionado a lista de afks`)
        if(afkmanage.afk.length >= 1){
            afkmanage.afk[afkmanage.afk.length] = msg.author.username
        }else{
            afkmanage.afk[0] = msg.author.username
        }
        
        console.log(afkmanage.afk)
        return;
    }
    if(args.length == 1){
        if(args[0] == "-afkList" || args[0] == "-al"){
            const embed = new Discord.MessageEmbed
            embed.setTitle(`AFK List ${time.getDate()}:${time.getHours()}:${time.getMinutes()}: `)
            let desc = "AFKs: \n"
            if(afkmanage.afk.length < 1){
                msg.reply(`Ninguem esta AKF ate agora`)
                return;
            }
            for(let i = 0; i < afkmanage.afk.length; i++){
                desc += `${afkmanage.afk[i]}\n`

            }
            if(desc.length < 1750){
                embed.setDescription(desc)
            }else{
                msg.channel.send(`Tem muitas pessoas AFKs, nao posso mostrar todas aqui`)
            }
            
            embed.setThumbnail(client.user.displayAvatarURL())
            embed.addFields(
                {name: "Numero de afks", value: `${afkmanage.afk.length}`}
            )
            .setFooter(`Afk list ${time.getTime()}`)
            msg.channel.send(embed)
        }

        
    }
}