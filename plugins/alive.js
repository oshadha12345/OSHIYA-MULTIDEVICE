const { cmd } = require("../command");
const config = require("../config");
const os = require("os");
const { sendButtons } = require("gifted-btns");

cmd({
    pattern: "alive",
    react: "⚡",
    desc: "Check bot online or no.",
    category: "main",
    filename: __filename
},
async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
const uptime = process.uptime();
const msg = {
    text: `*HEY ${pushname} I AM ALIVE NOW!* ⚡\n\n*UPTIME:* ${uptime}\n*OWNER:* Oshadha`,
    footer: "ASITHA-MD BY OSHADHA",
    buttons: [
        {buttonId: '.ping', buttonText: {displayText: 'CHECK PING ⚡'}, type: 1},
        {buttonId: '.menu', buttonText: {displayText: 'GET MENU 📜'}, type: 1}
    ],
    headerType: 1
}
await conn.sendMessage(from, msg