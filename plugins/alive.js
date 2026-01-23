const { cmd } = require('../command');
const config = require('../config');
const gifted = require('gifted-btns');
const os = require("os");

cmd({
    pattern: "alive",
    react: "🧬",
    desc: "Check bot alive status",
    category: "main",
    filename: __filename
},
async (conn, mek, m, {
    from, pushname
}) => {

try {

    const uptime = process.uptime();
    const date = new Date().toLocaleDateString();
    const time = new Date().toLocaleTimeString();

    // 📝 Alive Message
    const aliveText = `
🤖 oshi IS ONLINE*

👤 *User* : ${pushname}
📅 *Date* : ${date}
⏰ *Time* : ${time}

⚙️ *RAM* : ${(os.totalmem() / 1024 / 1024).toFixed(0)} MB
🚀 *Uptime* : ${Math.floor(uptime / 60)} Minutes

Powered By oshi
`;

    // 🔘 UL Buttons (gifted-btns)
    const buttons = [
        {
            title: "📂 Main Menu",
            rows: [
                { title: "📜 Menu", rowId: ".menu", description: "Show bot menu" },
                { title: "⚡ Ping", rowId: ".ping", description: "Bot speed check" }
            ]
        },
        {
            title: "👑 Owner",
            rows: [
                { title: "👤 Owner", rowId: ".owner", description: "Bot owner info" },
                { title: "📞 Contact", rowId: ".contact", description: "Owner contact" }
            ]
        }
    ];

    // 📤 Send Message
    await gifted.sendList(
        conn,
        from,
        {
            text: aliveText,
            footer: "Select an option below 👇",
            title: "🧬 Alive Menu",
            buttonText: "OPEN MENU",
            sections: buttons,
            image: { url: "https://raw.githubusercontent.com/oshadha12345/images/refs/heads/main/20251222_040815.jpg" }
        },
        { quoted: mek }
    );

} catch (e) {
    console.log(e);
    await conn.sendMessage(from, { text: "❌ Alive error!" }, { quoted: mek });
}
});