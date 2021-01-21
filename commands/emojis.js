const { MessageEmbed } = require("discord.js")
const Discord = require('discord.js');

/**
 *
 * @param {Discord.Client} client
 * @param {Discord.Message} msg
 */
exports.run = (client, msg, args) => {
    const emojis = msg.guild.emojis.cache.array()   
    console.log(`${emojis.length}`)
    msg.channel.send(`${msg.author} voce sera spammado com os emojis do servidor`)
    for(let i = 0; i< emojis.length; i++){
        const embed = new MessageEmbed()
        embed.setDescription(`${emojis[i]}`)
        embed.setTitle(`Emoji ${i} de ${emojis.length}`)
        msg.author.send(embed)
    }
}