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
    desc: "Turn Auto Read on or off (Owner Only)",
    category: "owner",
    filename: __filename
},
async (conn, mek, m, { from, q, reply, isOwner }) => {
    // බොට් අයිති උඹට විතරයි මේක කරන්න පුළුවන්
    if (!isOwner) return reply("සොරි මචං, මේක කරන්න බොට්ගේ අයිතිකාරයා (Owner) වෙන්නම ඕනේ! 🚫")

    if (q === "on") {
        autoRead = true
        return reply("Auto Read Enabled! ✅ දැන් හැම මැසේජ් එකක්ම ඔටෝ රීඩ් වෙයි.")
    } else if (q === "off") {
        autoRead = false
        return reply("Auto Read Disabled! ❌ රීඩ් වෙන එක නැවැත්තුවා.")
    } else {
        return reply("පාවිච්චි කරන විදිහ: \n.read on - ඔන් කරන්න \n.read off - ඕෆ් කරන්න")
    }
})
