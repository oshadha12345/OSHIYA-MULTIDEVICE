const { cmd } = require('../command');
const config = require('../config');
const { sendButtons } = require('gifted-btns');

cmd({
    pattern: "alive",
    react: "💐",
    desc: "Check bot online status",
    category: "main",
    filename: __filename
},
async (danuwa, mek, m, {
    from,
    pushname,
    reply
}) => {

    try {

        await sendButtons(danuwa, from, {

            title: "🤖 UL BOT ALIVE",

            text: `👋 Hello *${pushname}*\n\n✅ Bot is Online & Working!\n\n${config.ALIVE_MSG || ""}`,

            footer: "© UL WhatsApp Bot",

            image: config.ALIVE_IMG, // optional (remove if you don't want image)

            buttons: [
                {
                    id: ".menu",
                    text: "📜 Menu"
                },
                {
                    id: ".ping",
                    text: "📡 Ping"
                },
                {
                    name: "cta_url",
                    buttonParamsJson: JSON.stringify({
                        display_text: "🌐 GitHub",
                        url: "https://example.com"
                    })
                }
            ]

        }, { quoted: mek });

    } catch (e) {
        console.log(e);
        reply(`${e}`);
    }

});