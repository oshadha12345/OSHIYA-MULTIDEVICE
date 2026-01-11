const { cmd } = require('../command')

cmd({
    pattern: "save",
    react: "📇",
    desc: "Save status to your gallery/chat.",
    category: "main",
    filename: __filename
},
async(conn, mek, m, { from, reply, quoted }) => {
try {
    if (!quoted) return reply("Save කරන්න ඕනේ Status එකට Reply කරලා .save ගහන්න මචං! 🧐")

    // Status එකේ media එක download කරගන්නවා
    let statusMedia = await conn.downloadAndSaveMediaMessage(quoted)

    if (quoted.imageMessage) {
        await conn.sendMessage(from, { image: { url: statusMedia }, caption: "Status Image Saved! ✅" }, { quoted: mek })
    } else if (quoted.videoMessage) {
        await conn.sendMessage(from, { video: { url: statusMedia }, caption: "Status Video Saved! ✅" }, { quoted: mek })
    } else {
        reply("Status එක media එකක් (Image/Video) වෙන්න ඕනේ මචං! 🚫")
    }

} catch (e) {
    console.log(e)
    reply(`Status එක save කරන්න ගිහින් අවුලක් වුණා: ${e.message}`)
}
})
