const request = require("request");

const forecast = (lat, long, callback) => {

    const url = 'http://api.weatherstack.com/current?access_key=bc9863bf7bc8112558d7a01087660c08&query=' + encodeURIComponent(lat) + ',' + encodeURIComponent(long)

    request({ /*url: url or*/ url, json: true }, (error, { body } = {}) => {

        if (error) {
            callback('Unable to connect!!', undefined);
        }
        else if (body.error) {
            callback(`unable to find location!!`, undefined);
        }
        else {
            callback(undefined, "temperature is around : " + body.current.temperature + " and it feels like " + body.current.feelslike)

            // {
            //     //description = response.body.current.weather_descriptions[0],
            //     temperature: body.current.temperature,
            //     feelslike: body.current.feelslike
            // }
            // console.log(response.body.current.weather_descriptions[0]);
            // console.log("temperature " + response.body.current.temperature);
            // console.log("feels like " + response.body.current.feelslike);
        }

    })
}


module.exports = forecast