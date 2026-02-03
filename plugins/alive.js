const { cmd } = require("../command");

cmd({
    pattern: "alive",
    react: "🤖",
    desc: "Check bot alive status",
    category: "main",
    filename: __filename
},
async (conn, mek, m, { from, pushname, reply }) => {
    try {
        const startTime = Date.now()
        const msg = await conn.sendMessage(from, { text: "🤖 *Checking Bot Status...*" })
        const endTime = Date.now()

        const latency = endTime - startTime
        const uptime = runtime(process.uptime())

        const day = new Date().toLocaleDateString('en-US', { weekday: 'long' })
        const date = new Date().toLocaleDateString()
        const time = new Date().toLocaleTimeString()

        const ownerName = "Oshadha Manuppriya"
        const ownerNumber = "+94XXXXXXXXX" // 👑 owner number මෙතන දාන්න
        const botName = "OSHIYA MD"

        const responseText = `🤖 *${botName} ALIVE STATUS* 🤖

👋 *Hello:* ${pushname}

🟢 *Status:* Alive & Running
📶 *Ping:* ${latency}ms
⏳ *Uptime:* ${uptime}

📅 *Day:* ${day}
📆 *Date:* ${date}
⏰ *Time:* ${time}

👑 *Owner:* ${ownerName}
📞 *Owner Number:* ${ownerNumber}

💻 *System Info:*
- Platform: ${os.platform()}
- RAM: ${(os.totalmem() / 1024 / 1024 / 1024).toFixed(2)} GB

✨ *Bot is working perfectly!*`

        await conn.sendMessage(from, { text: responseText, edit: msg.key })

    } catch (e) {
        console.log(e)
        reply("Alive status check කරනකොට error එකක් ආවා ❌")
    }
})