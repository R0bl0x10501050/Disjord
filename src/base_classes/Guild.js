const ChannelGroup = require('./ChannelGroup.js')
const Group = require('./Group.js')

function getAfkChannel(id) {
	if (id == undefined || id == null) { return null; }
}

function opposite(bool) {
	if (bool == true) {
		return false
	} else if (bool == false) {
		return true
	} else {
		return null
	}
}

class Guild {
	constructor(client, res) {
		/*
		// ---------- \\
		|| PROPERTIES ||
		\\ ---------- //
		*/

		this.afkChannel = getAfkChannel(res.afk_channel_id)
		this.afkChannelID = res.afk_channel_id

		if (this.afkChannel) {
			this.afkTimeout = this.afkChannel.timeout || null
		}

		this.applicationID = res.application_id
		this.approximateMemberCount = res.members.length || 1
		this.approximatePresenceCount = res.presences.length || 0
		this.available = opposite(res.unavailable) || null
		this.banner = res.banner || null
		this.channels = new ChannelGroup(client, res.channels).insert()
		this.client = client
		this.defaultMessageNotifications = res.default_message_notifications || 0
		this.deleted = res.deleted || false
		this.description = res.description || null
		this.discoverySplash = res.discovery_splash || null
		this.emojis = null // new EmojiGroup(client, res.emojis).insert()
		this.explicitContentFilter
		this.features
		this.icon
		this.id
		this.joinedAt
		this.joinedTimestamp
		this.large
		this.maximumMembers
		this.maximumPresences
		this.me
		this.memberCount
		this.members
		this.mfaLevel
		this.name
		this.nameAcronym
		this.owner
		this.ownerID
		this.partnered
		this.preferredLocale
		this.premiumSubscriptionCount
		this.premiumTier
		this.presences
		this.publicUpdatesChannel
		this.publicUpdatesChannelID
		this.region
		this.roles
		this.rulesChannel
		this.rulesChannelID
		this.shard
		this.shardID
		this.splash
		this.systemChannel
		this.systemChannelFlags
		this.systemChannelID
		this.vanityURLCode
		this.vanityURLUses
		this.verificationLevel
		this.verified
		this.voice
		this.voiceStates
		this.widgetChannel
		this.widgetChannelID
		this.widgetEnabled

		this.deleted = false
		this.channels = new Group()
		this.messages = new Group()
		this.id = res.id
		this.roles = new Group()
	}

	/*
	// ------- \\
	|| METHODS ||
	\\ ------- //
	*/
}

module.exports = Guild