import _debug from 'debug'
const debug = _debug("plugin:time")

export default {
  name: "time",
  intents: [],
  handle: (intent, response) => {
    debug("[Time] Intent object received", intent)
  }
}
