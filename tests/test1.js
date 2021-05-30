const Discord = require('/home/runner/Disjord/src/index.js')
const client = new Discord.Client()

client.on('ready', () => {
	console.log("emitter worked")
})

client.on('message_create', async (message) => {
	if (message.author.id === client.user.id) { return; }
	
	if (message.channel.name == "aaaa") {
		// const a = await message.channel.delete()
		const em = new Discord.MessageEmbed()
			.setColor("yeLloW")
			.setTitle("Test")
			.setAuthor("Yo", "https://images-ext-2.discordapp.net/external/rBUJnxWKoYLwAo5FwsYwmultS5AeK4uqaiP2ylKgNlM/https/media.discordapp.net/attachments/779022239219712041/779918543440576562/logoo.gif?width=1057&height=595") // no work
			.setDescription("LOL IT WORKD")
			.setThumbnail("https://images-ext-2.discordapp.net/external/rBUJnxWKoYLwAo5FwsYwmultS5AeK4uqaiP2ylKgNlM/https/media.discordapp.net/attachments/779022239219712041/779918543440576562/logoo.gif?width=1057&height=595")
			.addField("hiya", "lol", true)
			.addFields([{name: "hiya", value: "lolol", inline: false}, {name: "yoo", value: "no", inline: true}])
			.setImage("https://images-ext-2.discordapp.net/external/rBUJnxWKoYLwAo5FwsYwmultS5AeK4uqaiP2ylKgNlM/https/media.discordapp.net/attachments/779022239219712041/779918543440576562/logoo.gif?width=1057&height=595")
			.setTimestamp()
			.setFooter("YOOO", "https://images-ext-2.discordapp.net/external/rBUJnxWKoYLwAo5FwsYwmultS5AeK4uqaiP2ylKgNlM/https/media.discordapp.net/attachments/779022239219712041/779918543440576562/logoo.gif?width=1057&height=595")
			
		message.channel.send(em)
	}
})

client.login(process.env.TOKEN)