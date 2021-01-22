const Discord = require('discord.js');

/**
 *
 * @param {Discord.Client} client
 * @param {Discord.Message} msg
 */
exports.run = (client, msg, args) => {
    const member = msg.guild.member(msg.mentions.users.first())
    if(args.length < 1){
        const embed = new Discord.MessageEmbed
        embed.setDescription(`Voce precisa marcar alguem para dar um tapa nela`)
        embed.setImage(`https://media.tenor.com/images/7ddfb41b70e3908040f9f476a6355371/tenor.gif`)
        msg.channel.send(embed)
        return;
    }
    if(args.length >= 1){
        if(!member){
            msg.channel.send(`Usuario $${args[0]} invalido`)
            return;
        }
        const embed = new Discord.MessageEmbed
        
        embed.setTitle(`Um tapa na gostosa`)
        embed.setColor(1146986)
        .setThumbnail(`${member.user.displayAvatarURL()}`)
        .setImage(`https://i.imgur.com/K8aVYW0.gif`)
        .setDescription(`<@${member.user.id}> levou um Tapa de ${msg.author}`)
        msg.channel.send(embed)


    }
}
