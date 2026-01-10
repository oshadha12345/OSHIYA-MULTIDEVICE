const { cmd } = require('../command');
const config = require('../config');

cmd({
    pattern: "menu",
    react: "💸",
    desc: "Advanced colorful menu with voice and image.",
    category: "main",
    filename: __filename
},
async(conn, mek, m, { from, pushname, reply }) => {
try {
    // දවස, දිනය සහ වෙලාව
    const date = new Date().toLocaleDateString('en-GB')
    const day = new Date().toLocaleDateString('en-US', { weekday: 'long' })

    // Auto Voice එක යවන විදිහ (මෙතන link එකට උඹේ audio file එකක් දාපන්)
    await conn.sendMessage(from, { 
        audio: { url: 'https://github.com/oshadha12345/images/raw/refs/heads/main/Voice/Bully%20Maguire%20edit%20%F0%9F%97%BF_%20Parano%20(Slowed)%20_(MP3_160K).mp3' }, 
        mimetype: 'audio/mp4', 
        ptt: true 
    }, { quoted: mek })

    let menuMsg = `✨ *OSHIYA MD MULTI-DEVICE* ✨

👋 *Hello:* ${pushname}
📅 *Today:* ${day}
📆 *Date:* ${date}

*─── CATEGORIES ───*

📥 *DOWNLOADER*
   .fb, .tiktok, .song, .video

🎨 *GRAPHICS*
   .genimg, .sticker

🛠️ *TOOLS*
   .wiki, .weather, .ping

*Powered by Oshiya Md*`

    // Image එකත් එක්ක Menu එක යවනවා
    return await conn.sendMessage(from, {
        image: { url: 'https://raw.githubusercontent.com/oshadha12345/images/refs/heads/main/bot_menu.png' }, // මෙතනට උඹේ කැමති image link එකක් දාපන්
        caption: menuMsg
    }, { quoted: mek })

} catch (e) {
    console.log(e)
    reply(`අයියෝ වැඩේ අවුල් වුණා මචං: ${e}`)
}
})
