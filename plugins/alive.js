const { cmd } = require('../command');
const { sendButtons } = require('gifted-btns');
const os = require('os');
const moment = require('moment-timezone');

cmd({
    pattern: "alive",
    react: "💐",
    desc: "Bot Alive Check",
    category: "main",
    filename: __filename
},
async (sock, m, args) => {

    const jid = m.key.remoteJid;

    // ===== USER NAME =====
    const user = m.pushName || "💐";

    // ===== BOT NAME =====
    const botName = "OSHIYA-XMD";

    // ===== OWNER NAME =====
    const owner = "Oshadha";

    // ===== PLATFORM =====
    const platform = os.platform();

    // ===== DATE =====
    const date = moment().tz("Asia/Colombo").format("YYYY-MM-DD");

    // ===== STYLE MESSAGE =====
    const aliveText = `
╭━━〔 🤖 ${botName} 〕━━⬣
┃
┃ 👤 User : ${user}
┃ 📅 Date : ${date}
┃ 💻 Platform : ${platform}
┃ 👑 Owner : ${owner}
┃
┃ ✅ Bot Running Perfectly
┃ ⚡ Status : Online
┃
╰━━━━━━━━━━━━━━⬣
`;

    await sendButtons(sock, jid, {

        title: "✨ BOT ALIVE",

        text: aliveText,

        footer: "´´´Oshiya md´´´",

        buttons: [

            // ===== MENU BUTTON =====
            {
                id: ".menu",
                text: "📜 Menu"
            },

            // ===== HELP BUTTON =====
            {
                id: ".help",
                text: "❓ Help"
            },

            // ===== WHATSAPP URL BUTTON =====
            {
                url: "https://wa.me/94756599952",
                text: "📞 Owner WhatsApp"
            }

        ]

    }, { quoted: m });

});