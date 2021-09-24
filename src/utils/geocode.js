const request = require("request")


const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiaG5qaWkiLCJhIjoiY2t0c2lkMHY4MWFiNDJvbDgxcWR3ZjVtdiJ9.mFLQu4UL0juV5DHcbZfxtQ&limit=1'

    request({ url: url, json: true }, (error, response) => {
        if (error) {
            callback('unable to connect!!', undefined)
        }
        else if (response.body.features.length === 0) {
            callback('unable to find location!!')
        }
        else {
            callback(undefined, {
                lat: response.body.features[0].center[1],
                long: response.body.features[0].center[0],
                location: response.body.features[0].place_name

            })
        }
    })
}

module.exports = geocode