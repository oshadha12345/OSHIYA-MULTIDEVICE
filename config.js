const fs = require("fs");
if (fs.existsSync("config.env"))
  require("dotenv").config({ path: "./config.env" });

function convertToBool(text, fault = "true") {
  return text === fault ? true : false;
}
module.exports = {
  SESSION_ID: process.env.SESSION_ID || "EN9m0CLK#jKdc1tdS9T6MuS1d3w8KhtmiZUs-CnJBJXMtKCrEv-A",
  OWNER_NUM: process.env.OWNER_NUM || "94756599952",
  OWNER_NAME: process.env.OWNER_NAME || "OSHIYA",
  PREFIX: process.env.PREFIX || ".",
  AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "true",
  MODE: process.env.MODE || "public",
};
