const _debug = require("debug");
const debug = _debug("plugin:time");

module.exports = {
  component: () => {},
  name: "time",
  intents: [],
  handle: (intent, response) => {
    debug("[Time] Intent object received", intent);
  }
};
