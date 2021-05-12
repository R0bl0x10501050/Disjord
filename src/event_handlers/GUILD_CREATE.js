const Guild = require('../base_classes/Guild.js')
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
	name: "guild_create",
	execute(client, data) {
		let newGuild = new Guild(client, data)
		client.cache.guilds.push(data.id, newGuild)
		for (let [k,v] of data.channels.entries()) {
			if (getType(v.type) == "text") {
				v = new TextChannel(client, v)
			} else if (getType(v.type) == "voice") {
				v = new VoiceChannel(client, v)
			} else if (getType(v.type) == "category") {
				v = new CategoryChannel(client, v)
			}
			
			client.cache.guilds.get(data.id).channels.push(v.id, v)
			client.cache.channels.push(v.id, v)
		}
	},
}