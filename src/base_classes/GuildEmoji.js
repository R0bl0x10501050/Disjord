const BaseGuildEmoji = require('./BaseGuildEmoji.js')

class GuildEmoji extends BaseGuildEmoji {
	constructor(client, res) {
		super(client, res)
		this.author = res.author || null
		this.deletable = client.hasPermission("MANAGE_MESSAGES")
	}
}

module.exports = GuildEmoji