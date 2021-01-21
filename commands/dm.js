const { DiscordAPIError, DMChannel } = require("discord.js");
const Discord = require('discord.js');

/**
 *
 * @param {Discord.Client} client
 * @param {Discord.Message} msg
 */

let send = true
exports.run = (client, msg, args) => {
    const user = msg.mentions.users.first();
    if(!user){
        msg.channel.send(`Eu nao pude mandar mensagem para esse usuario por que ele nao existe`)
        return
    }
        args[0] = ""

        user
            .createDM()
            .then((DMChannel) => {
                DMChannel
                    .send(args.join(" "))
                    .catch(err => {
                        msg.channel.send("O Usuario provavelmente tem a dm fechada")
                        console.log(err)
                        return;
                    })
                    
            });
        
    client.on('UnhandledPromiseRejectionWarning', error => {
        msg.channel.send(`Nao pude fazer esta operacao, um erro ocorreu: ${error}`)
    })
    

}
