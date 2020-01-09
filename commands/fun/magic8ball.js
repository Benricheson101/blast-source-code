const { DMChannel, RichEmbed } = require("discord.js");
const { Command } = require("discord.js-commando");
const { trustedroles } = require(`../../botconfig.json`);
const { phrases } = require("../../phrases/8ball");

module.exports = class magic8ball extends Command {
	constructor (client) {
		super(client, {
			name: "magic8ball",
			group: "fun",
			memberName: "magic8ball",
			aliases: ["8ball"],
			description: "Ask the magic 8 ball a question",
			throttling: {
				usages: 2,
				duration: 10
			},
		});
	}

    async run(message) {

		if (message.author.bot) return;
		if (message.channel instanceof DMChannel) return;

		if (message.member.roles.some((r) => trustedroles.includes(r.id)) !== true &&
			trustedroles !== null &&
			!message.member.hasPermission(["ADMINISTRATOR"])) {
			return message.channel.send("Hmm, doesn't seem you have the role required to ask the magic 8 ball a question.");
		}

		let args = message.content.split(" ").slice(1);
		if (!args || args.length < 1) return message.channel.send("You must ask magic 8 ball a question!");
		let randPhrase = () => phrases[Math.floor(Math.random() * phrases.length)];

		return message.channel.send({
			embed: new RichEmbed()
				.setColor("#000000")
				.setAuthor(message.author.tag, message.author.avatarURL)
				.setTitle(randPhrase())
				.setDescription(`>>> ${args.join(" ")}`)
		});
	};
};
