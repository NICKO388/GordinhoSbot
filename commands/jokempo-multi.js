const Discord = require('discord.js');
const { ftruncateSync } = require('fs');
const filter = m => m.content.includes('');
const cfg = require(`../config.json`)
/**
 *
 * @param {Discord.Client} client
 * @param {Discord.Message} msg
 */

exports.run = async (client, msg, args) => {
    const member = msg.guild.member(msg.mentions.users.first())
    if(!member){
        msg.channel.send(`usuario invalido`)
        return;
    }
    let hasEnded = false
    console.log(client.user.id)
    if(member.user.id == client.user.id){
        msg.channel.send(`Voce nao pode me chamar para jogar, este comando foi feito para ser jogado apenas por humanos. se voce quiser jogar comigo, utiliza ${cfg.prefix}jokempo`)
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
        embed.setTitle(`Jokempo ${msg.author.username} com $${member.user.username}`)
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
            resultMessage = `<@${msg.author.id}> Cortou o papel de <@${member.user.id}>!\n`
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
            {name: "Mensagem de resultado", value: resultMessage},
            {name: 'Jogar Novamente', value: 'Jogue novamente reagindo a 🔁', inline: true}

        )
        if(Winner == member.user.id){
            embed.setThumbnail(`${member.user.displayAvatarURL()}`)
        }else if(Winner == "empate"){

            embed.setThumbnail(`https://i.pinimg.com/originals/d0/e2/d7/d0e2d700625df98e7fa2438e14bd56b1.jpg`)
        }else{
            embed.setThumbnail(`${msg.author.displayAvatarURL()}`)
        }
        


        msg.channel.send(embed).then(message => {
            message.react('🔁')
            const filter = (reaction, user) => {
                return reaction.emoji.name === '🔁';
            };
            
            const collector = message.createReactionCollector(filter, { time: 25000 });
            
            collector.on('collect', (reaction, user) => {
                if(user.id == msg.author.id){
                    console.log(`Collected ${reaction.emoji.name} from ${user.tag}`);
                    msg.channel.send("reiniciando game")
                    let restartGame = require('./jokempo-multi.js')
                    restartGame.run(client, msg, args)
                    
                }
                
                
            
            });
            
            collector.on('end', collected => {
                console.log(`Collected ${collected.size} items`);
            });
            
           

        })






    }
    function stopGame(){
        if(hasEnded){
            msg.channel.send(`O jogo entre <@${msg.author.id}> e <@${member.user.id}>`)
            return;
        }
        if(Choiced == null && MachineChoiced == null){
            msg.channel.send(`o jogo entre ${msg.author} e <@${member.user.id}> foi encerrado\nMotivo: Nenhum deles respondeu`)
            
            return;
        }
        if(Choiced == null){
            msg.channel.send(`o jogo entre ${msg.author} e <@${member.user.id}> foi encerrado\nMotivo: <@${msg.author.id}> nao respondeu`)
            return
        }
        if(MachineChoiced == null){
            msg.channel.send(`o jogo entre ${msg.author} e <@${member.user.id}> foi encerrado\nMotivo: <@${member.user.id}> nao respondeu`)
            return
        }
    }
    async function ForceStop(){
        
        hasEnded = true
        stopGame()
        return;
    }
   createdm()
   
    msg.channel.send(`As opcoes seram mandadas na dm do ${msg.author} e do <@${member.id}>. abram elas por favor!`).then(() =>{
        
        const ops = new Discord.MessageEmbed
        
        ops.setDescription(`
            1 = ${Opcoes[0]}
            2 = ${Opcoes[1]}
            3 = ${Opcoes[2]}
            p = ${Opcoes[0]}
            pp = ${Opcoes[1]}
            t = ${Opcoes[2]}
            pedra = ${Opcoes[0]}
            papel = ${Opcoes[1]} 
            tesoura = ${Opcoes[2]}

        `)
        
        
        //let Opcoes = ['pedra', 'papel', 'tesoura']
       
        async function reactDmMsgAuthor(){
            const filter = (reaction, user) => {
                return reaction.emoji.name == '✂️' || reaction.emoji.name == '🪨' || reaction.emoji.name == '📰'
            };
            const dm = await msg.author.send('Reaja ah uma das opcoes')
            dm.react('✂️')
            dm.react('🪨')
            dm.react('📰')
            const collector = dm.createReactionCollector(filter, {time: 15000})
            collector.on('collect', (reaction, user) => {
                if(user.id == msg.author.id){
                    switch(reaction.emoji.name){
                        case "✂️":
                            console.log('colletado tesoura')
                            Choiced = Opcoes[2]
                            collector.stop()
                        
                            break
                        case "🪨":
                            console.log('colletado pedra')
                            Choiced = Opcoes[0]
                            collector.stop()
                        
                            break
                        case "📰":
                            console.log('colletado papel')
                            Choiced = Opcoes[1]
                            collector.stop()
                        
                            break
                    }
                    if(MachineChoiced != null)
                    {
                        defineWinner()
                    }

                }
                
            })

        }
        async function reactDmMember(){
            const filter = (reaction, user) => {
                return reaction.emoji.name == '✂️' || reaction.emoji.name == '🪨' || reaction.emoji.name == '📰'
            };
            const dm = await member.user.send('Reaja ah uma das opcoes')
            dm.react('✂️')
            dm.react('🪨')
            dm.react('📰')
            const collector = dm.createReactionCollector(filter, {time: 15000})
            collector.on('collect', (reaction, user) => {
                if(user.id == member.user.id){
                    switch(reaction.emoji.name){
                        case "✂️":
                            console.log('colletado tesoura')
                            MachineChoiced = Opcoes[2]
                            collector.stop()
                        
                            break
                        case "🪨":
                            console.log('colletado pedra')
                            MachineChoiced = Opcoes[0]
                            collector.stop()
                        
                            break
                        case "📰":
                            console.log('colletado papel')
                            MachineChoiced = Opcoes[1]
                            collector.stop()
                        
                            break
                    }
                    if(Choiced != null){
                        defineWinner()
                    }


                }
                
            })

        }
        reactDmMsgAuthor()
        reactDmMember()
        
            
            
            
        
            

        
        
        
    
    
    }).catch(err => {
        console.log(err)
    })
    setTimeout(stopGame, 25000)

}
