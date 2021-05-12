const HTTP = require('../util/http.js')
const Route = require('../util/route.js')
const Message = require('../base_classes/Message.js')

module.exports = {
	name: "message_create",
	async execute(client, data) {
		let guild_id

		let req_channel = new HTTP(new Route('get', `/channels/${data.channel_id}`), client.token)
		req_channel = await req_channel.request

		if (data.message_reference) {
			guild_id = data.message_reference.guild_id
		} else {
			guild_id = req_channel.data.guild_id
		}

		let req_guild = new HTTP(new Route('get', `/guilds/${guild_id}`), client.token)
		req_guild = await req_guild.request
		
		data.channel = req_channel.data
		data.guild = req_guild.data

		let newMsg = new Message(client, data)
		newMsg = await newMsg

		client.cache.messages.push(data.id, newMsg)
		
		return newMsg
	},
}