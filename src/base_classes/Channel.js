const Message = require('./Message.js')
const HTTP = require('../util/http.js')
const Route = require('../util/route.js')

function getType(type) {
	if (type == 0) {
		return 'text'
	} else if (type == 1) {
		return 'dm'
	} else if (type == 2) {
		return 'voice'
	} else if (type == 3) {
		return 'dm'
	} else if (type == 4) {
		return 'category'
	} else if (type == 5) {
		return 'news'
	} else if (type == 6) {
		return 'store'
	} else if (type == 10) {
		return 'news_thread'
	} else if (type == 11) {
		return 'public_thread'
	} else if (type == 12) {
		return 'private_thread'
	} else if (type == 13) {
		return 'voice'
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
		this.deleted = false
		this.name = res.name
		this.id = res.id
		this.parent_id = res.parent_id
		this.type = getType(res.type)
	}

	/*
	// ------- \\
	|| METHODS ||
	\\ ------- //
	*/

	_makeMessageFrom(data) {
		const newMsg = new Message(this.client, data)
		return newMsg
	}

	async delete() {
		new HTTP(new Route('delete', `/channels/${this.id}`), this.client.token)
	}

	isTest() {
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