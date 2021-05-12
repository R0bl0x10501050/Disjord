const Group = require('./Group.js')

class Guild {
	constructor(client, res) {
		/*
		// ---------- \\
		|| PROPERTIES ||
		\\ ---------- //
		*/

		this.deleted = false
		this.channels = new Group()
		this.messages = new Group()
		this.id = res.id
		this.roles = new Group()
	}

	/*
	// ------- \\
	|| METHODS ||
	\\ ------- //
	*/
}

module.exports = Guild