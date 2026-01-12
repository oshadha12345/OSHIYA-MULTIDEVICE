const { cmd } = require('../command')

cmd({
    pattern: "help",
    react: "☎",
    desc: "Get owner information with voice first.",
    category: "main",
    filename: __filename
},
async(conn, mek, m, { from, reply }) => {
try {
    const ownerName = "Oshadha Manuppriya"
    const ownerNumber = "94756599952" 

    // 1. මුලින්ම Auto Voice Note එක යවනවා
    await conn.sendMessage(from, { 
        audio: { url: 'https://github.com/oshadha12345/images/raw/refs/heads/main/Voice/Coolzone%20(nasty_)%20-%20impxstr%20%5Bedit%20audio%20like%20_fictic_editz%20%5D(MP3_160K).mp3' }, 
        mimetype: 'audio/mp4', 
        ptt: false 
    }, { quoted: mek })

    // 2. ඊට පස්සේ Message එක Thumbnail එකත් එක්ක යවනවා
    let helpMsg = `👋 *NEED HELP? CONTACT OWNER* 🛡️\n\n`
    helpMsg += `👤 *Owner:* ${ownerName}\n`
    helpMsg += `📞 *WhatsApp:* +${ownerNumber}\n\n`
    helpMsg += `✨ *Oshiya MD Multi-Device* ✨\n`
    helpMsg += `Type *.menu* to see all my commands!`

    return await conn.sendMessage(from, {
        text: helpMsg,
        contextInfo: {
            externalAdReply: {
                title: "Contact Oshadha Manuppriya",
                body: "Oshiya MD Help Center",
                thumbnailUrl: "https://raw.githubusercontent.com/oshadha12345/images/refs/heads/main/oshiyaping.jpg", 
                sourceUrl: `https://wa.me/${ownerNumber}`,
                mediaType: 1,
                renderLargerThumbnail: true
            }
        }
    }, { quoted: mek })

} catch (e) {
    console.log(e)
    reply(`අයියෝ! පොඩි Error එකක් ආවා මචං: ${e.message}`)
}
})
