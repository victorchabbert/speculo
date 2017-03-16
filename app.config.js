const PROD = process.env.NODE_ENV === "production";
module.exports = {
  host: PROD ? process.env.IP : "localhost",
  port: PROD ? 80 : 8080,
  plugins: [
    "time",
  ],
  core_modules: [
    "mirror",
    "intent",
    "facebook-wit"
  ]
};
