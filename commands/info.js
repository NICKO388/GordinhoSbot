const Discord = require('discord.js');

/**
 *
 * @param {Discord.Client} client
 * @param {Discord.Message} msg
 */

 exports.run = (client, msg, args) => {
     msg.author.send(`Algumas De Suas informacoes em`)
     const embed = new Discord.MessageEmbed
     const MemberInfo = msg.author.toJSON()
     embed.setTitle(`Suas Informacoes`)
     embed.setDescription(`Seu Id: ${MemberInfo.id}\nSeu Nome de usuario: ${MemberInfo.username}\nVoce eh um bot: ${MemberInfo.bot}\nSua Tag Discord: ${MemberInfo.discriminator}\n`)
     embed.setURL(MemberInfo.avatarURL)
     embed.setImage(msg.author.displayAvatarURL())
     console.log(msg.author.toJSON())
     msg.author.send(embed)
 }