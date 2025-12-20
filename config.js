const fs = require("fs");
if (fs.existsSync("config.env"))
  require("dotenv").config({ path: "./config.env" });

function convertToBool(text, fault = "true") {
  return text === fault ? true : false;
}
module.exports = {
  SESSION_ID: process.env.SESSION_ID || "OEdyHTZY#pApeXgFSf04Eq1bb5oGJFj5zW_bjB-G1C1PhjbRPkCo",
  MONGODB: process.env.MONGODB || "mongodb://mongo:ggtOUchkBSvtAWewuNUDvfKyTwyOvJRb@mainline.proxy.rlwy.net:29377",
  OWNER_NUM: process.env.OWNER_NUM || "94756599952",
};
