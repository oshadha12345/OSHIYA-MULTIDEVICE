const { cmd } = require("../command");
const os = require('os');
const { runtime } = require('../lib/functions');

cmd({
    pattern: "ping",
    desc: "Check bot's response speed.",
    category: "main",
    filename: __filename
},
async(conn, mek, m, { from, reply }) => {
try {
    const startTime = Date.now()
    const msg = await reply("Checking Speed... 🚀")
    const endTime = Date.now()
    const ping = endTime - startTime

    await conn.sendMessage(from, { 
        text: `*🚀 OSHIYA MD SPEED:* ${ping}ms` 
    }, { quoted: msg })

} catch (e) {
    console.log(e)
    reply(`Speed එක බලන්න ගිහින් අවුලක් වුණා බං: ${e}`)
}
})
