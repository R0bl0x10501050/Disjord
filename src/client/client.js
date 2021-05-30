const LoginFailure = require('../errors/mainfailures.js').LoginFailure
const HTTP = require('../util/http.js')
const Route = require('../util/route.js')
const User = require('../base_classes/User.js')
const Group = require('../base_classes/Group.js')
const Permissions = require('../base_classes/Constants.js').Permissions
const WebSocket = require('ws');
const EventEmitter = require("events").EventEmitter
let ws = null

function oprint(object) {
	for (const [k, v] of Object.entries(object)) {
		console.log(`${k}: ${v}`)
	}
}

function waitForSocketConnection(socket, callback) {
	setTimeout(function() {
		if (socket.readyState === 1) {
			console.log("\nConnection has been made!")
			if (callback != null) {
				callback();
			}
		} else {
			waitForSocketConnection(socket, callback);
		}
	}, 5)
}

function resume(ws, token, session_id, seq_num) {
	ws.send(JSON.stringify({
		op: 6,
		d: {
			token: token,
			session_id: session_id,
			seq: seq_num
		}
	}))
}

async function connect(client, token, recon, cache) {
	const wsurl = await new HTTP(new Route('get', '/gateway/bot'), token)
	let alreadyIdentified = false
	let session_id = cache.session_id
	let seq = cache.seq
	let wsdata = await wsurl.request
	wsdata = wsdata.data

	console.log(wsdata)
	
	if (wsdata.session_start_limit.remaining == 0) {
		console.log("This is the last time you will be able to log in for 24 hours!")
	}

	ws = new WebSocket(wsdata.url+"/?v=8&encoding=json")
	ws.binaryType = 'blob'

	client._ws = ws

	if (recon) {
		ws.send(JSON.stringify({
			op: 6,
			d: {
				token: token,
				session_id: session_id,
				seq: seq
			}
		}))
	}

	ws.on("open", () => {
		console.log("Websocket is open!")
	})
	ws.on('message', (message) => {
		const data = JSON.parse(message)
		const seq2 = data.s
		const eventtype = data.t
		const jdata = data.d
		let opcode

		try {
			opcode = Number(data.op)
			if (opcode === undefined) throw err;
		} catch {
			opcode = null
		}

		if (opcode == 0) { // main handler smh
			let acceptable

			try {
				if (jdata.session_id) {}
				acceptable = true
			} catch {
				acceptable = false
			}

			if (acceptable) {
				session_id = jdata.session_id
			}

			console.log(String(data.t).toLowerCase())

			if (String(data.t).toLowerCase() !== "message_create") {
				let func = require(__dirname+"/../event_handlers/"+String(data.t).toUpperCase()+".js")
				let emitdata = func.execute(client, jdata)
				client.emit(String(data.t).toLowerCase(), emitdata)
				return
			}
			
			let func = require(__dirname+"/../event_handlers/"+String(data.t).toUpperCase()+".js")
				.execute(client, jdata)
				.then(async (emitdata) => {
					let e = await emitdata
					client.emit(String(data.t).toLowerCase(), e)
				})
		} else if (opcode == 7) {
			ws.send(JSON.stringify({
				op: 6,
				d: {
					token: token,
					session_id: session_id,
					seq: seq
				}
			}))
		} else if (opcode == 10) {
			heartbeat(jdata.heartbeat_interval)
		} else if (opcode == 11 && alreadyIdentified == false) {
			alreadyIdentified = true

			ws.send(JSON.stringify({
				op: 2,
				d: {
					token: token,
					properties: {
						$os: "linux",
						$browser: "disjord",
						$device: "disjord"
					},
					presence: {
						status: "online",
						since: 91879201,
						afk: false
					},
					compress: false,
					large_threshold: 250,
					intents: 32509 // 32511
				}
			}))
		}
	})
	ws.on("close", (event) => {
		// console.log(`ERROR {\n\tcode: ${event}\n}`);
		// resume(ws, token, session_id, seq)
		connect(client, token, true, {session_id: session_id, seq: seq})
	})

	function heartbeat(ms) {
		let seqnum

		if (seq === undefined) {
			seqnum = null
		} else {
			seqnum = seq
		}

		ws.send(JSON.stringify({
			op: 1,
			d: seqnum
		}))

		setInterval(function() {
			if (seq === undefined) {
				seqnum = null
			} else {
				seqnum = seq
			}

			ws.send(JSON.stringify({
				op: 1,
				d: seqnum
			}))
		}, Number(ms))
	}
}

class Client extends EventEmitter {
	constructor() {
		/*
		// ---------- \\
		|| PROPERTIES ||
		\\ ---------- //
		*/

		super()
		
		this.cache = {
			guilds: new Group(),
			channels: new Group(),
			messages: new Group(),
			users: new Group(),
			roles: new Group(),
			emojis: new Group()
		}
		this.roles = new RolesGroup().insert()
		this.token = null
		this.user = null
	}

	/*
	// ------- \\
	|| METHODS ||
	\\ ------- //
	*/

	destroy() {
		this.logout()

		function killAll(obj) {
			for (const [k,v] of Object.entries(obj)) {
				if (typeof v == "object") {
					killAll(v)
				} else {
					obj[k] = null
					delete obj[k]
				}
			}
		}

		killAll(this)
		this = null
	}

	hasPermission(perm) {
		if (Permissions[perm.toUpperCase()]) {
			for (const [k,v] of this.roles.entries()) {
				if (v.permissions[perm.toUpperCase()]) {
					return true
				} else {
					return false
				}
			}
		} else {
			return false // TODO: create invalid permission error
		}
	}

	async login(token) {
		let data
		try {
			await connect(this, token, false, {})
			this.token = token
		} catch (err) {
			throw new LoginFailure('Invalid token')
		}

		return data
	}

	logout() {
		new HTTP(new Route('POST', '/auth/logout', {}), this.token)
	}
}

module.exports = Client