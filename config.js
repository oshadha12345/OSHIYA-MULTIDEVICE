const fs = require("fs");
if (fs.existsSync("config.env"))
  require("dotenv").config({ path: "./config.env" });

function convertToBool(text, fault = "true") {
  return text === fault ? true : false;
}
module.exports = {
  SESSION_ID: process.env.SESSION_ID || "LVsW0ChC#g7_VeGiyyvRaKHGc1X9eIa0y40VBS2xXl9vThfQEnzw",
  OWNER_NUM: process.env.OWNER_NUM || "94756599952",
  PREFIX: process.env.PREFIX || ".",
  AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "true",
  MODE: process.env.MODE || "public",
};
