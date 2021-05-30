const BaseGuildEmoji = require('./BaseGuildEmoji.js')

class ReactionEmoji extends BaseGuildEmoji {
	constructor(client, res) {
		super(client, res)
	}
}

module.exports = ReactionEmoji