const { cmd } = require('../command')

// Default එක ඕෆ් කරලා තියෙන්නේ
let autoRead = false

// හැම මැසේජ් එකක්ම ආපු ගමන් චෙක් කරන කෑල්ල
cmd({
    on: "body"
},
async (conn, mek, m, { isMe }) => {
    if (autoRead && !m.isBaileys) {
        await conn.readMessages([mek.key]) // මැසේජ් එක Read කරනවා
    }
})

// ON/OFF කරන කමාන්ඩ් එක (Owner Only)
cmd({
    pattern: "read",
    react: "✅",
    desc: "Turn Auto Read on or off (Owner Only)",
    category: "settings",
    filename: __filename
},
async (conn, mek, m, { from, q, reply, isOwner }) => {
    // බොට් අයිති උඹට විතරයි මේක කරන්න පුළුවන්
    if (!isOwner) return reply("*Sorry man, you have to be the owner of the bot to do this!..*! 🚫")

    if (q === "on") {
        autoRead = true
        return reply("*Auto Read Enabled* ✅")
    } else if (q === "off") {
        autoRead = false
        return reply("*Auto Read Disabled* ❌")
    } else {
        return reply("පාවිච්චි කරන විදිහ: \n.read on - ඔන් කරන්න \n.read off - ඕෆ් කරන්න")
    }
})
