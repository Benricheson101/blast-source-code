const Discord = require(`discord.js`);
const Commando = require(`discord.js-commando`);
const botconfig = require(`../../botconfig.json`);
const fliphelper = require(`../../phrases/fliphelper.json`)

class flip extends Commando.Command{
    constructor(client) {
        super(client, {
            name: 'flip',
            group: 'fun',
            memberName: 'flip',
            description: 'flip',
            throttling:{
                usages: 2,
                duration: 10
            }
        })
    }
async run(message) {

if(message.author.bot) return 
else
if(message.channel instanceof Discord.DMChannel) return message.channel.send(`Who are you going to flip in a DM channel?!`)
else

if(message.member.roles.some(r => botconfig.trustedroles.includes(r.id)) !== true && botconfig.trustedroles !== null && !message.member.hasPermission(['ADMINISTRATOR'])) return message.channel.send(`Hmm, doesn't seem you have the role required to flip.`)
else

var args = message.content.split(' ').slice(1);
var user = message.mentions.members.first() || message.guild.members.get(args[0])

if(!user) return message.channel.send(`You need someone to flip, please \`ping\` someone or use their \`ID\`!`)
else

if(user.id == message.client.user.id) return message.channel.send(`I'm sorry, but I'm not a physical object to flip.`)
else

if(user.id == message.author.id) return message.channel.send(`You need to break the laws of physics to flip yourself.`)
else

var good = fliphelper.good[Math.floor(Math.random() * fliphelper.good.length)]
var bad = fliphelper.fail[Math.floor(Math.random() * fliphelper.fail.length)]

console.log(good)

var phrases = [
    `\`${message.author.tag}\` flipped <@${user.id}> into a pile of ${good}!`,
    `<@${user.id}> was almost flipped by \`${message.author.tag}\` with ${bad}!`,
]

var phrase = phrases[Math.floor(Math.random() * phrases.length)]

message.channel.send(phrase)

}}

module.exports = flip;