const fs = require("fs");
if (fs.existsSync("config.env"))
  require("dotenv").config({ path: "./config.env" });

function convertToBool(text, fault = "true") {
  return text === fault ? true : false;
}

module.exports = {
  SESSION_ID: process.env.SESSION_ID || "CEN2yJoT#z91UWwjNMXrCyj1ziNbfYJuUefuVOOWvVnJONqYhQiY",
  MONGODB: process.env.MONGODB || "mongodb://mongo:ggtOUchkBSvtAWewuNUDvfKyTwyOvJRb@mainline.proxy.rlwy.net:29377",
  OWNER_NUM: process.env.OWNER_NUM || "94756599952",
  OWNER_NAME: process.env.OWNER_NAME || "OSHIYA",
  BOT_NAME: process.env.BOT_NAME || "OSHIYA-MD",
};
