const Discord = require('discord.js');
const filter = m => m.content.includes('');
/**
 *
 * @param {Discord.Client} client
 * @param {Discord.Message} msg
 */

exports.run = (client, msg, args) => {
    let Opcoes = ['pedra', 'papel', 'tesoura']
    let Choiced
    let MachineChoiced
    function choiceOp() {
        MachineChoiced = Opcoes[Math.floor(Math.random() * 3)]
        console.log(`${MachineChoiced}`)
    }
    function defineWinner(){
        let resultMessage
        let result
        let Winner
        
        const embed = new Discord.MessageEmbed
        embed.setTitle(`Jokempo <@${msg.author.id}>`)
        embed.setImage(`https://j.gifs.com/Kz7r2b.gif`)
        if(Choiced == Opcoes[0] && MachineChoiced == Opcoes[1]){
            resultMessage = `A sua pedra foi embrulhada pelo meu papel!`
            result = "Voce perdeu"
        }
        if(Choiced == Opcoes[1] && MachineChoiced == Opcoes[0]){
            resultMessage = `o seu papel embrulhou minha pedra!\n`
            result = "Voce ganhou"
        }
        if(Choiced == Opcoes[0] && MachineChoiced == Opcoes[2]){
            result = "Voce ganhou"
            resultMessage = `A sua pedra quebrou minha tesoura!\n`
        }
        if(Choiced == Opcoes[2] && MachineChoiced == Opcoes[0]){ //lost
            resultMessage = `A minha pedra quebrou sua tesoura!\n`
            result = "Voce perdeu"
        }
        if(Choiced == Opcoes[2] && MachineChoiced == Opcoes[1]){
            resultMessage = `Voce Cortou meu papel!\n`
            result = "Voce ganhou"
        }
        if(Choiced == Opcoes[1] && MachineChoiced == Opcoes[2]){
            resultMessage = `Eu Cortei seu papel!\n`
            result = "Voce perdeu"
        }
        if(Choiced == MachineChoiced){
            resultMessage = `Nos empatamos`
            result = "empate"
        }
        if(result == "Voce perdeu"){
            Winner = "Maquina"
        }else if(result == "empate"){
            Winner = `empate`
        }else{
            Winner = `${msg.author.displayAvatarURL()}`
        }
        embed.addFields(
            {name: "Winner", value: `${Winner}`},
            {name: "Situacao", value: `${result}\n`},
            {name: "Mensagem de resultado", value: resultMessage}

        )
        if(Winner == "Maquina"){
            embed.setThumbnail(`${client.user.displayAvatarURL()}`)
        }else if(Winner == "empate"){

            embed.setThumbnail(`https://i.pinimg.com/originals/d0/e2/d7/d0e2d700625df98e7fa2438e14bd56b1.jpg`)
        }else{
            embed.setThumbnail(`${msg.author.displayAvatarURL()}`)
        }
        
        msg.channel.send(embed)
    }
    choiceOp()
    msg.channel.send(`Voce Comecou um jogo de jokempo. digita a sua opcao <${Opcoes}>. voce tem 20 segundos`).then(() => {
        msg.channel.awaitMessages(filter, {max: 1, time: 20000, errors: ['time']})
        .then(collected => {
            
            if(collected.first().author.id == msg.author.id){
                console.log(`${collected.array().join('')}`)
                if(collected.array().join('') == Opcoes[0] || collected.array().join('') == Opcoes[1] || collected.array().join('') == Opcoes[2]){
                    Choiced = collected.array().join(``)
                    defineWinner()



               }else{
                   msg.channel.send(`opcao invalida!`)
               }
                
            }
        }).catch(collected =>{
            msg.channel.send(`Voce nao selecionou nenhuma opcao`)
        })
    })
    
    


}
