const { cmd } = require("../command");
const os = require('os');
const { runtime } = require('../lib/functions');

cmd({
    pattern: "ping",
    react: "📶",
    desc: "Check the bot's super fast speed.",
    category: "main",
    filename: __filename
},
async (conn, mek, m, { from, reply }) => {
    try {
        const startTime = Date.now()
        const msg = await conn.sendMessage(from, { text: '🚀 *Measuring Speed...*' })
        const endTime = Date.now()
        const latency = endTime - startTime

        // RAM එක බලාගන්න
        const totalMem = (os.totalmem() / 1024 / 1024 / 1024).toFixed(2)
        const freeMem = (os.freemem() / 1024 / 1024 / 1024).toFixed(2)

        const pingStatus = latency < 200 ? "🚀 EXTREMELY FAST" : latency < 500 ? "⚡ STABLE" : "🐢 SLOW"

        const responseText = `⚡ *OSHIYA MD PING METER* ⚡

🛰️ *Latency:* ${latency}ms
📊 *Status:* ${pingStatus}

💻 *System Info:*
- RAM: ${totalMem}GB
- Free: ${freeMem}GB
- Platform: ${os.platform()}

👤 *Owner:* Oshadha Manuppriya
✨ *Mode:* Super Fast 🦾`

        await conn.sendMessage(from, { text: responseText, edit: msg.key })

    } catch (e) {
        console.log(e)
        reply("Ping එක බලන්න ගිහින් පොඩි අවුලක් වුණා! ❌")
    }
})
