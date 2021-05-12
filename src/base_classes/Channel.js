const HTTP = require('../util/http.js')
const Route = require('../util/route.js')

function getType(type) {
	switch (type) {
		case 0:
			return 'text'
		case 1:
			return 'dm'
		case 2:
			return 'voice'
		case 3:
			return 'dm'
		case 4:
			return 'category'
		case 5:
			return 'news'
		case 6:
			return 'store'
		case 10:
			return 'news_thread'
		case 11:
			return 'public_thread'
		case 12:
			return 'private_thread'
		case 13:
			return 'voice'
		default:
			return 'text'
	}
}

class Channel {
	constructor(client, res) {
		/*
		// ---------- \\
		|| PROPERTIES ||
		\\ ---------- //
		*/

		this.client = client
		this.deleted = res.deleted || false
		this.name = res.name
		this.id = res.id
		this.parent_id = res.parent_id || null
		this.permission_overwrites = res.permission_overwrites
		this.position = res.position
		this.type = getType(res.type)
	}

	/*
	// ------- \\
	|| METHODS ||
	\\ ------- //
	*/

	delete() {
		new HTTP(new Route('delete', `/channels/${this.id}`), this.client.token)
	}

	moveAbove(channel) {
		let newPos
		
		if (channel) {
			newPos = Number(channel.position) - 1
		} else {
			newPos = Number(this.position) - 1
		}

		new HTTP(new Route('patch', `/channels/${this.id}`, {position: newPos}), this.client.token)
	}

	moveBelow(channel) {
		let newPos

		if (channel) {
			newPos = Number(channel.position) + 1
		} else {
			newPos = Number(this.position) + 1
		}

		new HTTP(new Route('patch', `/channels/${this.id}`, {position: newPos}), this.client.token)
	}

	isText() {
		if (this.type == "voice" || this.type == "category" || this.type == "store" || this.type == "unknown") {
			return false
		} else {
			return true
		}
	}

	isVoice() {
		if (this.type == "voice") {
			return true
		} else {
			return false
		}
	}

	toString() {
		return "<#"+this.id+">"
	}
}

module.exports = Channel