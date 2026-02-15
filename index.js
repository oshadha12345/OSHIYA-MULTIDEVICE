const {
  default: makeWASocket,
  useMultiFileAuthState,
  DisconnectReason,
  jidNormalizedUser,
  getContentType,
  fetchLatestBaileysVersion,
  Browsers,
} = require("@whiskeysockets/baileys");

const l = console.log;
const {
  getBuffer,
  getGroupAdmins
} = require("./lib/functions");

const fs = require("fs");
const P = require("pino");
const config = require("./config");
const { sms } = require("./lib/msg");
const axios = require("axios");

const express = require("express");
const app = express();
const port = process.env.PORT || 8000;

const mongoose = require("mongoose");

const prefix = config.PREFIX;
const ownerNumber = config.OWNER_NUM;

///////////////////////////////////////////////////////
// MongoDB Connect
///////////////////////////////////////////////////////

mongoose.connect(config.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

mongoose.connection.on("connected", () => {
  console.log("MongoDB Connected ✅");
});

mongoose.connection.on("error", (err) => {
  console.log("MongoDB Error ❌", err);
});

///////////////////////////////////////////////////////
// Session Schema
///////////////////////////////////////////////////////

const sessionSchema = new mongoose.Schema({
  sessionId: String
});

const Session = mongoose.model("Session", sessionSchema);

///////////////////////////////////////////////////////
// Connect Function
///////////////////////////////////////////////////////

async function connectToWA(sessionId) {

  console.log(`Connecting Session: ${sessionId}`);

  const sessionPath = `./auth_info_baileys/${sessionId}`;

  if (!fs.existsSync(sessionPath)) {
    fs.mkdirSync(sessionPath, { recursive: true });
  }

  const { state, saveCreds } =
    await useMultiFileAuthState(sessionPath);

  const { version } =
    await fetchLatestBaileysVersion();

  const robin = makeWASocket({
    logger: P({ level: "silent" }),
    printQRInTerminal: false,
    browser: Browsers.macOS("Firefox"),
    syncFullHistory: true,
    auth: state,
    version,
  });

  ///////////////////////////////////////////////////////
  // Connection Update
  ///////////////////////////////////////////////////////

  robin.ev.on("connection.update", (update) => {

    const { connection, lastDisconnect } = update;

    if (connection === "close") {

      const status =
        lastDisconnect?.error?.output?.statusCode;

      if (status !== DisconnectReason.loggedOut) {
        connectToWA(sessionId);
      }

    } else if (connection === "open") {

      console.log(`Session Connected ✅ ${sessionId}`);

      const path = require("path");

      fs.readdirSync("./plugins/").forEach((plugin) => {
        if (path.extname(plugin).toLowerCase() == ".js") {
          require("./plugins/" + plugin);
        }
      });

      console.log("Plugins Installed ✅");

      robin.sendMessage(
        ownerNumber + "@s.whatsapp.net",
        {
          text:
            "✅ OSHIYA-MD Connected\nSession: " + sessionId
        }
      );
    }

  });

  ///////////////////////////////////////////////////////
  // Save Creds
  ///////////////////////////////////////////////////////

  robin.ev.on("creds.update", saveCreds);

  ///////////////////////////////////////////////////////
  // Messages
  ///////////////////////////////////////////////////////

  robin.ev.on("messages.upsert", async (mek) => {

    mek = mek.messages[0];

    if (!mek.message) return;

    mek.message =
      getContentType(mek.message) === "ephemeralMessage"
        ? mek.message.ephemeralMessage.message
        : mek.message;

    const m = sms(robin, mek);

    const type =
      getContentType(mek.message);

    const from =
      mek.key.remoteJid;

    const body =
      type === "conversation"
        ? mek.message.conversation
        : type === "extendedTextMessage"
        ? mek.message.extendedTextMessage.text
        : type === "imageMessage"
        ? mek.message.imageMessage.caption
        : type === "videoMessage"
        ? mek.message.videoMessage.caption
        : "";

    const isCmd =
      body.startsWith(prefix);

    const command =
      isCmd
        ? body.slice(prefix.length)
            .trim()
            .split(" ")
            .shift()
            .toLowerCase()
        : "";

    const args =
      body.trim().split(/ +/).slice(1);

    const isGroup =
      from.endsWith("@g.us");

    const sender =
      mek.key.fromMe
        ? robin.user.id.split(":")[0] +
          "@s.whatsapp.net"
        : mek.key.participant ||
          mek.key.remoteJid;

    const senderNumber =
      sender.split("@")[0];

    const botNumber =
      robin.user.id.split(":")[0];

    const isOwner =
      ownerNumber.includes(senderNumber);

    const reply = (text) =>
      robin.sendMessage(
        from,
        { text },
        { quoted: mek }
      );

    ///////////////////////////////////////////////////////
    // MODE FILTER
    ///////////////////////////////////////////////////////

    if (!isOwner && config.MODE === "private")
      return;

    ///////////////////////////////////////////////////////
    // COMMAND HANDLER
    ///////////////////////////////////////////////////////

    const events =
      require("./command");

    if (isCmd) {

      const cmd =
        events.commands.find(
          (c) => c.pattern === command
        );

      if (cmd) {

        try {

          cmd.function(robin, mek, m, {
            from,
            args,
            reply,
            isOwner,
            senderNumber
          });

        } catch (e) {
          console.log(e);
        }

      }

    }

  });

}

///////////////////////////////////////////////////////
// Start All Sessions from MongoDB
///////////////////////////////////////////////////////

async function startSessions() {

  const sessions =
    await Session.find();

  if (!sessions.length) {

    console.log("No Sessions Found ❌");

    return;

  }

  sessions.forEach((sess) => {

    connectToWA(sess.sessionId);

  });

}

///////////////////////////////////////////////////////
// Express Server
///////////////////////////////////////////////////////

app.get("/", (req, res) => {
  res.send("OSHIYA-MD MongoDB Version Running ✅");
});

app.listen(port, () =>
  console.log(
    "Server running on port " + port
  )
);

///////////////////////////////////////////////////////
// Start Bot
///////////////////////////////////////////////////////

setTimeout(() => {

  startSessions();

}, 4000);
