const axios = require('axios').default

class HTTP {
	constructor(obj, token) {
		/*
		// ---------- \\
		|| PROPERTIES ||
		\\ ---------- //
		*/
		
		this.path = obj.path || null
		this.method = obj.method || null
		this.url = obj.url || null
		this.data = obj.data || {}
		let data = this.data // JSON.stringify(this.data)
		// console.log(`\n${this.method.toUpperCase()} ${this.url}\n\n${data}\n`)
		if (this.method.toLowerCase() == 'get') {
			this.request = axios({
				baseURL: this.url,
				timeout: null,
				headers: {'AUTHORIZATION': `Bot ${token}`},
				method: this.method,
			}).then((res) => {
				return res
				// return {
				// 	status: res.status,
				// 	msg: res.statusText,
				// 	data: res.data,
				// 	headers: res.headers,
				// 	req: res.request
				// }
			})
		} else {
			this.request = axios({
				baseURL: this.url,
				timeout: null,
				headers: {'AUTHORIZATION': `Bot ${token}`/*, 'content-type': 'application/json'*/},
				method: this.method,
				data: data
			}).then((res) => {
				return res
				// return {status: res.status, msg: res.statusText, data: res.data, headers: res.headers}
			})
		}
	}

	/*
	// ------- \\
	|| METHODS ||
	\\ ------- //
	*/

	// get() {
	// 	return this.request
	// }
}

module.exports = HTTP