const ClientException = require('./baseerrors.js').ClientException

class LoginFailure extends ClientException {
	constructor(message) {
		super()
		if (!message) return
		console.log("[LOGINFAILURE]: " + message)
	}
}

module.exports.LoginFailure = LoginFailure