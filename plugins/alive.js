const { cmd } = require('../command');
const gifted = require('gifted-btns');

cmd({
    pattern: "alive",
    react: "🧬",
    desc: "Check if bot is alive",
    category: "main",
    filename: __filename
},
async (conn, mek, m, { from }) => {
try {

    // 📝 Alive Message
    const text = `
🤖 *POWER BOY OSHADHA IS ONLINE*

👤 *User*: OSHIYA MD
⚡ *Status*: Fully Functional

Powered By *Oshadha*
`;

    // 🔘 UL List Buttons
    const sections = [
        {
            title: "📂 Bot Menu",
            rows: [
                { title: "📜 Menu", rowId: ".menu", description: "Open full menu" },
                { title: "⚡ Ping", rowId: ".ping", description: "Check bot speed" }
            ]
        },
        {
            title: "👑 Owner",
            rows: [
                { title: "👤 Owner", rowId: ".owner", description: "Bot owner info" }
            ]
        }
    ];

    // 📤 Send Alive Message with Image
    await gifted.sendList(
        conn,
        from,
        {
            title: "🧬 Alive Status",
            text: text,
            footer: "Select an option below 👇",
            buttonText: "OPEN MENU",
            sections: sections,
            image: { url: "https://raw.githubusercontent.com/oshadha12345/images/refs/heads/main/20251222_040815.jpg" }
        },
        { quoted: mek }
    );

} catch (err) {
    console.log(err);
    await conn.sendMessage(from, { text: "❌ Alive Error" }, { quoted: mek });
}
});