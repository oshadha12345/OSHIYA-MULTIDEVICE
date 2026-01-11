const { cmd } = require('../command')

cmd({
    pattern: "help",
    react: "☎",
    desc: "Get owner information and contact link.",
    category: "main",
    filename: __filename
},
async(conn, mek, m, { from, reply }) => {
try {
    const ownerName = "Oshadha Manuppriya"
    const ownerNumber = "94756599952" 

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
                body: "Click the button to chat on WhatsApp",
                thumbnailUrl: "https://raw.githubusercontent.com/oshadha12345/images/refs/heads/main/oshiyaping.jpg", 
                sourceUrl: `https://wa.me/+94756599952`,
                mediaType: 1,
                renderLargerThumbnail: true
            }
        }
    }, { quoted: mek })

} catch (e) {
    console.log(e)
    reply(`Help එක දාද්දි පොඩි අවුලක් වුණා: ${e.message}`)
}
})
