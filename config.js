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
  ALIVE_IMG: process.env.ALIVE_IMG || "",
  ALIVE_MSG: process.env.ALIVE_MSG || "",
  AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "true",
  MODE: process.env.MODE || "public",
};
