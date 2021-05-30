class Emoji {
	constructor(client, res) {
		this.animated = res.animated || false
		this.available = res.available || false
		this.id = res.id
		this.managed = res.managed || false
		this.name = res.name || ""
		this.needColons = res.require_colons || true
		this.roles = res.roles || [] // TODO: make rolegroup
		this.user = new User(res.user) || null
	}

	toString() {
    	return this.id ? `<${this.animated ? 'a' : ''}:${this.name}:${this.id}>` : this.name
    }
}

module.exports = Emoji