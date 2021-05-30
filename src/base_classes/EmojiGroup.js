const EMOJI_CREATE = require('../event_handlers/MESSAGE_REACTION_ADD.js')
const Group = require('./Group.js')

class EmojiGroup extends Group {
	constructor(client, ndata) {
		let data = []

		try {
			for (let i = 0; i < ndata.length; i++) {
				let newChannel = EMOJI_CREATE.execute(client, ndata[i])
				data.push(newChannel)
			}
		} catch {
			for (const [k,v] of Object.entries(ndata)) {
				let newChannel = EMOJI_CREATE.execute(client, v)
				data.push(newChannel)
			}
		}

		super(data)
	}
}

module.exports = ChannelGroup