const { cmd } = require('../command')

cmd({
    pattern: "getdp",
    desc: "Download user's Profile Picture",
    category: "main",
    filename: __filename
},
async(conn, mek, m, { from, quoted, body, isCmd, command, args, q, reply }) => {
try {
    let user = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : q.replace(/[^0-9]/g, '') + '@s.whatsapp.net'
    if (!user) return reply("කාගේ හරි DP එකක් ගන්න නම්බර් එකක් හරි, Mention එකක් හරි, reply එකක් හරි දියන් මචං! 🧐")

    let ppUrl;
    try {
        ppUrl = await conn.profilePictureUrl(user, 'image')
    } catch {
        return reply("අයියෝ.. ඒකේ DP එකක් පේන්න නැහැ බං! 😅 (සමහරවිට privacy දාලා ඇති)")
    }

    return await conn.sendMessage(from, { image: { url: ppUrl }, caption: `*OSHIYA MD - DP DOWNLOADER* ✅` }, { quoted: mek })

} catch (e) {
    console.log(e)
    reply(`වැඩේ ගැස්සුණා මචං: ${e}`)
}
})
