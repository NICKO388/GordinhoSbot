const Discord = require('discord.js');
const firebase = require('firebase')
const config = require(`../config.json`)
var configf = {
    apiKey: "AIzaSyDPOhaOWgOrOZUFuNs8ItiRYdhn2hegU5c",
    authDomain: "gordobot-29fb7.firebaseapp.com",
    projectId: "gordobot-29fb7",
    storageBucket: "gordobot-29fb7.appspot.com",
    messagingSenderId: "201390084254",
    appId: "1:201390084254:web:a1eec55a4a0f6b3d306b8f",
    measurementId: "G-7C2SEBB71J"
  };
  // Initialize Firebase
  firebase.initializeApp(configf);
  //firebase.default.analytics();
  
  const database = firebase.default.database()
 


/**
 *
 * @param {Discord.Client} client
 * @param {Discord.Message} msg
 */

 exports.run = (client, msg, args) => {
     if(args.length < 1){
         msg.channel.send(`O uso deste comando eh: ${config.prefix}linguagem -u @user\n ou  ${config.prefix}linguagem -lf <suaLinguagemFavorita>`)
     }
     if(args.length == 2){
         if(args[0] == "-linguagem-favorita" || args[0] == "-lf"){

            

            database.ref(`usuarios/code/linguagem/favorita/${msg.author.id}`)
            .once(`value`).then(async function(db){
                if(db.val() == null){
                    database.ref(`usuarios/code/linguagem/favorita/${msg.author.id}`)
                    .set({
                        Linguagemf: args[1] 
                    })
                    msg.channel.send(`Parabens ${msg.author}. sua linguagem preferida foi setada como ${args[1]}`)
                }else{
                    
                    database.ref(`usuarios/code/linguagem/favorita/${msg.author.id}`)  
                    .update({
                        Linguagemf: args[1]
                        
                    })
                    
                    msg.channel.send(`Parabens ${msg.author}. sua linguagem preferida foi atualizada para ${args[1]}`)
                }
            })
         }
         if(args[0] == "-u" || args[0] == "-user"){
             const user = msg.guild.member(msg.mentions.users.first())
             if(!user){
                msg.channel.send(`O usuario que voce colocou nao eh valido`)
                return;
             }
            database.ref(`usuarios/code/linguagem/favorita/${user.id}`)
            .once(`value`).then(async function(db){
                if(db.val() == null){
                    msg.channel.send("este usuario nao escolheu a linguagem favorita dele")
                    return;
                }
                msg.channel.send(`a linguagem favorita de <@${user.id}> eh ${db.val().Linguagemf}`)

            })
         }
     }
    
 }
