class DiscordException extends Error {
    constructor(message) {
		super()
		if (!message) return
		console.log("[DISCORDEXCEPTION]: " + message)
	}
}

class ClientException extends DiscordException {
    constructor(message) {
		super()
		if (!message) return
		console.log("[CLIENTEXCEPTION]: " + message)
	}
}

module.exports.DiscordException = DiscordException
module.exports.ClientException = ClientException