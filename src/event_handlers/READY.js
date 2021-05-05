const User = require(__dirname+'/../base_classes/User.js')

module.exports = {
	name: "ready",
	execute(client, data) {
		client.user = JSON.stringify(new User(data.user))
	},
}