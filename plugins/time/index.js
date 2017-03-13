module.exports = {
  name: "time",
  component: require('./components/Time.js'),
  intents: [],
  handle: (intent, response) => {
    console.log("[Time] Intent object received", intentObject)
  }
};
