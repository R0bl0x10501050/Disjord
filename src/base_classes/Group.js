class Group {
	constructor() {
		this.data = new Object()
		this.frozen = false
	}

	get(key) {
		return this.data[key]
	}

	entries() {
		return Object.entries(this.data)
	}

	freeze(time) {
		this.frozen = true
		setTimeout(function() {
			this.frozen = false
		}, Number(time))
	}

	keys() {
		return Object.keys(this.data)
	}

	push(key, value) { // changing
		if (this.frozen) { return; }
		this.data[key] = value
		return value
	}

	pop(key) { // changing
		if (this.frozen) { return; }
		this.data[key] = null
	}

	popEnd() { // changing
		if (this.frozen) { return; }
		this.data[Object.values(this.data).length] = null
	}

	values() {
		return Object.values(this.data)
	}

	unfreeze() {
		this.frozen = false
	}
}

module.exports = Group