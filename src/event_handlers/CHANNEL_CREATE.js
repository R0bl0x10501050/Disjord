const TextChannel = require('../base_classes/TextChannel.js')
const VoiceChannel = require('../base_classes/VoiceChannel.js')
const CategoryChannel = require('../base_classes/CategoryChannel.js')

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
	name: "channel_create",
	execute(client, data) {
		let newChannel

		if (getType(data.type) == 'text') {
			newChannel = new TextChannel(client, data)
		} else if (getType(data.type) == 'news') {
			newChannel = new NewsChannel(client, data)
		} else if (getType(data.type) == 'dm') {
			newChannel = new DmChannel(client, data)
		} else if (getType(data.type) == 'voice') {
			newChannel = new VoiceChannel(client, data)
		} else if (getType(data.type) == 'category') {
			newChannel = new CategoryChannel(client, data)
		} else if (getType(data.type) == 'store') {
			newChannel = new StoreChannel(client, data)
		}
		
		client.cache.channels.push(data.id, newChannel)
	},
}