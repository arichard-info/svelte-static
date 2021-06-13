const axios = require('axios')

const fetch = (url, options) => axios.get(url, options).then((r) => r.data);

module.exports = { fetch }