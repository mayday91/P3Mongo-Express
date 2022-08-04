

export const getLastFmSong = () => {
    return axios({
        method: "GET",
        url: "https://ws.audioscrobbler.com/2.0/?method=track.search&track=anthem&api_key=d8e8bce9ba4ee2c4e9813f3ccb16ed83&format=json&limit=30"
    })
}

