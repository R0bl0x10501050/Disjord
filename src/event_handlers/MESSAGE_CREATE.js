const HTTP = require('../util/http.js')
const Route = require('../util/route.js')
const Message = require('../base_classes/Message.js')

module.exports = {
	name: "message_create",
	async execute(client, data) {
		let req_channel = new HTTP(new Route('get', `/channels/${data.channel_id}`), client.token)
		let req_guild = new HTTP(new Route('get', `/guilds/${data.guild_id}`), client.token)
		req_channel = await req_channel.request
		req_guild = await req_guild.request
		data.channel = req_channel.data
		data.guild = req_guild.data

		let newMsg = new Message(client, data)
		newMsg = await newMsg
		return newMsg
	},
}