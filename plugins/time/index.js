module.exports = {
  component: require('./components/Time.js'),
  handle: (intentObject, response) => {
    console.log("[Time] Intent object received", intentObject)
  }
};
