const { cmd } = require('../command')

// රියැක්ට් එක ඔන් ද ඕෆ් ද කියලා මතක තියාගන්න variable එකක්
let autoReact = false

// මැසේජ් එකක් එනකොටම චෙක් කරන කෑල්ල
cmd({
    on: "body"
},
async (conn, mek, m, { from, body, isGroup }) => {
    if (autoReact && !m.isBaileys) {
        const emojis = ['❤️', '🔥', '✨', '💎', '🦾', '🚀', '⭐']
        const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)]
        await conn.sendMessage(from, {
            react: {
                text: randomEmoji,
                key: mek.key
            }
        })
    }
})

// ON කරන්න කමාන්ඩ් එක
cmd({
    pattern: "react",
    desc: "Turn Auto React on or off",
    category: "owner",
    filename: __filename
},
async (conn, mek, m, { from, q, reply }) => {
    if (q === "on") {
        autoReact = true
        return reply("Auto React Enabled! ✅ දැන් එන හැම එකටම රියැක්ට් වැටෙයි මචං.")
    } else if (q === "off") {
        autoReact = false
        return reply("Auto React Disabled! ❌ වැඩේ නැවැත්තුවා.")
    } else {
        return reply("පාවිච්චි කරන විදිහ: \n.react on - ඔන් කරන්න \n.react off - ඕෆ් කරන්න")
    }
})
