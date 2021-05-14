const Discord = require('/home/runner/Disjord/src/index.js')
const client = new Discord.Client()

client.on('ready', () => {
	console.log("emitter worked")
})

client.on('message_create', async (message) => {
	if (message.author === client.user) { return; }
	
	if (message.channel.name == "aaaa") {
		// const a = await message.channel.delete()
		const em = new Discord.MessageEmbed()
			.setColor("yeLloW")
			.setTitle("Test")
			.addField("hiya", "lol", true)
			
		message.channel.send(em)
	}
})

client.login(process.env.TOKEN)