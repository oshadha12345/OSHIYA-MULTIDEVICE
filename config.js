const fs = require("fs");
if (fs.existsSync("config.env"))
  require("dotenv").config({ path: "./config.env" });

function convertToBool(text, fault = "true") {
  return text === fault ? true : false;
}
module.exports = {
  SESSION_ID: process.env.SESSION_ID || "eYNyzTQL#oaNWtVqzKJo3APelHVrgjrcdJjnuziNTOcsfcBMaMO4",
  OWNER_NUM: process.env.OWNER_NUM || "94756599952",
  OWNER_NAME: process.env.OWNER_NAME || "OSHIYA",
BOT_NAME: "POWER BOY OSHADHA",
OWNER_NAME: "Oshadha",
ALIVE_IMAGE: "https://raw.githubusercontent.com/oshadha12345/images/refs/heads/main/20251222_040815.jpg"
  PREFIX: process.env.PREFIX || ".",
  AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "true",
  MODE: process.env.MODE || "public",
};
