const Colors = require('./Constants.js').Colors

function dec(hexString){
	return parseInt(hexString, 16);
}

class MessageEmbed {
	constructor() {
		/*
		// ---------- \\
		|| PROPERTIES ||
		\\ ---------- //
		*/
		/*
		this.color = null
		this.title = null
		this.author = {}
		this.description = null
		this.thumbnail = {}
		*/
		this.fields = []
	}

	/*
	// ------- \\
	|| METHODS ||
	\\ ------- //
	*/

	setColor(hex) {
		let isDefColor = null
		let key = null

		for (const [k,v] of Object.entries(Colors)) {
			if (k.toLowerCase() == hex.toLowerCase() || k.toLowerCase().replace("_", "") == hex.toLowerCase()) {
				isDefColor = true
				key = v
			}
		}

		if (isDefColor !== null) {
			this.color = key
		} else {
			hex = hex.replace("#", "")
			this.color = dec(hex)
		}

		return this
	}

	setTitle(title) {
		this.title = title
		return this
	}

	addField(name, value, inline) {
		this.fields.push({ name: name, value: value, inline: inline })
		return this
	}

	_toJSON() {
		// Initalizing <Array>
		let array = {
			color: this.color,
			title: this.title,
			author: {
				name: this.author_name,
				icon_url: this.author_icon_url,
				url: this.author_url,
			},
			description: this.description,
			thumbnail: {
				url: this.thumbnail_url,
			},
			fields: [],
			image: {
				url: this.image_url
			},
			timestamp: this.timestamp,
			footer: {
				text: this.footer_text,
				icon_url: this.footer_icon_url
			}
		}

		// Adding Fields
		for (const [k, v] of this.fields.entries()) {
			array.fields.push(v)
		}

		// Checking & Removing
		function checkAndRemove(obj) {
			let total = Object.keys(obj).length
			for (const [k, v] of Object.entries(obj)) {
				if (v === undefined || v === null) {
					delete obj[k]
				} else if (typeof v == "object") {
					let total2 = checkAndRemove(v)
					let a = 0

					for (const [k2,v2] of Object.entries(v)) {
						a++
					}

					if (a !== total2) {
						delete obj[k]
					}
				}
			}
			return total
		}

		checkAndRemove(array)

		return array
	}
}

module.exports = MessageEmbed