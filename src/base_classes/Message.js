const HTTP = require('../util/http.js')
const Route = require('../util/route.js')
const User = require('./User.js')
const Guild = require('./Guild.js')
const TextChannel = require('./TextChannel.js')
const MessageReference = require('./MessageReference.js')
// const ReactionContainer = require('../containers/ReactionContainer.js')
let client2

function oprint(object) {
	for (const [k, v] of Object.entries(object)) {
		console.log(`${k}: ${v}`)
	}
}

function rc(v, nv) {
	if (!v) {
		console.log("RC'ed!\n"+v)
		v = nv
	}
}

function getChannelCache(id) {
	let cached = client2.cache.channels[id]
	return cached
}

function setChannelCache(id, channel) {
	let cache = client2.cache.channels
	cache.push(id, channel)
}

function getGuildCache(id) {
	let cached = client2.cache.guilds[id]
	return cached
}

function setGuildCache(id, guild) {
	let cache = client2.cache.guilds
	cache.push(id, guild)
}


function getChannel(res) {
	let id = res.channel_id
	let cached = getChannelCache(id)
	if (cached && cached !== undefined) {
		return cached
	}
	
	let channel = new TextChannel(client2, res.channel)
	setChannelCache(id, channel)
	return channel
}

function getGuild(res) {
	let id = res.guild_id
	let cached = getGuildCache(id)
	if (cached && cached !== undefined) {
		return cached
	}

	let guild = new Guild(client2, res.guild)
	setGuildCache(id, guild)
	return guild
}

class Message {
	constructor(client, res) {
		/*
		// ---------- \\
		|| PROPERTIES ||
		\\ ---------- //
		*/

		if (!res) {
			res = {}
		}
		
		client2 = client
		this.client = client
		this.content = res.content

		this.attachments = res.attachments || []
		this.author = JSON.stringify(new User(res.author)) || null /* TODO: make a User */
		this.channel = getChannel(res)
		this.channel_id = res.channel_id
		this.deleted = false
		this.embeds = res.embeds || []
		this.guild = getGuild(res)
		this.guild_id = res.guild_id
		this.id = res.id || null
		this.member = res.member || null /* TODO: make GuildMember class */
		this.mentions = res.mentions || { user: [], roles: [], channels: [], members: [] }
		this.message_ref = res.referenced_message || null /* TODO: make Message out of data */
		this.pinned = res.pinned || false
		this.tts = res.tts || null
	}

	/*
	// ------- \\
	|| METHODS ||
	\\ ------- //
	*/

	async reply(content, embed, tts) {
		let message_ref = new MessageReference(this);

		if (!content) {
			console.log("You need a content field!");
			return;
		}

		if (!embed) {
			embed = null
		}

		if (!tts) {
			tts = false
		}

		let newnewmsg = await this.channel.send(content, tts, embed, message_ref)
		return newnewmsg
	}
}

module.exports = Message