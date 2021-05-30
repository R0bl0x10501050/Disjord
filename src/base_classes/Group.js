class Group {
	constructor(data) {
		this.data = new Object()
		this.newData = data
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

	insert(potentialData) {
		let data = this.newData || potentialData

		if (typeof data !== "object") {
			return
		} else {
			try {
				for (let i=0; i<data.length; i++) {
					this.push(i, data[i])
				}
			} catch {
				for (const [k,v] of Object.entries(data)) {
					this.push(k,v)
				}
			}
		}
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
		delete this.data[key]
	}

	popEnd() { // changing
		if (this.frozen) { return; }
		this.data[Object.values(this.data).length] = null
		delete this.data[Object.values(this.data).length]
	}

	values() {
		return Object.values(this.data)
	}

	unfreeze() {
		this.frozen = false
	}
}

module.exports = Group