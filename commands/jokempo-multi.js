const Discord = require('discord.js');
const filter = m => m.content.includes('');
/**
 *
 * @param {Discord.Client} client
 * @param {Discord.Message} msg
 */

exports.run = (client, msg, args) => {
    const member = msg.guild.member(msg.mentions.users.first())
    if(!member){
        msg.channel.send(`usuario invalido`)
        return;
    }
    if(member.id == msg.author.id){
        msg.channel.send(`Voce nao pode chamar voce msm para jogar`)
        return;
    }
    let Opcoes = ['pedra', 'papel', 'tesoura']
    let Choiced
    let MachineChoiced
    async function createdm() {
        await member.user.createDM()
        await msg.author.createDM()
    }


    function defineWinner(){
        let resultMessage
        let result
        let Winner
        
        const embed = new Discord.MessageEmbed
        embed.setTitle(`Jokempo <@${msg.author.id}>`)
        embed.setImage(`https://j.gifs.com/Kz7r2b.gif`)
        if(MachineChoiced == null || Choiced == null){
            result = "Nao definido"
            resultMessage = `nao definido`
        }
        if(Choiced == Opcoes[0] && MachineChoiced == Opcoes[1]){
            resultMessage = `A pedra de <@${msg.author.id}> foi embrulhado por <@${member.user.id}>`
            result = member.user.id
        }
        if(Choiced == Opcoes[1] && MachineChoiced == Opcoes[0]){
            resultMessage = `o  papel de <@${msg.author.id}> embrulhou a pedra de <@${member.user.id}>!\n`
            result = msg.author.id
        }
        if(Choiced == Opcoes[0] && MachineChoiced == Opcoes[2]){
            result = msg.author.id
            resultMessage = `A pedra de <@${msg.author.id}> quebrou a tesoura de <@${member.user.id}>!\n`
        }
        if(Choiced == Opcoes[2] && MachineChoiced == Opcoes[0]){ //lost
            resultMessage = `A pedra de <@${member.user.id}> quebrou a tesoura de <@${msg.author.id}> !\n`
            result = member.user.id
        }
        if(Choiced == Opcoes[2] && MachineChoiced == Opcoes[1]){
            resultMessage = `<@${msg.author.id}> Cortou o papel de ${member.user.id}!\n`
            result = msg.author.id
        }
        if(Choiced == Opcoes[1] && MachineChoiced == Opcoes[2]){
            resultMessage = `<@${member.user.id}> Corteu o papel de <@${msg.author.id}> !\n`
            result = member.user.id
        }
        if(Choiced == MachineChoiced){
            resultMessage = `Nos empatamos`
            result = "empate"
        }
        if(result == member.user.id){
            Winner = `<@${member.user.id}>`
        }else if(result == "empate"){
            Winner = `empate`
        }else{
            Winner = `<@${msg.author.id}>`
        }
        embed.addFields(
            {name: "Winner", value: `${Winner}`},
            {name: "Mensagem de resultado", value: resultMessage}

        )
        if(Winner == member.user.id){
            embed.setThumbnail(`${member.user.displayAvatarURL()}`)
        }else if(Winner == "empate"){

            embed.setThumbnail(`https://i.pinimg.com/originals/d0/e2/d7/d0e2d700625df98e7fa2438e14bd56b1.jpg`)
        }else{
            embed.setThumbnail(`${msg.author.displayAvatarURL()}`)
        }
        
        msg.channel.send(embed)
    }
    
   createdm()
    msg.channel.send(`As opcoes seram mandadas na dm do ${msg.author} e do <@${member.id}>. abram elas por favor!`).then(() =>{
        
        member.user.send(`Digite a opcao\nOpcoes: ${Opcoes}`).then(() => {
            member.user.dmChannel.awaitMessages(filter, {max: 1, time: 25000, errors: [`time`]})
                .then(collected => {
                    if(collected.array().join('') == Opcoes[0] || collected.array().join('') == Opcoes[1] || collected.array().join('') == Opcoes[2]){
                        MachineChoiced = collected.array().join('')
                        member.user.send(`a opcao selecionado foi ${collected.array()}`)
                    }else{
                        msg.channel.send(`Jogo cancelado devido ao <@${member.id}> ter escolhido uma opcao invalida`)
                        return;
                    }
                })
        }).catch(time => {
            msg.channel.send(`O tempo acabou`)
            console.log(time)

        })
        
        msg.author.send(`Digite a opcao\nOpcoes: ${Opcoes}`).then(() => {
            msg.author.dmChannel.awaitMessages(filter, {max: 1, time: 25000, errors: [`time`]})
                .then(collected => {
                    if(collected.array().join('') == Opcoes[0] || collected.array().join('') == Opcoes[1] || collected.array().join('') == Opcoes[2]){
                        Choiced = collected.array().join('')
                        msg.author.send(`a opcao selecionado foi ${collected.array()}`)
                        
                    }else{
                        msg.channel.send(`Jogo cancelado devido ao <@${msg.author.id}> ter escolhido uma opcao invalida`)
                        return;
                    }
                })
        }).catch(err => {
            msg.channel.send(`O tempo acabou`)
            console.log(err)
        })
        
        msg.channel.send(`Enviando resultadoe em 20 segundos`)
        setTimeout(defineWinner, 20000)
    
    
    }).catch(err => {
        console.log(err)
    })


}