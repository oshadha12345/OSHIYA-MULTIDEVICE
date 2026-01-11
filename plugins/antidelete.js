const { cmd } = require('../command')

cmd({
    on: "delete"
},
async (conn, mek, m, { from, isGroup, pushname }) => {
    try {
        // මැකුණු මැසේජ් එකේ විස්තර ගන්නවා
        const deletedMsg = mek.message.protocolMessage.key
        const msg = conn.loadMessage(deletedMsg.id)

        let report = `🛡️ *ANTI-DELETE DETECTED* 🛡️\n\n`
        report += `👤 *User:* ${pushname}\n`
        report += `💬 *Message:* ${msg.message.conversation || msg.message.extendedTextMessage.text}\n`
        report += `⏰ *Time:* ${new Date().toLocaleString()}`

        // මැකුණු මැසේජ් එක ඔයාට හරි ගෲප් එකට හරි ආයේ එවනවා
        return await conn.sendMessage(from, { text: report }, { quoted: msg })

    } catch (e) {
        // සමහර වෙලාවට කලින් මැසේජ් cache වෙලා නැත්නම් විස්තර ගන්න අමාරුයි
        console.log("Anti-delete error: ", e)
    }
})
