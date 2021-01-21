
const Discord = require('discord.js');
const config = require(`../config.json`)

/**
 *
 * @param {Discord.Client} client
 * @param {Discord.Message} msg
 */
exports.run = (client, msg, args) => {
    const windowsR = msg.guild.roles.cache.find(cargo => cargo.name == "windows")
    const linuxR = msg.guild.roles.cache.find(cargo => cargo.name == "linux")
    const macR = msg.guild.roles.cache.find(cargo => cargo.name == "mac")
    
    
    
    
    if(args.length <= 0){
        msg.reply(`Este comando tem dois Usos; \nUso 1: ${config.prefix}os -myos <windows/linux/mac>\nUso 2: ${config.prefix}os -u @user`)
        return;
    }
    if(args.length >= 2){
        if(args[0] == `-myos`){
            if(msg.member.roles.cache.find(cargos => cargos.name == "linux")){
                msg.member.roles.remove(linuxR)
            }
            if(msg.member.roles.cache.find(cargos => cargos.name == "mac")){
                msg.member.roles.remove(macR)
            }
            if(msg.member.roles.cache.find(cargos => cargos.name == "windows")){
                msg.member.roles.remove(windowsR)
                
            }
            if(args[1] == "windows" || args[1] == "linux" || args[1] == "mac"){
                if(args[1] == "linux") {
                    msg.member.roles.add(linuxR).catch(err =>{
                        msg.channel.send(`nao consegui inserir um cargo`)
                    })
                }
                if(args[1] == "mac") {
                    msg.member.roles.add(macR).catch(err =>{
                        msg.channel.send(`nao consegui inserir um cargo`)
                    })
                }
                if(args[1] == "windows") {
                    msg.member.roles.add(windowsR).catch(err =>{
                        msg.channel.send(`nao consegui inserir um cargo`)
                    })
                }
                msg.channel.send(`Voce mudou seu cargo para ${args[1]} corretamente`)
                
            //    .catch(err => {
            //         
            //     })
            }else{
                msg.reply(`${args[1]} <- Sistema Operaciol nao reconhecido`)
            }
        }
        if(args[0] == "-u"){
            console.log(`bruh`)
            const user = msg.mentions.users.first()
        
        if(user){
            const member = msg.guild.member(user)
            if(member.roles.cache.find(cargos => cargos.name == "linux")){
                msg.channel.send(`o usuario ${member.user} usa linux`)
                return;
            }
            if(member.roles.cache.find(cargos => cargos.name == "mac")){
                msg.channel.send(`o usuario ${member.user} usa mac`)
                return;
            }
            if(member.roles.cache.find(cargos => cargos.name == "windows")){
                msg.channel.send(`o usuario ${member.user} usa windows`)
                return;
            }
            
        }else{
            msg.reply("Usuario invalido")
        }
        }
    }



}