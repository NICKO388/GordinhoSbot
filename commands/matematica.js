const Discord = require('discord.js');
const cfg = require(`../config.json`)
/**
 *
 * @param {Discord.Client} client
 * @param {Discord.Message} msg
 */
module.exports.run = async(client, msg, args) => {
    const filter = m => m.content.includes('');
    const collector = msg.channel.createMessageCollector(filter, {time: 15000})
    const id = msg.author.id
    let Getter
    let Numbers = [2]
    let type = ["-", "x", "+"]
    let typeChoosed
    function random(NumeroMaximo){
        return Math.floor(Math.random() * Number(NumeroMaximo))
    }
    function ChooseOperator(){
        typeChoosed = type[Math.floor(Math.random() * type.length)]
        console.log(Math.floor(Math.random() * type.length))
        return;
    }
    function ChooseNumbers(){
        Numbers[0] = random(75)
        Numbers[1] = random(75)
        return;
    }
    ChooseOperator()
    ChooseNumbers()
    let FinalResult
    function calcResult(){
        if(typeChoosed == "-"){
            FinalResult = Numbers[0] - Numbers[1]
        }
        if(typeChoosed == "+"){
            FinalResult = Numbers[0] + Numbers[1]
        }
        if(typeChoosed == "x"){
            FinalResult = Numbers[0] * Numbers[1]
            
        }
        return FinalResult
    }
    console.log(typeChoosed)
   msg.channel.send(`Seja bem vindo ao jogo de matematica`)
   msg.channel.send(`Quanto eh ${Numbers[0]} ${typeChoosed} ${Numbers[1]}`)
    collector.on(`collect`, m => {
        
        if(m.author.id == msg.author.id){
            Getter = m.content
            if(m.content.startsWith(`${cfg.prefix}`)){
                msg.channel.send(`Voce nao pode iniciar um jogo novo`)
                return;
            }
            console.log(`${m.content}`)
            if(Number(m.content) == calcResult()){
                msg.channel.send(`:partying_face: Voce Acertou! :partying_face: `)
            }else{
                msg.channel.send(`Voce errou ;( o resultado correto era: ${FinalResult}`)
            }
        
            collector.stop()
        }
        
    })
    
    
}
