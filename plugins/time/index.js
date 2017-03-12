module.exports = {
  name: "time",
  component: require('./components/Time.js'),
  intents: [],
  handle: (intentObject, response) => {
    console.log("[Time] Intent object received", intentObject)
  }
};
