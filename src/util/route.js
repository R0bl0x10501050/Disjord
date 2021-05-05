function getUrl(base) {
	if (base.noadd) {
		return String(base.path)
	} else {
		return String(base.BASE + base.path)
	}
}

class Route {
	constructor(method, path, data, noadd, ...parameters) {
		this.BASE = 'https://discord.com/api/v8'
		this.path = path
        this.method = method
		this.noadd = noadd
		this.url = getUrl(this)
		this.data = data || null
		return this
	}
}

module.exports = Route