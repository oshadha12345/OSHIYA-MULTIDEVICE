const { cmd } = require("../command");
const config = require("../config");
const pkg = require("../package.json");
const { sendButtons } = require("gifted-btns");

cmd({
    pattern: "alive",
    react: "💐",
    desc: "Check bot alive status",
    category: "main",
    filename: __filename
},
async (conn, mek, m, { from, pushname, reply }) => {

    const aliveText = `
╭━━━〔 🤖 BOT ALIVE 〕━━━╮
┃ 👤 User : ${pushname}
┃ 👑 Owner : ${config.OWNER_NAME}
┃ 🧩 Bot : Oshiya-Xmd
┃ 🔢 Version : ${pkg.version}
┃ 📅 Date : ${new Date().toLocaleDateString()}
┃ ⏰ Time : ${new Date().toLocaleTimeString()}
╰━━━━━━━━━━━━━━━━━━━╯
`;

    await sendButtons(conn, from, {
        image: config.ALIVE_IMG || "https://raw.githubusercontent.com/oshadha12345/images/refs/heads/main/20251222_040815.jpg",
        title: "𝙾𝚜𝚑𝚒𝚢𝚊 𝙾𝚏𝚏𝚒𝚌𝚒𝚊𝚕 💐",
        text: aliveText,
        footer: "𝙼𝚊𝚍𝚎 𝙱𝚢 𝙾𝚜𝚑𝚊𝚍𝚑𝚊 💐",
        buttons: [
            {
                buttonId: ".menu",
                buttonText: { displayText: "📜 Menu" },
                type: 1
            },
            {
                buttonId: ".ping",
                buttonText: { displayText: "🏓 Ping" },
                type: 1
            }
        ]
    });

});