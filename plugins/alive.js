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
        // Create buttons using gifted-btns
        const buttons = new Buttons([
            { id: 'menu', text: 'Menu' },    // Button that triggers "menu" command
            { id: 'ping', text: 'Ping' }     // Button that triggers "ping" command
        ]);

        // Send the image with caption + buttons
        await danuwa.sendMessage(from, {
            image: { url: config.ALIVE_IMG },
            caption: config.ALIVE_MSG,
            footer: 'Powered by Oshadha Bot', // Optional footer
            buttons: buttons.build()
        }, { quoted: mek });
        
    } catch (e) {
        console.log(e);
        reply(`Error: ${e}`);
    }
});