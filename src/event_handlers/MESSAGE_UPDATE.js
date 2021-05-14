const Message_Create = require('./MESSAGE_CREATE.js')

module.exports = {
	name: "message_update",
	execute(client, data) {
		if (!client.cache.messages.get(data.id)) { return false; }

		Message_Create.execute(client, data).then((newMsg) => {
			let oldMsg = client.cache.messages.get(data.id)
			for (const [k,v] of newMsg.entries()) {
				oldMsg[k] = v
			}
		})
	},
}