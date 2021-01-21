const discord = require('discord.js')
const client = new discord.Client()
const config = require('./config.json')
const blocked = require(`./blockedwords.json`)
const prefix = config.prefix
client.on('ready', () => {
    console.log("sto vivu")
    client.user.setActivity("Bot Em Desenvolvimento, feito em js")
})
client.on('message', msg => {
    if(msg.author.bot) return;
    if(msg.mentions.has(client.user.id)){
        msg.channel.send(`Ola, ${msg.author}! digite ${prefix}help para uma lista de comandos`)
    }
    for(let i = 0; i < blocked.blocked.length; i++){
        if(msg.content.includes(blocked.blocked[i])){
            let block = false
            if(msg.member.hasPermission("BAN_MEMBERS")){
                block = false
            }else{
                block = true
            }
            if(block){
                msg.delete(msg.author.lastMessage)
                msg.reply("Por favor, nao mencione mencione everyone/here")
                return;
            }
        }
    }
    
    
    if(msg.channel.type == 'dm') return;
    if(!msg.content.startsWith(`${prefix}`)) return;    

    let comando = msg.content.toLowerCase().split(' ')[0];
    comando = comando.slice(prefix.length)
    
    const args = msg.content.split(" ").slice(1)
    try{
        let aComando = require(`./commands/${comando}.js`)
        aComando.run(client, msg, args)
    }catch (err){
        msg.reply(`eu nao achei o comando ${comando}, talvez voce digitou errado, ou foi removido. veja uma lista de comandos`)
        let ComandList = require(`./commands/ajuda.js`)
        ComandList.run(client, msg, args)
        console.log(err)
    }
   

})

client.login(config.token)