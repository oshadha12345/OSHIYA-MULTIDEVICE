const { cmd } = require('../command')

cmd({
    pattern: "help",
    react: "📱",
    desc: "Show bot help and owner info.",
    category: "main",
    filename: __filename
},
async(conn, mek, m, { from, reply }) => {
try {
    const helpMsg = `*─── OSHIYA MD HELP ───*

👤 *Owner:* Oshadha Manuppriya
📞 *Number:* 0756599952

*Commands List:*
1. .song - Download Songs
2. .video - Download Videos
3. .genimg - AI Images
4. .alive - Check Bot Status

*Type a number or click the button below!*`

    // Buttons Setup
    const buttons = [
        { buttonId: '.alive', buttonText: { displayText: 'Alive ⚡' }, type: 1 }
    ]

    const buttonMessage = {
        text: helpMsg,
        footer: "Powered by Asitha MD",
        buttons: buttons,
        headerType: 1
    }

    return await conn.sendMessage(from, buttonMessage, { quoted: mek })

} catch (e) {
    console.log(e)
    reply(`වැඩේ අවුල් වුණා මචං: ${e}`)
}
})
