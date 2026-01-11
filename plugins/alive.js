const { cmd } = require('../command')

cmd({
    pattern: "alive",
    react: "📌",
    desc: "Check if the bot is active with full details.",
    category: "main",
    filename: __filename
},
async(conn, mek, m, { from, pushname, reply }) => {
try {
    // දවස, දිනය සහ වෙලාව සෙට් කරගමු
    const date = new Date().toLocaleDateString('en-GB')
    const day = new Date().toLocaleDateString('en-US', { weekday: 'long' })
    const time = new Date().toLocaleTimeString()

    // 1. Auto Voice එක යවනවා
    await conn.sendMessage(from, { 
        audio: { url: 'https://github.com/asithasiri/asitha-md-media/raw/main/alive_voice.mp3' }, 
        mimetype: 'audio/mp4', 
        ptt: false 
    }, { quoted: mek })

    // Alive මැසේජ් එක
    let aliveMsg = `👋 *HELLO ${pushname.toUpperCase()}!* I'M ALIVE! 🛡️

📅 *Day:* ${day}
📆 *Date:* ${date}
⏰ *Time:* ${time}
👤 *User:* ${pushname}

✨ *Oshiya MD is running smoothly!*
Type *.menu* to see what I can do.

🛡️ *Owner:* Oshadha Manuppriya
🚀 *Version:* 2.0.1`

    // 2. Image එකත් එක්ක මැසේජ් එක යවනවා
    return await conn.sendMessage(from, {
        image: { url: 'https://raw.githubusercontent.com/oshadha12345/images/refs/heads/main/20251222_040815.jpg' }, // මෙතනට උඹ කැමති Image link එකක් දාපන්
        caption: aliveMsg
    }, { quoted: mek })

} catch (e) {
    console.log(e)
    reply(`අයියෝ Alive එක දාද්දි පොඩි අවුලක් වුණා: ${e.message}`)
}
})
