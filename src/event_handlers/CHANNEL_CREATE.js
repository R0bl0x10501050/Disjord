const Channel = require('../base_classes/Channel.js')

module.exports = {
	name: "channel_create",
	execute(client, data) {
		let newChannel = new Channel(data)
		client.cache.channels.push(newChannel)
	},
}