const http = require("http");

/**
 * return the closer
 *
 * @param weatherForecast forecast JSON parsed data
 * @param targetTime time of the forecast researched
 * @param maxDateDif max difference with the targetTime
 */
const getCloser = function (weatherForecast, targetTime, maxDateDif) {
  let res = null;

  for (let i = 0; i < weatherForecast.list.length; i++) {
    let currentDateDif = Math.abs(new Date(weatherForecast.list[i].dt_txt).getTime() - targetTime);
    if (currentDateDif < maxDateDif) {
      maxDateDif = currentDateDif;
      res = weatherForecast.list[i]
    }
  }
  return res;
};

let options = {
  host: 'api.openweathermap.org',
  port: '80',
  path: '/data/2.5/forecast?',
  agent: false
};

class OpenWeatherMap {

  constructor(secret) {
    this._secret = secret;
  }

  /**
   * Return the weather in a place at a given time (> now & < +5days)
   *
   * @param place String
   * @param date Datetime
   */
  getForecast(place, date) {
    options.path = '/data/2.5/forecast?q=' + encodeURIComponent(place) + "&APPID=" + encodeURIComponent(this._secret);

    http.get(options, function (res) {

      if (res.statusCode == 200) {
        res.setEncoding('utf8');
        let rawData = '';
        res.on('data', (chunk) => rawData += chunk);
        res.on('end', () => {
          try {
            let parsedData = JSON.parse(rawData);

            if (parsedData.cod != 200) {
              console.log('OpenWeatherMapError ', res)
            }

            console.log("LOAD SUCCED", parsedData);
            return getCloser(parsedData, date.getTime(), 6 * 3600 * 1000);
          } catch (e) {
            console.log(e.message);
          }
        });
      } else {
        console.log('OpenWeatherMapError ', res)
      }
    }).on('error', (e) => {
      console.log(`Got error: ${e.message}`);
    });
  }
}

module.exports = OpenWeatherMap;
