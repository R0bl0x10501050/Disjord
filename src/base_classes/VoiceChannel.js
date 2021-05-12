const Channel = require('./Channel.js')

class VoiceChannel extends Channel {
	constructor(client, res) {
		/*
		// ---------- \\
		|| PROPERTIES ||
		\\ ---------- //
		*/
		super(client, res)
		this.bitrate = res.bitrate || 64000
		this.nsfw = res.nsfw || false
		this.rtc_region = res.rtc_region || null
		this.user_limit = res.user_limit || 0
	}

	/*
	// ------- \\
	|| METHODS ||
	\\ ------- //
	*/
}

module.exports = VoiceChannel