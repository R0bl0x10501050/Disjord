module.exports = {
	name: "channel_delete",
	execute(client, data) {
		if (!client.cache.channels.get(data.id)) { return false; }
		client.cache.channels.get(data.id).deleted = true
		for (msg of client.cache.messages.values()) {
			if (msg.channel_id == data.id) {
				msg.deleted = true
			}
		}
	},
}