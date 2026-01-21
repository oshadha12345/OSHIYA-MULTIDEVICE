const { cmd, commands } = require('../command');
const { sendButtons } = require("gifted-btns");

cmd({
    pattern: "alive",
    react: "⚡",
    desc: "To check bot is online.",
    category: "main",
    filename: __filename
},
async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
    const date = new Date().toLocaleDateString()
    const time = new Date().toLocaleTimeString()
    const day = new Date().toLocaleDateString('en-US', { weekday: 'long' })

    let aliveMsg = `━━━『 *OSHIYA-MD ALIVE* 』━━━

👤 *USER:* ${pushname}
📅 *DATE:* ${date}
🕒 *TIME:* ${time}
🗓️ *DAY:* ${day}

> POWERED BY OSHADHA MANUPPRIYA
━━━━━━━━━━━━━━━━━━━`

    return await conn.sendMessage(from, { 
        image: { url: `https://raw.githubusercontent.com/oshadha12345/images/refs/heads/main/20251222_040815.jpg` }, 
        caption: aliveMsg,
        footer: 'OSHIYA BOT',
        buttons: [
            { buttonId: '.menu', buttonText: { displayText: '📜 MENU' }, type: 1 },
            { buttonId: '.ping', buttonText: { displayText: '⚡ PING' }, type: 1 },
            { buttonId: '.help', buttonText: { displayText: '❓ HELP' }, type: 1 }
        ],
        headerType: 4
    }, { quoted: mek })

} catch (e) {
    console.log(e)
    reply(`${e}`)
}
})
