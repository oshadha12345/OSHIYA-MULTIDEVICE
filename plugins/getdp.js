const { cmd } = require('../command')

cmd({
    pattern: "getdp",
    react: "🎯",
    desc: "Download profile picture of a user.",
    category: "tools",
    filename: __filename
},
async (conn, mek, m, { from, reply, quoted }) => {
    try {
        // Reply කරපු මැසේජ් එකකින් හරි නැත්නම් ඒ Chat එකේම හරි ID එක ගන්නවා
        let user = m.quoted ? m.quoted.sender : from

        // Profile Picture එකේ URL එක ගන්නවා
        let ppUrl
        try {
            ppUrl = await conn.profilePictureUrl(user, 'image')
        } catch {
            return reply("අයියෝ! මේ user DP එකක් දාලා නැහැ නැත්නම් මට බලන්න බෑ. 🚫")
        }

        // DP එක image එකක් විදිහට යවනවා
        await conn.sendMessage(from, { 
            image: { url: ppUrl }, 
            caption: `✅ *DP Downloaded Successfully!*\n✨ *Requested by Oshadha*` 
        }, { quoted: mek })

    } catch (e) {
        console.log(e)
        reply("DP එක ගන්න ගිහින් පොඩි අවුලක් වුණා මචං! ❌")
    }
})
