const Channel = require('./Channel.js')
const Message = require('./Message.js')
const HTTP = require('../util/http.js')
const Route = require('../util/route.js')

class TextChannel extends Channel {
	constructor(client, res) {
		/*
		// ---------- \\
		|| PROPERTIES ||
		\\ ---------- //
		*/
		super(client, res)
	}

	/*
	// ------- \\
	|| METHODS ||
	\\ ------- //
	*/

	send(content, tts, embed, message_reference) {
		let id = this.id
		let client = this.client
		let req

		if (!content) {
			console.log("You need a content field!")
		}

		if (!tts) {
			tts = false
		}

		if (!message_reference) {
			message_reference = null
		}

		async function getHTTPReq() {
			let httpreq

			if (!embed) {
				httpreq = new HTTP(new Route('post', `/channels/${id}/messages`, {
					content: content,
					tts: tts,
					message_reference: message_reference
				}), client.token)
			} else {
				httpreq = new HTTP(new Route('post', `/channels/${id}/messages`, {
					content: content,
					tts: tts,
					embed: embed,
					message_reference: message_reference
				}), client.token)
			}

			return httpreq
		}

		getHTTPReq()
			.then(async (httpreq) => {
				httpreq = await httpreq.request
				let newmsg = new Message(this.client, httpreq)
				return newmsg
			})
			.catch((err) => {
				console.log(err)
			})
	}
}

module.exports = TextChannel