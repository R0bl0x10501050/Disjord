module.exports = {
	name: "message_delete",
	execute(client, data) {
		if (!client.cache.messages.get(data.id)) { return false; }
		client.cache.messages.get(data.id).deleted = true
	},
}