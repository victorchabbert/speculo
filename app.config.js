const PROD = process.env.NODE_ENV === "production"
const PORT = process.env.PORT ? process.env.PORT : 8080
module.exports = {
  host: "localhost",
  port: PORT,
  plugins: [
    "weather",
    "time"
  ],
  core_modules: [
    "mirror",
    "intent",
    "facebook-wit"
  ]
};
