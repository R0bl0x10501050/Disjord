module.exports = {
	name: "guild_delete",
	execute(client, data) {
		if (!client.cache.guilds.get(data.id)) { return false; }
		client.cache.guilds.get(data.id).deleted = true
		
		for (channel of client.cache.channels.values()) {
			if (channel.guild_id == data.id) {
				channel.deleted = true
			}
		}

		for (msg of client.cache.messages.values()) {
			if (msg.guild_id == data.id) {
				msg.deleted = true
			}
		}
	},
}