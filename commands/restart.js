const Discord = require('discord.js');
const cfg = require(`../config.json`)
const id = cfg.donoId
/**
 *
 * @param {Discord.Client} client
 * @param {Discord.Message} msg
 */
module.exports.run = (client, msg, args) =>{
    if(msg.author.id == id){
        msg.channel.send(`Reiniciando`).then(() => {
            client.destroy()
            
        })
        .catch(err =>{
            msg.channel.send(`Ocorreu um erro ao reiniciar`)
        })
        .then(() => {
            client.login(cfg.token)
            msg.channel.send(`Bot Reiniciando`)
        })
    }else{
        msg.channel.send(`Solicitacao nao aceita`)
    }
}