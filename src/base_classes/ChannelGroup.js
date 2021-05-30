const CHANNEL_CREATE = require('../event_handlers/CHANNEL_CREATE.js')
const Group = require('./Group.js')

class ChannelGroup extends Group {
	constructor(client, ndata) {
		let data = []

		try {
			for (let i = 0; i < ndata.length; i++) {
				let newChannel = CHANNEL_CREATE.execute(client, ndata[i])
				data.push(newChannel)
			}
		} catch {
			for (const [k,v] of Object.entries(ndata)) {
				let newChannel = CHANNEL_CREATE.execute(client, v)
				data.push(newChannel)
			}
		}

		super(data)
	}
}

module.exports = ChannelGroup