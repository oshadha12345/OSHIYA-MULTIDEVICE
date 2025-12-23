const fs = require("fs");
if (fs.existsSync("config.env"))
  require("dotenv").config({ path: "./config.env" });

function convertToBool(text, fault = "true") {
  return text === fault ? true : false;
}
module.exports = {
  SESSION_ID: process.env.SESSION_ID || "UMlyQAyQ#Yu_1J-xQxWr4tGcCVQEbg37NnJBNxZhYHHQbQqAXW5I",
  OWNER_NUM: process.env.OWNER_NUM || "94756599952",
  PREFIX: process.env.PREFIX || ".",
  ALIVE_IMG: process.env.ALIVE_IMG || "https://raw.githubusercontent.com/oshadha12345/images/refs/heads/main/20251222_040815.jpg",
  ALIVE_MSG: process.env.ALIVE_MSG || "*Hello I am Alive* 📡\n\n*Use* 👇\n*.menu* 📃\n*Other Commands* 📨\n\n✨ ᴛʜᴀɴᴋ ʏᴏᴜ ✨",
  AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "true",
  MODE: process.env.MODE || "public",
  AUTO_VOICE: process.env.AUTO_VOICE || "true",
};
