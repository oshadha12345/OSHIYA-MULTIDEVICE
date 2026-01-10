const { cmd } = require('../command')
const axios = require('axios')

cmd({
    pattern: "fb",
    react: "🔍",
    alias: ["facebook"],
    desc: "Download Facebook videos.",
    category: "download",
    filename: __filename
},
async(conn, mek, m, { from, q, reply }) => {
try {
    if (!q) return reply("අඩෝ FB වීඩියೋ එකේ Link එක දීපන් මචං! 🧐")
    
    await reply("Downloading FB Video... 📥")
    
    // Facebook downloader API එකක් හරහා වීඩියෝ එක ගන්නවා
    let response = await axios.get(`https://api.vreden.my.id/api/facebook?url=${q}`)
    let result = response.data.result
    
    let videoUrl = result.hd ? result.hd : result.sd

    return await conn.sendMessage(from, { 
        video: { url: videoUrl }, 
        caption: "*OSHIYA MD FB DOWNLOADER* ✅" 
    }, { quoted: mek })

} catch (e) {
    console.log(e)
    reply(`FB වීඩියෝ එක ගන්න ගිහින් පොඩි අවුලක් වුණා බං: ${e}`)
}
})
