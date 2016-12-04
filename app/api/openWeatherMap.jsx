var axios = require('axios');

const OPEN_WEATHER_MAP_URL = 'http://api.openweathermap.org/data/2.5/weather?appid=3c0178c3d6035afc40510cfccbdc2125&units=metric';

module.exports = {
    getTemp: function (location) {
        var encodedLocation = encodeURIComponent(location);
        var requestUrl = `${OPEN_WEATHER_MAP_URL}&q=${encodedLocation}`;

        return axios.get(requestUrl).then(function (res) {
            if (res.data.cod && res.message) {
                throw new Error(res.message);
            } else {
                return res.data.main.temp;
            }
        }, function (res) {
            throw new Error(res.message);
        });
    }
};