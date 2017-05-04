import _debug from 'debug'
const debug = _debug("plugin:time")

export default {
  name: "time",
  handle: (intent, response) => {
    debug("[Time] Intent object received", intent)
  }
}
