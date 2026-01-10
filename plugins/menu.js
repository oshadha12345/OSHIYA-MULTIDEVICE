const { cmd } = require('../command');
const config = require('../config');
cmd({
    pattern: "menu",
    desc: "Interactive Menu with Date, Time and Voice",
    category: "main",
    filename: __filename
},
async(conn, mek, m, { from, pushname, reply }) => {
try {
    // දවස සහ වෙලාව ගන්න එක
    const date = new Date().toLocaleDateString('en-GB')
    const time = new Date().toLocaleTimeString('en-US', { hour12: true, hour: '2-digit', minute: '2-digit' })
    const day = new Date().toLocaleDateString('en-US', { weekday: 'long' })

    const menuText = `හලෝ ${pushname}! 👋
    
📅 *අද දිනය:* ${date} (${day})
⏰ *දැන් වෙලාව:* ${time}

ඔන්න මගේ Menu එක... 🚀

1. 📂 DOWNLOADS
2. 🎬 MEDIA
3. ⚙️ SETTINGS

*OSHIYA MD SPEED*`

    // Alive වලට යන බටන් එක
    const buttons = [
        {buttonId: '.alive', buttonText: {displayText: 'Go to Alive ⚡'}, type: 1}
    ]

    const buttonMessage = {
        text: menuText,
        footer: "Select an option or click Alive",
        buttons: buttons,
        headerType: 1
    }

    // Menu මැසේජ් එක යවනවා
    await conn.sendMessage(from, buttonMessage, { quoted: mek })

    // Voice Message එක යවනවා
    // උඹේ voice file එකක link එකක් හරි path එකක් හරි මෙතනට දාපන්
    return await conn.sendMessage(from, { 
        audio: { url: 'https://www.myinstants.com/media/sounds/hello-there.mp3' }, 
        mimetype: 'audio', 
        ptt: true 
    }, { quoted: mek })

} catch (e) {
    console.log(e)
    reply(`වැඩේ ගැස්සුණා බං: ${e}`)
}
})
