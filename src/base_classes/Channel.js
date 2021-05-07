const Message = require('./Message.js')

class Channel {
	constructor(client, res) {
		/*
		// ---------- \\
		|| PROPERTIES ||
		\\ ---------- //
		*/
		this.client = client
		this.id = res.id
		this.type = res.type
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
}

module.exports = Channel