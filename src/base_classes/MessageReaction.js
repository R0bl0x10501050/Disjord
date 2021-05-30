const Emoji = require('./Emoji.js')

class MessageReaction extends Emoji {
	constructor(client, res) {
		super(client, res)
	}
}

module.exports = MessageReaction