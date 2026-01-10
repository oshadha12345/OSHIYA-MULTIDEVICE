const { cmd } = require('../command');
const config = require('../config');

const fg = require('api-downloader') // උඹේ බොට් එකේ පාවිච්චි වෙන API එක අනුව මේක වෙනස් වෙන්න පුළුවන්

cmd({
    pattern: "song",
    desc: "Download songs easily.",
    category: "download",
    filename: __filename
},
async(conn, mek, m, { from, q, reply }) => {
try {
    if (!q) return reply("අනේ මචං, සින්දුවේ නම හරි Link එක හරි දියන්කෝ! 🎵")

    await reply("Searching for your song... 🔎")
    
    // මෙතනින් තමයි සින්දුව හොයලා බාන්නේ
    // උදාහරණයක් විදිහට:
    // let data = await fg.ytmp3(q) 
    
    return await conn.sendMessage(from, { 
        audio: { url: 'ඔයාගේ_API_එකෙන්_එන_link_එක' }, 
        mimetype: 'audio/mp4' 
    }, { quoted: mek })

} catch (e) {
    console.log(e)
    reply(`වැඩේ ගැස්සුණා බං: ${e}`)
}
})
