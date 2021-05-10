const Discord = require('/home/runner/Disjord/src/index.js')
const client = new Discord()

client.on('ready', () => {
	console.log("emitter worked")
})

client.on('message_create', async (message) => {
	if (message.author === client.user) { return; }
	console.log(client.cache)
	if (message.channel.name == "aaaa") {
		const a = await message.channel.delete()
		console.log(client.cache)
	}
})

client.login(process.env.TOKEN)