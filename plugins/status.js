const { cmd } = require('../command');

// මේවා config වලට හරි global variables වලට හරි දාගනින්
let statusAutoRead = false
let statusAutoReact = false
const emojis = ['🔥', '❤️', '💯', '🤩', '🚀', '✨', '💎']

cmd({
    pattern: "statusauto",
    react: "✔️",
    desc: "Enable/Disable status auto read & react.",
    category: "owner",
    filename: __filename
},
async (conn, mek, m, { from, isOwner, reply, q }) => {
    if (!isOwner) return reply("සොරි මචං, මේක පාලනය කරන්න Boss වෙන්නම ඕනේ! 🚫")
    
    if (q === "read on") {
        statusAutoRead = true
        return reply("✅ *Status Auto Read Enabled!*")
    } else if (q === "read off") {
        statusAutoRead = false
        return reply("❌ *Status Auto Read Disabled!*")
    } else if (q === "react on") {
        statusAutoReact = true
        return reply("✅ *Status Auto React Enabled!*")
    } else if (q === "react off") {
        statusAutoReact = false
        return reply("❌ *Status Auto React Disabled!*")
    } else {
        return reply("භාවිතය:\n.statusauto read on/off\n.statusauto react on/off")
    }
})

// Status එකක් ආවම වැඩ කරන කොටස (Main index.js එකේ connection ඇතුළේ දාන්නත් පුළුවන්)
conn.ev.on('messages.upsert', async (chatUpdate) => {
    const mek = chatUpdate.messages[0]
    if (mek.key && mek.key.remoteJid === 'status@broadcast') {
        
        // Auto Read
        if (statusAutoRead) {
            await conn.readMessages([mek.key])
        }
        
        // Auto React
        if (statusAutoReact) {
            const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)]
            await conn.sendMessage('status@broadcast', {
                react: { text: randomEmoji, key: mek.key }
            }, { statusJidList: [mek.key.participant] })
        }
    }
})
