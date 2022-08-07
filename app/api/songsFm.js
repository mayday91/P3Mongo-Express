const axios = require('axios')


// lastFmSong function
const getLastFmSong = (searchTerm, apiKey) => {
	return axios({
		method: "GET",
		url: `https://ws.audioscrobbler.com/2.0/?method=album.search&album=${searchTerm}&api_key=${apiKey}&format=json&limit=30`,
		// data: {}
		})
}
module.exports =  {getLastFmSong}



