const Emoji = require('./Emoji.js')

class BaseGuildEmoji extends Emoji {
	constructor(client, res) {
		super(client, res)
		this.deleted = res.deleted || false
		this.guild = res.guild || null
		this.url = `https://cdn.discordapp.com/emojis/${this.id}.${this.animated ? "gif" : "png"}`
	}
}

module.exports = BaseGuildEmoji