const MessageEmbed = require('./MessageEmbed.js')
const Channel = require('./Channel.js')
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
		this.nsfw = res.nsfw
		this.timeout = res.rate_limit_per_user
	}

	/*
	// ------- \\
	|| METHODS ||
	\\ ------- //
	*/

	async send(content, tts, embed, message_reference) {
		let id = this.id
		let client = this.client
		let channelclass = this
		let req

		if (!content) {
			console.log("You need a content field!")
		} else if (content instanceof MessageEmbed) {
			embed = content._toJSON()
			content = null
		}

		if (!tts) {
			tts = false
		}

		if (!message_reference) {
			message_reference = null
		}

		// console.log({
		// 	content: content,
		// 	tts: tts,
		// 	embed: embed,
		// 	message_reference: message_reference
		// })

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

			httpreq = await httpreq.request
			return httpreq
		}

		let httpreq = await getHTTPReq()
		let returnval = require("../event_handlers/MESSAGE_CREATE.js")
			.execute(client, httpreq.data)
			.then(async (httpres) => {
				httpres = await httpres
				return httpres
			})
			

		returnval = await returnval
		return returnval
	}
}

module.exports = TextChannel