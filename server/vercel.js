const { config } = require("./config");

module.exports = {
  version: 2,
  routes: [
    {
      src: "/(.*)",
      dest: "./app.js",
      methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
      headers: {
        "Access-Control-Allow-Origin": config.cors.allowedOrigin,
        "Access-Control-Allow-Methods": "GET,POST,PUT,DELETE,PATCH,OPTIONS",
        "Access-Control-Allow-Headers":
          "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
        "Access-Control-Allow-Credentials": "true",
      },
    },
  ],
};
