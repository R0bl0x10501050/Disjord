const Discord = require('/home/runner/Disjord/src/index.js')
const client = new Discord()

client.on('ready', () => {
	console.log("emitter worked")
})

client.on('message_create', async (message) => {
	if (message.author === client.user) { return; }
	if (message.content == "hi") {
		const newmsg = await message.reply("hello")
		console.log(newmsg.content)
	}
})

client.login(process.env.TOKEN)