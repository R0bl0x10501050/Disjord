const Guild = require('../base_classes/Guild.js')

module.exports = {
	name: "guild_create",
	execute(client, data) {
		let newGuild = new Guild(client, data)
		client.cache.guilds.push(newGuild)
	},
}