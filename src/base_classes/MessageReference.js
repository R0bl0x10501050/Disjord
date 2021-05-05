class MessageReference {
	constructor(msg) {
		/*
		// ---------- \\
		|| PROPERTIES ||
		\\ ---------- //
		*/

		return {
			message_id: msg.id,
			channel_id: msg.channel.id,
			guild_id: msg.guild.id,
			fail_if_not_exists: false
		}
	}

	/*
	// ------- \\
	|| METHODS ||
	\\ ------- //
	*/
}

module.exports = MessageReference