const TextChannel = require('../base_classes/TextChannel.js')

function getType(type) {
	switch (type) {
		case 0:
			return 'text'
		case 1:
			return 'dm'
		case 2:
			return 'voice'
		case 3:
			return 'dm'
		case 4:
			return 'category'
		case 5:
			return 'news'
		case 6:
			return 'store'
		case 10:
			return 'news_thread'
		case 11:
			return 'public_thread'
		case 12:
			return 'private_thread'
		case 13:
			return 'voice'
		default:
			return 'text'
	}
}

module.exports = {
	name: "channel_update",
	execute(client, data) {
		if (!client.cache.channels[data.id]) { return false; }

		if (getType(data.type) == 'text') {
			client.cache.channels[data.id] = new TextChannel(client, data)
		} else if (getType(data.type) == 'news') {
			client.cache.channels[data.id] = new NewsChannel(client, data)
		} else if (getType(data.type) == 'dm') {
			client.cache.channels[data.id] = new DmChannel(client, data)
		} else if (getType(data.type) == 'voice') {
			client.cache.channels[data.id] = new VoiceChannel(client, data)
		} else if (getType(data.type) == 'category') {
			client.cache.channels[data.id] = new CategoryChannel(client, data)
		} else if (getType(data.type) == 'store') {
			client.cache.channels[data.id] = new StoreChannel(client, data)
		}
	},
}