module.exports = {
	name: "channel_delete",
	execute(client, data) {
		client.cache.channels[data.id].deleted = true
		for (msg of client.cache.messages.values()) {
			if (msg.channel_id == data.id) {
				msg.deleted = true
			}
		}
	},
}