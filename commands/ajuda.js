const { dir } = require('console');
const Discord = require('discord.js');
const config = require(`../config.json`)

/**
 *
 * @param {Discord.Client} client
 * @param {Discord.Message} msg
 */

const fs = require('fs')
const path = require('path')
exports.run = (client, msg, args) => {
    let desc = "Comandos: \n"
    files = fs.readdirSync(__dirname); 
    files.forEach(file => {
        
        desc = desc + `${config.prefix}${file.slice(0, file.length -3)}\n`
        
        
        
       console.log(file.slice(0, file.length -3))
      }) 
      const embed = new Discord.MessageEmbed
      embed.setDescription(desc)
      embed.setTitle(`Meus comandos xD`)
      msg.channel.send(embed)

}