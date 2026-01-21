const { cmd } = require('../command');
const config = require('../config');

// Import gifted-btns
const { Buttons } = require('gifted-btns');

cmd({
    pattern: "alive",
    react: "⚡",
    desc: "Check bot online or no.",
    category: "main",
    filename: __filename
},
async (danuwa, mek, m, {
    from, quoted, body, isCmd, command, args, q, isGroup,
    sender, senderNumber, botNumber2, botNumber, pushname,
    isMe, isOwner, groupMetadata, groupName, participants,
    groupAdmins, isBotAdmins, isAdmins, reply
}) => {
    try {
         // Send the image with caption + buttons
        await danuwa.sendMessage(from, {
            image: { url: config.ALIVE_IMG },
            caption: config.ALIVE_MSG,
            footer: 'Powered by Oshadha Bot', // Optional footer
            buttons: buttons.build()
        }, { quoted: mek });

            // 2. Buttons යැවීම
            const buttons = [
                { id: prefix + "ping", text: "⚡ PING" },
                { id: prefix + "menu", text: "📜 MENU" },
                { id: prefix + "settings", text: "⚙️ SETTINGS" },
                { id: prefix + "help", text: "📞 HELP" },
            ];

    } catch (e) {
        console.log(e);
        reply(`Error: ${e}`);
    }
});