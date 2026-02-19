const {
  default: makeWASocket,
  useMultiFileAuthState,
  DisconnectReason,
  jidNormalizedUser,
  getContentType,
  fetchLatestBaileysVersion,
  Browsers,
} = require("gifted-baileys");

const l = console.log;
const {
  getBuffer,
  getGroupAdmins,
  getRandom,
  h2k,
  isUrl,
  Json,
  runtime,
  sleep,
  fetchJson,
} = require("./lib/functions");

const fs = require("fs");
const P = require("pino");
const config = require("./config");
const util = require("util");
const { sms } = require("./lib/msg");
const axios = require("axios");
const { File } = require("megajs");
const express = require("express");

const prefix = config.PREFIX;
const ownerNumber = config.OWNER_NUM;

const app = express();
const port = process.env.PORT || 8000;

/* ================= SESSION ================= */

if (!fs.existsSync(__dirname + "/auth_info_baileys/creds.json")) {
  if (!config.SESSION_ID)
    return console.log("Please add your session to SESSION_ID env !!");

  let sessdata = config.SESSION_ID.startsWith("ᴏꜱʜɪʏᴀ~")
    ? config.SESSION_ID.replace("ᴏꜱʜɪʏᴀ~", "")
    : config.SESSION_ID;

  const filer = File.fromURL(`https://mega.nz/file/${sessdata}`);

  filer.download((err, data) => {
    if (err) return console.log("Session download error ❌", err);

    fs.writeFileSync(__dirname + "/auth_info_baileys/creds.json", data);
    console.log("Session downloaded ✅");
  });
}

/* ================= CONNECT ================= */

async function connectToWA() {
  console.log("Connecting ✅ OSHIYA-MD");

  const { state, saveCreds } = await useMultiFileAuthState(
    __dirname + "/auth_info_baileys/"
  );

  const { version } = await fetchLatestBaileysVersion();

  const robin = makeWASocket({
    logger: P({ level: "silent" }),
    printQRInTerminal: false,
    browser: Browsers.macOS("Firefox"),
    syncFullHistory: true,
    auth: state,
    version,
  });

  /* ================= CONNECTION UPDATE ================= */

  robin.ev.on("connection.update", (update) => {
    const { connection, lastDisconnect } = update;

    if (connection === "close") {
      const shouldReconnect =
        lastDisconnect?.error?.output?.statusCode !==
        DisconnectReason.loggedOut;

      if (shouldReconnect) {
        console.log("Reconnecting...");
        connectToWA();
      }
    } else if (connection === "open") {
      console.log("✅ OSHIYA-MD connected successfully");

      const path = require("path");
      fs.readdirSync("./plugins/").forEach((plugin) => {
        if (path.extname(plugin).toLowerCase() === ".js") {
          require("./plugins/" + plugin);
        }
      });

      robin.sendMessage(ownerNumber + "@s.whatsapp.net", {
        text: "OSHIYA-MD Bot Connected ✅",
      });
    }
  });

  robin.ev.on("creds.update", saveCreds);

  /* ================= MESSAGE HANDLER ================= */

  robin.ev.on("messages.upsert", async (mek) => {
    mek = mek.messages[0];
    if (!mek.message) return;

    mek.message =
      getContentType(mek.message) === "ephemeralMessage"
        ? mek.message.ephemeralMessage.message
        : mek.message;

    const m = sms(robin, mek);
    const type = getContentType(mek.message);
    const from = mek.key.remoteJid;

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

    const isCmd = body.startsWith(prefix);
    const command = isCmd
      ? body.slice(prefix.length).trim().split(" ").shift().toLowerCase()
      : "";

    const args = body.trim().split(/ +/).slice(1);
    const q = args.join(" ");
    const isGroup = from.endsWith("@g.us");

    const sender = mek.key.participant || mek.key.remoteJid;
    const senderNumber = sender.split("@")[0];
    const botNumber = robin.user.id.split(":")[0];
    const isMe = botNumber.includes(senderNumber);
    const isOwner = ownerNumber.includes(senderNumber) || isMe;

    const reply = (text) => {
      robin.sendMessage(from, { text }, { quoted: mek });
    };

    /* MODE CONTROL */
    if (!isOwner && config.MODE === "private") return;
    if (!isOwner && isGroup && config.MODE === "inbox") return;
    if (!isOwner && !isGroup && config.MODE === "groups") return;

    /* COMMAND SYSTEM */
    const events = require("./command");

    if (isCmd) {
      const cmd =
        events.commands.find((c) => c.pattern === command) ||
        events.commands.find(
          (c) => c.alias && c.alias.includes(command)
        );

      if (cmd) {
        try {
          cmd.function(robin, mek, m, {
            from,
            body,
            args,
            q,
            isGroup,
            sender,
            senderNumber,
            botNumber,
            isOwner,
            reply,
          });
        } catch (e) {
          console.error("[PLUGIN ERROR]", e);
        }
      }
    }
  });
}

/* ================= EXPRESS SERVER ================= */

app.get("/", (req, res) => {
  res.send("🎭 OSHIYA-MD Started ✅");
});

app.listen(port, () =>
  console.log(`Server running on http://localhost:${port}`)
);

/* ================= START BOT ================= */

setTimeout(() => {
  connectToWA();
}, 4000);
