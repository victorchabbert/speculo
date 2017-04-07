const OpenWeatherMap = require("./OpenWeatherMap");
const _debug = require("debug");
const debug = _debug("plugins:weather");

let openWeatherMap = new OpenWeatherMap(process.env.OPEN_WEATHER_MAP_SECRET);

module.exports = {
  /**
   * @returns The list of intents handle by the plugin
   */
  intents: ["weather", "add_weather"],
  name: "weather",
  /**
   *
   * @param intent
   * @param mirrors MirrorInterface
   */
  handle: (intent, mirrors) => {
    debug("HI");

    let OWPRequest = {
      "address": "Cergy",
      "date": new Date()
    };

    switch (intent.name) {
      case "weather":
        intent.parameters.forEach(
          (arg) => {
            if (arg.type == "position") {
              OWPRequest.address = arg.value.address;
            }
            else if (arg.type == "date") {
              OWPRequest.date = arg.value;
            }
          }
        );

        debug("Solving weather for", OWPRequest);
        openWeatherMap.getForecast(OWPRequest.address, OWPRequest.date,
          (weather) => {
            if (weather) {
              debug("SENDING TO MIRROR", weather);
              weather.address = OWPRequest.address;
              mirrors.display(weather);
            }
          });
        break;
      case "add_weather":
        debug("ADD_WEATHER");
        mirrors.show();
        break;
      default:
    }
  }
};
