const fs = require("fs");
if (fs.existsSync("config.env"))
  require("dotenv").config({ path: "./config.env" });

function convertToBool(text, fault = "true") {
  return text === fault ? true : false;
}
module.exports = {
  SESSION_ID: process.env.SESSION_ID || "adNRlYTD#uHWzSHxMHF3506Mg_22xcG0kHDLqe4uinhaRtaHZJJI",
  OWNER_NUM: process.env.OWNER_NUM || "94756599952",
  PREFIX: process.env.PREFIX || ".",
  ALIVE_IMG: process.env.ALIVE_IMG || "https://raw.githubusercontent.com/oshadha12345/images/refs/heads/main/20251222_040815.jpg",
  ALIVE_MSG: process.env.ALIVE_MSG || "Hello 🚀 , I am Alive Now 🔥\n\n*Owner* 👑\n\nhttps://wa.me/+94725364886?text=HEY_OSHIYA_MD_OWNER💐🎭\n\n🚀 *A simple but advanced Whatsapp Bot*  🚀",
  AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "true",
  MODE: process.env.MODE || "public",
};
