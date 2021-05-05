const Discord = require('/home/runner/Disjord/src/index.js')
const client = new Discord()

client.on('ready', () => {
	console.log("emitter worked")
})

client.on('message_create', (message) => {
	if (message.author === client.user) { return; }
	message.reply("yo lol it worked ig")
})

client.login(process.env.TOKEN)