class User {
	constructor(data) {
		this.bot = data.bot || false
		this.discriminator = data.discriminator
		this.id = data.id || null
		this.username = data.username
		this.tag = `${this.username}#${this.discriminator}`
		// this.verified = data.verified
	}
}

module.exports = User