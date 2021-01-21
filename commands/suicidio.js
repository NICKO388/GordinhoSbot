const Discord = require('discord.js');

/**
 *
 * @param {Discord.Client} client
 * @param {Discord.Message} msg
 */

exports.run = (client, msg, args) => {
    const emojiList = msg.guild.emojis.cache.array()
    
    msg.channel.send(`${msg.author} acabou de deixar a vida, para entrar para historia do servidor ${msg.guild.name}. reaja para ter o seu F`).then(message => {
        
        message.react(emojiList[1].toString())
    })
    
    

}