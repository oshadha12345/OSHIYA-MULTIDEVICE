const fs = require("fs");
if (fs.existsSync("config.env"))
  require("dotenv").config({ path: "./config.env" });

function convertToBool(text, fault = "true") {
  return text === fault ? true : false;
}
module.exports = {
  SESSION_ID: process.env.SESSION_ID || "ᴏꜱʜɪʏᴀ~ecESCK4B#AUrqK8a9G69IbHlPj99kAbsHA8XO8H-gW6c17W6smy0",
  OWNER_NUM: process.env.OWNER_NUM || "94725364886",
  OWNER_NAME: process.env.OWNER_NAME || "OSHIYA",
  PREFIX: process.env.PREFIX || ".",
  AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "true",
  MODE: process.env.MODE || "public",
};
